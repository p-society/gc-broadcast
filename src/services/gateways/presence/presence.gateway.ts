import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
// implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
export class PresenceGatewayv1 {
  // @WebSocketServer() server: Server;
  // constructor(private readonly redisService: RedisService) {}
  // async afterInit(server: Server) {
  //   console.log('Presence Gateway Initialized');
  // }
  // async handleConnection(client: Socket) {
  //   const userId = this.getUserIdFromToken(client);
  //   if (!userId) {
  //     client.disconnect();
  //     return;
  //   }
  //   const redisId = uuidv4();
  //   await this.redisService.set(
  //     redisId,
  //     JSON.stringify({ userId, connected: true }),
  //   );
  //   client.data.redisId = redisId;
  //   this.server.emit('userConnected', { userId, redisId });
  //   console.log(`User connected: ${userId} with Redis ID: ${redisId}`);
  // }
  // async handleDisconnect(client: Socket) {
  //   const redisId = client.data.redisId;
  //   if (redisId) {
  //     await this.redisService.del(redisId);
  //     this.server.emit('userDisconnected', { redisId });
  //     console.log(`User disconnected: Redis ID: ${redisId}`);
  //   }
  // }
  // private getUserIdFromToken(client: Socket): string | null {
  //   const token = client.handshake.headers.authorization;
  //   return token ? 'decodedUserId' : null;
  // }
}
