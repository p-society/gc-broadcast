import { Module } from "@nestjs/common";
import { RedisIoAdapter } from "./adapter.service";

@Module({
    providers: [RedisIoAdapter],
    exports: [RedisIoAdapter],
})

export class AdapterModule {}