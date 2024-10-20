import { IoAdapter } from '@nestjs/platform-socket.io'
import { ServerOptions } from 'socket.io'
import { createAdapter } from '@socket.io/redis-adapter'
import { createClient } from 'redis'


export class RedisIoAdapter extends IoAdapter{
    private adapterConstructor: ReturnType<typeof createAdapter>;

    async connectToRedis(): Promise<void>{
        const pubClient: typeof createClient | any = createClient({
            url:"redis://default:EqmpkrOkVzEZvneMBKfZtHAiDBPZLhQm@junction.proxy.rlwy.net:25664"
    });
        const subClient: typeof createClient | any = pubClient.duplicate();

        await Promise.all([pubClient.connect(), subClient.connect()]);

        this.adapterConstructor = createAdapter(pubClient, subClient);
    }
    
    createIOServer(port: number, options?: ServerOptions): any {
        const server = super.createIOServer(port, options);
        server.adapter(this.adapterConstructor);
        return server;
    }
}