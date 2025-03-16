
import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { SignInDto } from './dto/signin.dto';
import { SignUpDto } from './dto/signup.dto';
import { IUser } from 'src/users/interface/user.interface';
import { compare } from 'bcrypt'


@Injectable()
export class AuthService {
    constructor(private usersService: UsersService, private jwtService: JwtService) { }

    async signIn(signIn: SignInDto): Promise<{ access_token: string }> {
        const user = await this.usersService.findOneByEmail(signIn.email);
        if (user === null) {
            throw new UnauthorizedException();
        }
        const ok = await compare(signIn.password, user.password)
        if (!ok) {
            throw new UnauthorizedException();
        }

        const payload = { sub: user._id, email: user.email };
        return {
            access_token: await this.jwtService.signAsync(payload),
        };
    }

    async signUp(signUp: SignUpDto): Promise<IUser | null> {
        const user = await this.usersService.findOneByEmail(signUp.email);
        if (user !== null) {
            throw new BadRequestException(`email address ${signUp.email} already exists.`);
        }

        try {
            return await this.usersService.create(signUp)
        } catch (err) {
            throw new BadRequestException("fail to create a new user");
        }
    }
}
