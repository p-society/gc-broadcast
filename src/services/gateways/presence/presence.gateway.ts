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
import { SocketAuthMiddleware } from 'src/services/apis/auth/middlewares/socket.middleware';
import { RedisService } from 'src/services/apis/redis/redis.service';
import { UsersService } from 'src/services/apis/users/users.service';
import { SocketClient } from 'src/types/SocketClient';
import { PresenceSocketEvents } from '../constants/presence.events';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
  namespace: 'v1/events',
})
export class PresenceGateway
  implements OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit
{
  @WebSocketServer()
  server: Server;
  constructor(
    private readonly userService: UsersService,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
    private readonly redisService: RedisService,
    private readonly internalEventEmitter: EventEmitter2,
  ) {}

  /**
   * @desc Initialize WebSocket server with authentication middleware
   */
  afterInit(server: Server) {
    server.use(
      SocketAuthMiddleware(
        this.jwtService,
        this.userService,
        this.configService,
      ),
    );
  }

  async handleConnection(client: SocketClient) {
    const user = client['user'];
    const USER_ID = String(client.user._id);
    const SOCK_ID = client.id;

    if (user) {
      await this.redisService.set(
        `user:${USER_ID}:socket:${SOCK_ID}`,
        `${new Date().toISOString()}`,
        100,
      );

      this.notifyStatusChange(USER_ID, PresenceSocketEvents.ONLINE);
    }

    const eventPayload = {
      payload: {
        socket: SOCK_ID,
      },
    };

    this.internalEventEmitter.emit(
      PresenceSocketEvents.IN_CLIENT_CONNECTED,
      eventPayload,
    );
  }

  async handleDisconnect(client: SocketClient) {
    const user = client['user'];

    const USER_ID = String(client.user._id);
    const SOCK_ID = client.id;

    if (user) {
      await this.redisService.del(`user:${USER_ID}:socket:${SOCK_ID}`);
      this.notifyStatusChange(USER_ID, PresenceSocketEvents.OFFLINE);
    }

    const eventPayload = {
      payload: {
        socket: SOCK_ID,
      },
    };

    this.internalEventEmitter.emit(
      PresenceSocketEvents.IN_CLIENT_DISCONNECTED,
      eventPayload,
    );

    client.disconnect(true);
  }

  /**
   * @desc Emit status change event for user presence updates
   */
  private notifyStatusChange(user: string, status: 'online' | 'offline') {
    this.server.emit(PresenceSocketEvents.PUBLIC_STATUS_CHANGE, {
      user,
      status,
      timestamp: new Date().toISOString(),
    });
  }

  /**
   * @desc Handle heartbeat messages to update user activity in Redis
   */
  @SubscribeMessage(PresenceSocketEvents.HEARTBEAT)
  async handleHeartbeat(@ConnectedSocket() client: SocketClient) {
    // @ts-ignore
    const user = client['user']?._id;

    const USER_ID = String(client.user._id);
    const SOCK_ID = client.id;

    if (user) {
      await this.redisService.set(
        `user:${USER_ID}:socket:${SOCK_ID}`,
        `${new Date().toISOString()}`,
        100,
      );
    }
  }

  async isUserOnline(userID: string): Promise<boolean> {
    const keys = await this.redisService.keys(`user:${userID}:*`);
    console.log(keys);
    return keys.length !== 0;
  }
}
