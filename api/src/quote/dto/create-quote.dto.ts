import { IsNotEmpty, IsNumber, IsString, Length, Min, Max } from "class-validator";

export class CreateQuoteDto {
    @IsNumber()
    @Min(1)
    @Max(1e10)
    readonly amount: number;
    
    
    @IsString()
    @Length(3)
    @IsNotEmpty()
    readonly from: string;

    @IsString()
    @Length(3)
    @IsNotEmpty()
    readonly to: string;

    rate: number;
}
