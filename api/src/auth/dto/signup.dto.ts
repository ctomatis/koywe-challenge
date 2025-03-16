import { IsNotEmpty, IsString, IsEmail, MinLength, MaxLength } from "class-validator";

export class SignUpDto {
    @IsEmail()
    readonly email: string;

    @IsString()
    @IsNotEmpty()
    readonly first_name: string;

    @IsString()
    @IsNotEmpty()
    readonly last_name: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(4)
    @MaxLength(20)
    readonly password: string;
}
