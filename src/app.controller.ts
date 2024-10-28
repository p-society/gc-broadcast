import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
    constructor(
        private readonly appService: AppService,
    ) {}

    @Post('register')
    async register(
        @Body('name') name: string,
        @Body('email') email: string,
        @Body('password') password: string
    ) {
        const hashedPassword = await bcrypt.hash(password, 12);

        const user = await this.appService.create({
            name,
            email,
            password: hashedPassword
        });

        delete user.password;
        return user;
    }

    @Post('login')
    async login(
        @Body('email') email: string,
        @Body('password') password: string,
        @Res({ passthrough: true }) response: Response
    ) {
        const user = await this.appService.findOne({ email });
    
        if (!user) {
            throw new BadRequestException('invalid credentials');
        }
    
        if (!await bcrypt.compare(password, user.password)) {
            throw new BadRequestException('invalid credentials');
        }
    
        const jwt = await this.jwtService.signAsync({ id: user._id });
    
         
        response.cookie('jwt', jwt, {
            httpOnly: true,   
            secure: false,    
            sameSite: 'lax'   
        });
    
        return {
            message: 'success'
        };
    }
    

    @Get('user')
    async user(@Req() request: Request) {
        try {
            const cookie = request.cookies['jwt'];
            const data = await this.jwtService.verifyAsync(cookie);

            if (!data) {
                throw new UnauthorizedException();
            }

            const user = await this.appService.findOne({ _id: data['id'] });
            const { password, ...result } = user;

            return result;
        } catch (e) {
            throw new UnauthorizedException();
        }
    }

    @Post('logout')
    async logout(@Res({ passthrough: true }) response: Response) {
        response.clearCookie('jwt');
        return { message: 'success' };
    }

    @Get()
    getHello(): string {
        return 'Hello World!';
    }
}
