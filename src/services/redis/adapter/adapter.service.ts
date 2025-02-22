import { IoAdapter } from '@nestjs/platform-socket.io';
import { ServerOptions } from 'socket.io';
import { createAdapter } from '@socket.io/redis-adapter';
import { createClient } from 'redis';

export class RedisIoAdapter extends IoAdapter {
  private adapterConstructor: ReturnType<typeof createAdapter>;
  // private readonly configService: ConfigService;

  REDIS_HOST = process.env.REDIS_HOST;
  REDIS_PORT = Number(process.env.REDIS_PORT);
  //REDIS_PASSWORD = process.env.REDIS_PASSWORD;

  async connectToRedis(): Promise<void> {
    const pubClient = createClient({
      //password: this.REDIS_PASSWORD,
      socket: {
        host: this.REDIS_HOST,
        port: this.REDIS_PORT,
      },
    });

    //redis-cli -u redis://default:r8plIkEmKXJTTPLgnjMBMM5TiSBPG3Ht@redis-18483.c8.us-east-1-3.ec2.redns.redis-cloud.com:18483

    const subClient = pubClient.duplicate();
    await Promise.all([pubClient.connect(), subClient.connect()]);
    this.adapterConstructor = createAdapter(pubClient, subClient);
  }

  createIOServer(port: number, options?: ServerOptions): any {
    const server = super.createIOServer(port, options);
    server.adapter(this.adapterConstructor);
    return server;
  }
}
