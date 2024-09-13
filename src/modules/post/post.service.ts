import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { formatDateToCustom } from '../../utils';
import { Post } from './entity/post.entity';
import { CreatePostDto } from './dto/create-post.dto';
import { SearchPostDto } from './dto/search-post.dto';

@Injectable()
export class PostService {
    constructor(
        @InjectRepository(Post)
        private readonly postRepository: Repository<Post>,
    ) {}

    //전체 조회
    async findAll(): Promise<Post[]> {
        return this.postRepository.find({
            order: {
                seq: 'DESC',
            },
        });
    }

    async detail(searchPostDto: SearchPostDto): Promise<Post | null> {
        const queryBuilder = this.postRepository.createQueryBuilder('post');

        if(searchPostDto.seq) {
            queryBuilder
                .andWhere('post.seq = :seq', { seq: searchPostDto.seq });
        }
        return queryBuilder.getOne();
    }

    async create(createPostDto: CreatePostDto): Promise<number> {
        const { title, category, contents, tag } = createPostDto;
        const create_date = formatDateToCustom(new Date);

        try
        {
            const query = this.postRepository.create({
                title,
                category,
                contents,
                tag,
                create_date
            });

            const result = await this.postRepository.save(query);
            return result.seq;
        }
        catch (error)
        {
            console.error("map create 저장 중 에러 발생: "+error);
            return 0;
        }
    }
}
