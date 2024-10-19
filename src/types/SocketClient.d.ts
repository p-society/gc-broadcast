import { Socket } from 'socket.io';
import { Users } from 'src/users/schemas/users.schema';

export declare interface SocketClient extends Socket {
  user: Users;
}
