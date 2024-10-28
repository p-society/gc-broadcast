import { BadRequestException, Body, Controller, Get, Post, Req, Res, UnauthorizedException } from '@nestjs/common';
import { AppService } from './app.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from "@nestjs/jwt";
import { Response, Request } from 'express';

@Controller('api')
export class AppController {
    constructor(
        private readonly appService: AppService,
        private jwtService: JwtService
    ) {}

  @Public()
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
