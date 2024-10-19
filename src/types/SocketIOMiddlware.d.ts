export type SocketIOMiddleware = (
  client: Socket,
  next: (error?: Error) => void,
) => void;
