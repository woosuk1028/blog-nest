import { IsString, IsOptional  } from 'class-validator';

export class CreatePostDto {
    @IsString()
    title: string;

    @IsString()
    category: string;

    @IsString()
    contents: string;

    @IsString()
    tag: string;
}