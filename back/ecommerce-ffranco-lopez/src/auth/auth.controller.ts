import { BadRequestException, Body, Controller, HttpCode, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto/CreateUserDto.dto';
import { LoginUserDto } from './dto/LoginUserDto.dto';

@Controller('auth')
export class AuthController {

    constructor( private readonly authService: AuthService) {}

    @HttpCode(200)
    @Post('signup')
    async signup(@Body() user: CreateUserDto) {
        const { confirmPassword, ...newUser } = user;
        return this.authService.signup(newUser)
    }

    @HttpCode(200)
    @Post('signin')
    async login( @Body()loginUSerDto: LoginUserDto) {
        const {email, password} = loginUSerDto;
        const token = await this.authService.signIn(email, password);

        if (!token) {
            throw new BadRequestException('La contraseña o el email son incorrectos');
        }

        return { message: 'Login exitoso', token };
        
    }
}
