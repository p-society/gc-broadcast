import { Injectable } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./UserEntity";
import { Repository } from "typeorm";
import { ObjectId } from 'mongodb';

@Injectable()
export class AppService {
    constructor(
        @InjectRepository(User) private readonly userRepository: Repository<User>
    ) {}

    async create(data: any): Promise<User> {
        return this.userRepository.save(data);
    }

    async findOne(condition: any): Promise<User> {
        if (condition._id) {
            condition._id = new ObjectId(condition._id);
        }
        return this.userRepository.findOne(condition);
    }
}
