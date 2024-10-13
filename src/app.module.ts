import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { User } from "./UserEntity";
import { JwtModule } from "@nestjs/jwt";

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'mongodb',
            host: 'localhost',
            port: 27017,
            database: 'yt_nest_auth',
            entities: [User],
            synchronize: true,
            useUnifiedTopology: true, // Optional: recommended for MongoDB
        }),
        TypeOrmModule.forFeature([User]),
        JwtModule.register({
            secret: 'secret',
            signOptions: { expiresIn: '1d' },
        }),
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
