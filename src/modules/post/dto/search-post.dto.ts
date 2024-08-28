import { IsString, IsNumber, IsOptional  } from 'class-validator';

export class SearchPostDto {
    @IsOptional()
    @IsNumber({}, { message: 'seq must be a number (float or integer).' })
    seq?: number;
}