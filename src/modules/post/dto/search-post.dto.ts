import { IsString, IsOptional  } from 'class-validator';

export class SearchPostDto {
    @IsOptional()
    @IsString()
    title?: string;
}