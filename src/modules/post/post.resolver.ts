import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { Post } from './entity/post.entity';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { SearchPostDto } from './dto/search-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { UploadedFileResponse } from './dto/uploaded-file-response.dto';
import { createWriteStream } from 'fs';
import { join } from 'path';
import { UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

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
        @Args('description', { type: () => String }) description: string,
    ): Promise<number> {
        const createPostDto = new CreatePostDto();
        createPostDto.title = title;
        createPostDto.category = category;
        createPostDto.contents = contents;
        createPostDto.tag = tag;
        createPostDto.description = description;
        console.log("CREATE DTO ==> "+createPostDto);
        return this.postService.create(createPostDto);
    }

    @Mutation(() => Post, { name: 'update' })
    getUpdate(
        @Args('seq', { type: () => Int }) seq: number,
        @Args('title', { type: () => String }) title: string,
        @Args('category', { type: () => String }) category: string,
        @Args('contents', { type: () => String }) contents: string,
        @Args('tag', { type: () => String }) tag: string,
        @Args('description', { type: () => String }) description: string,
    ): Promise<number> {
        const updatePostDto = new UpdatePostDto();
        updatePostDto.seq = seq;
        updatePostDto.title = title;
        updatePostDto.category = category;
        updatePostDto.contents = contents;
        updatePostDto.tag = tag;
        updatePostDto.description = description;
        console.log("UPDATE DTO ==> "+updatePostDto);
        return this.postService.create(updatePostDto);
    }

}