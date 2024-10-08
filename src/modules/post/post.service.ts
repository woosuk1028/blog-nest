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
        const queryRunner = this.postRepository.manager.connection.createQueryRunner();
        await queryRunner.startTransaction();

        try {
            if(searchPostDto.seq) {
                //조회수 증가
                await queryRunner.manager
                    .createQueryBuilder()
                    .update(Post)
                    .set({
                        views: () => 'views + 1'
                    })
                    .where('seq = :seq', { seq: searchPostDto.seq })
                    .execute();
            }

            const post = await queryRunner.manager
                .createQueryBuilder(Post, 'post')
                .where('post.seq = :seq', { seq: searchPostDto.seq })
                .getOne();

            await queryRunner.commitTransaction();
            return post;
        } catch (err) {
            await queryRunner.rollbackTransaction();
            throw err;
        } finally {
            await queryRunner.release();
        }
    }

    async create(createPostDto: CreatePostDto): Promise<number> {
        const { title, category, contents, tag, description } = createPostDto;
        const create_date = formatDateToCustom(new Date);

        try
        {
            const query = this.postRepository.create({
                title,
                category,
                contents,
                tag,
                description,
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

    async update(updatePostDto: UpdatePostDto): Promise<number> {
        const { seq, title, category, contents, tag, description } = updatePostDto;
        const update_date = formatDateToCustom(new Date());

        try
        {
            const result = await this.postRepository.update(seq, {
                title,
                category,
                contents,
                tag,
                description,
                update_date
            });

            if (result.affected) {
                return seq;
            } else {
                return 0;
            }
        }
        catch (error)
        {
            console.error("map create 저장 중 에러 발생: "+error);
            return 0;
        }
    }
}
