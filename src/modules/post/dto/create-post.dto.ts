import { IsString, IsOptional  } from 'class-validator';

export class CreatePostDto {
    @IsString()
    title: string;

    @IsString()
    category: string;

    @IsString()
    @IsOptional()  // 필드가 없어도 허용되지만, null은 허용되지 않음
    contents?: string;

    @IsString()
    tag: string;
}