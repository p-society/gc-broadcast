import { BadRequestException } from '@nestjs/common';
import { Model, FilterQuery, UpdateQuery, AnyKeys } from 'mongoose';
import { PaginatedResponse } from 'src/types/PaginatedResponse';
import { assignFilters, FILTERS, rawQuery } from './query.utils';
import { featherify } from './featherify';
import options from './options';
import { InternalQueryOption } from 'src/types/QueryOptions';

export class GlobalService<T, TDocument> {
  constructor(private readonly model: Model<TDocument>) {}

  async _find(
    query: InternalQueryOption<T>,
    findOptions = {
      handleSoftDelete: true,
    },
  ): Promise<PaginatedResponse<T> | T[]> {
    console.log({ query });
    if (!findOptions.handleSoftDelete) {
      throw new BadRequestException(
        'findOptions.handleSoftDelete not provided in _find.',
      );
    }
    query['deleted'] = { $ne: true };

    const filters = assignFilters({}, query, FILTERS, {});
    const searchQuery = rawQuery(query);
    const isPaginationDisabled =
      query.$paginate === false || query.$paginate === 'false';
    const q = this.model.find(searchQuery);
    featherify(q, filters, options, isPaginationDisabled);

    if (isPaginationDisabled) {
      return (await q.exec()) as T[];
    }

    const [data, total] = await Promise.all([
      q.exec(),
      this.model.countDocuments({
        deleted: { $ne: true },
        ...searchQuery,
      }),
    ]);

    return {
      total,
      data: data as T[],
      $limit: Number(filters.$limit) || options.defaultLimit,
      $skip: Number(filters.$skip) || options.defaultSkip,
    };
  }

  async _create(
    data: T | T[],
    needsMulti: boolean | undefined = undefined,
  ): Promise<T | T[]> {
    const multi = needsMulti !== undefined ? needsMulti : options.multi;

    if (multi) {
      if (!Array.isArray(data)) {
        throw new BadRequestException(
          'Bulk creation requires an array of records.',
        );
      }

      return (await this.model.insertMany(data, { ordered: false })) as T[];
    }

    if (Array.isArray(data)) {
      throw new BadRequestException(
        'Single creation expects a single record object, not an array.',
      );
    }

    return (await this.model.create(data)) as T;
  }

  async _patch(
    id: string | null,
    data: Partial<T>,
    query: Record<string, any> = {},
    patchOptions = {
      handleSoftDelete: true,
    },
  ): Promise<T | T[] | null> {
    if (!patchOptions.handleSoftDelete) {
      throw new BadRequestException(
        'patchOptions.handleSoftDelete not provided in _patch.',
      );
    }
    query['deleted'] = { $ne: true };

    const searchQuery: FilterQuery<TDocument> = id
      ? { _id: id, ...rawQuery(query) }
      : rawQuery(query);

    if (id) {
      return (await this.model
        .findOneAndUpdate(
          searchQuery,
          data as unknown as UpdateQuery<TDocument>,
          { new: true },
        )
        .exec()) as T;
    }

    await this.model
      .updateMany(searchQuery, data as unknown as AnyKeys<TDocument>)
      .exec();
    return (await this.model.find(searchQuery).exec()) as T[];
  }

  async _get(
    id: string,
    query: Record<string, any> = {},
    getOptions = {
      handleSoftDelete: true,
    },
  ): Promise<T | null> {
    if (!getOptions.handleSoftDelete) {
      throw new BadRequestException(
        'getOptions.handleSoftDelete not provided in _get.',
      );
    }
    query['deleted'] = { $ne: true };

    const searchQuery: FilterQuery<TDocument> = {
      ...rawQuery(query),
      _id: id,
    };

    return this.model.findOne(searchQuery).exec() as T;
  }

  async _remove(
    id: string | null,
    query: Record<string, any> = {},
    user: any,
    removeOptions = {
      handleSoftDelete: true,
    },
  ): Promise<T | T[]> {
    const searchQuery: FilterQuery<TDocument> = id
      ? { _id: id, ...rawQuery(query) }
      : rawQuery(query);

    const data = await this._get(id, query);

    if (removeOptions.handleSoftDelete) {
      await this._patch(
        id,
        {
          deleted: true,
          deletedBy: user._id,
          deletedAt: new Date(),
        } as unknown as Partial<T>,
        searchQuery,
      );
      return data;
    }

    id
      ? await this.model.deleteOne(searchQuery).exec()
      : await this.model.deleteMany(searchQuery).exec();
    return data;
  }
}
