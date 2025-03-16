import { IsNotEmpty, IsString, IsEmail, MinLength, MaxLength } from "class-validator";

export class SignInDto {
    @IsEmail()
    readonly email: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(4)
    @MaxLength(20)
    readonly password: string;
}
