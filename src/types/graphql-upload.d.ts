// src/types/graphql-upload.d.ts

declare module 'graphql-upload' {
    import { ReadStream } from 'fs-capacitor';

    export type FileUpload = {
        filename: string;
        mimetype: string;
        encoding: string;
        createReadStream: () => ReadStream;
    };

    export const GraphQLUpload: any;
}
