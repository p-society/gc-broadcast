import { Entity, ObjectIdColumn, Column } from 'typeorm';
import { ObjectId } from 'mongodb';

@Entity('users')
export class User {
    @ObjectIdColumn()
    _id: ObjectId;

    @Column()
    name: string;

    @Column({ unique: true })
    email: string;

    @Column()
    password: string;
}
