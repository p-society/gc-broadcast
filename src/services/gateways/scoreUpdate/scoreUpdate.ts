import { ConfigService } from '@nestjs/config';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { JwtService } from '@nestjs/jwt';
import {
  ConnectedSocket,
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { RedisService } from 'src/services/redis/redis.service';
import { UsersService } from 'src/services/apis/users/users.service';
import { SocketClient } from 'src/types/SocketClient';
import { CricketEvent } from 'src/services/apis/cricket/schemas/cricket.event.schema';
import { Logger } from '@nestjs/common';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
  namespace: 'v1/score_update',
})
export class ScoreUpdateGateway
  implements OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit
{
  readonly logger = new Logger(ScoreUpdateGateway.name);
  constructor(
    private readonly userService: UsersService,
    private readonly configService: ConfigService,
    private readonly redisService: RedisService,
    private readonly internalEventEmitter: EventEmitter2,
  ) {}

  afterInit(server: Server) {
    this.logger.debug('initialized');
  }

  async handleConnection(client: SocketClient) {
    console.log('Client connected');
    const matchid = client.handshake.query.matchid;
    const user_id = client.user._id;
    const room = `match:${matchid}`;
    client.join(room);
    console.log(`User ${user_id} joined room : ${room}`);
  }

  async handleDisconnect(client: SocketClient) {
    const matchid = client.handshake.query.matchid;
    const room = `match:${matchid}`;
    client.leave(room);
    console.log(`User ${client.user._id} left room : ${room}`);
  }

  @SubscribeMessage('scoreUpdate')
  handleScoreUpdate(
    @ConnectedSocket() client: SocketClient,
    payload: { cricketEvent: CricketEvent },
  ): void {
    const matchid = client.handshake.query.matchid;
    const room = `match:${matchid}`;
    // this.server.to(room).emit(clea'scoreUpdate', payload);
  }
}
