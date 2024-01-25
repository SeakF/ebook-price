import { IsNotEmpty, IsString } from 'class-validator';

export class EbookDataDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    title: string;
}