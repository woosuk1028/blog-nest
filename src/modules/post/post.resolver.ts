import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { Post } from './entity/post.entity';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { SearchPostDto } from './dto/search-post.dto';

@Resolver(() => Post)
export class PostResolver {
    constructor(private readonly postService: PostService) {}

    @Query(() => [Post], { name: 'posts' })
    getPosts(): Promise<Post[]> {
        return this.postService.findAll();
    }

    @Query(() => [Post], { name: 'search' })
    getSearch(
        @Args('title', { type: () => String }) title: string,
    ): Promise<Post[]> {
        const searchPostDto = new SearchPostDto();
        searchPostDto.title = title;
        return this.postService.search(searchPostDto);
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
        return this.postService.create(createPostDto);
    }
}