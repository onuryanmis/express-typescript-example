import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany} from 'typeorm'
import {IsBoolean, IsNotEmpty, IsOptional, MaxLength} from 'class-validator';
import {Content} from './Content';

@Entity()
export class Category {
    @PrimaryGeneratedColumn()
    id: number

    @IsNotEmpty()
    @MaxLength(100)
    @Column({length: '100'})
    title: string

    @IsOptional()
    @MaxLength(250)
    @Column({length: '250'})
    description: string

    @OneToMany(() => Content, (content) => content.category)
    contents: Content[]

    @IsBoolean()
    @Column()
    isActive: boolean

    @CreateDateColumn()
    createdDate: Date

    @UpdateDateColumn()
    updatedDate: Date
}