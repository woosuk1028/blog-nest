import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { Post } from './entity/post.entity';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { SearchPostDto } from './dto/search-post.dto';
import { UploadedFileResponse } from './dto/uploaded-file-response.dto';
import { createWriteStream } from 'fs';
import { join } from 'path';
import { UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileUpload, GraphQLUpload } from 'graphql-upload';

@Resolver(() => Post)
export class PostResolver {
    constructor(private postService: PostService) {}

    @Query(() => [Post], { name: 'list' })
    getPosts(): Promise<Post[]> {
        return this.postService.findAll();
    }

    @Query(() => Post, { name: 'detail' })
    getDetail(
        @Args('seq', { type: () => Int }) seq: number,
    ): Promise<Post> {
        const searchPostDto = new SearchPostDto();
        searchPostDto.seq = seq;
        return this.postService.detail(searchPostDto);
    }

    @Mutation(() => Int, { name: 'create' })
    getCreate(
        @Args('title', { type: () => String }) title: string,
        @Args('category', { type: () => String }) category: string,
        @Args('contents', { type: () => String }) contents: string,
        @Args('tag', { type: () => String }) tag: string,
    ): Promise<number> {
        const createPostDto = new CreatePostDto();
        createPostDto.title = title;
        createPostDto.category = category;
        createPostDto.contents = contents;
        createPostDto.tag = tag;
        console.log("CREATE DTO ==> "+createPostDto);
        return this.postService.create(createPostDto);
    }

    @Mutation(() => UploadedFileResponse)
    @UseInterceptors(FileInterceptor('file'))
    async uploadFile(
        @Args({ name: 'file', type: () => GraphQLUpload }) file: FileUpload,
    ): Promise<UploadedFileResponse> {
        const { createReadStream, filename, mimetype, encoding } = await file;

        const uploadDir = join(__dirname, '..', 'uploads'); // 파일이 저장될 디렉토리

        return new Promise((resolve, reject) => {
            const writeStream = createWriteStream(join(uploadDir, filename));

            createReadStream()
                .pipe(writeStream)
                .on('finish', () =>
                    resolve({
                        filename,
                        mimetype,
                        encoding,
                        url: `https://seok2.duckdns.org/uploads/${filename}`, // 업로드된 파일 URL 반환
                    }),
                )
                .on('error', reject);
        });
    }
}