
import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  Res
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from './decorators/public.decorator';
import { ConfigService } from '@nestjs/config';
import { SignUpDto } from './dto/signup.dto';
import { SignInDto } from './dto/signin.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService, private configService: ConfigService) { }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto);
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('signup')
  async signUp(@Res() resp, @Body() signUpDto: SignUpDto) {
    try {
      const user = await this.authService.signUp(signUpDto)
      if (user) {
        return resp.status(HttpStatus.CREATED).json({ statuscode: HttpStatus.CREATED });
      }
    } catch (err) {
      throw err
    }
  }

  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
