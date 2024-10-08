import { IsString, IsOptional  } from 'class-validator';

export class UpdatePostDto {
    @IsNumber({}, { message: 'seq must be a number (float or integer).' })
    seq?: number;

    @IsString()
    title: string;

    @IsString()
    category: string;

    @IsString()
    @IsOptional()  // 필드가 없어도 허용되지만, null은 허용되지 않음
    contents?: string;

    @IsString()
    description: string;

    @IsString()
    tag: string;
}