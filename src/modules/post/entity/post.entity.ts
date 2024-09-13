import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';
import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
@Entity('bg_post_list')
export class Post {
    @Field(() => Int)
    @PrimaryGeneratedColumn()
    seq: number;

    @Field()
    @Column()
    title: string;

    @Field()
    @Column()
    category: string;
    
    @Field()
    @Column()
    contents: string;

    @Field()
    @Column()
    tag: string;

    @Field(() => String, { nullable: true })
    @Column({ nullable: true })
    description: string;

    @Field(() => Int, { nullable: true })
    @Column({ nullable: true })
    views: number | null;

    @Field()
    @CreateDateColumn({ type: 'timestamp' })
    create_date: Date;

    @Field({ nullable: true })
    @Column({ nullable: true })
    update_date: Date;
}