import { BadRequestException } from '@nestjs/common';
import { Model, FilterQuery, UpdateQuery, AnyKeys, Types } from 'mongoose';
import { PaginatedResponse } from 'src/types/PaginatedResponse';
import { assignFilters, FILTERS, rawQuery } from './query.utils';
import { featherify } from './featherify';
import options from './options';
import { InternalQueryOption } from 'src/types/QueryOptions';
import { processFilter } from './process-filters';

export class GlobalService<T, TDocument> {
  constructor(private readonly model: Model<TDocument>) {}

  async _find(
    query: InternalQueryOption<T> = {},
    findOptions = options,
  ): Promise<PaginatedResponse<T> | T[]> {
    query[options.deleteKey] = { $ne: true };

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
    query: InternalQueryOption<T> = {},
    patchOptions = options,
  ): Promise<T | T[] | null> {
    query[options.deleteKey] = { $ne: true };
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
    id: string | null,
    query: InternalQueryOption<T> = {},
    getOptions = options,
  ): Promise<T | null> {
    query[options.deleteKey] = { $ne: true };

    const searchQuery: FilterQuery<TDocument> = {
      ...rawQuery(query),
      _id: id,
    };

    return this.model.findOne(searchQuery).exec() as T;
  }

  async _remove(
    id: string | null,
    query: InternalQueryOption<T> = {},
    user: any,
    removeOptions = options,
  ): Promise<T | T[]> {
    const searchQuery: FilterQuery<TDocument> = id
      ? { _id: id, ...rawQuery(query) }
      : rawQuery(query);

    const data = await this._get(id, query);

    if (removeOptions.handleSoftDelete) {
      await this._patch(
        id,
        {
          [options.deleteKey]: true,
          [options.deletedByKey]: new Types.ObjectId(user._id),
          [options.deletedAtKey]: new Date(),
        } as unknown as Partial<T>,
        searchQuery as InternalQueryOption<T>,
      );
      return data;
    }

    id
      ? await this.model.deleteOne(searchQuery).exec()
      : await this.model.deleteMany(searchQuery).exec();
    return data;
  }

  async getCount(filter: Record<string, any>) {
    processFilter(filter);
    return await this.model.countDocuments(filter);
  }
}
