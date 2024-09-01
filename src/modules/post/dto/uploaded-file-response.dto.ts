// dto/uploaded-file-response.dto.ts

import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class UploadedFileResponse {
    @Field()
    filename: string;

    @Field()
    mimetype: string;

    @Field()
    encoding: string;

    @Field()
    url: string; // 업로드된 파일 URL
}
