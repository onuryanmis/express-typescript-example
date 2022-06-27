import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne} from "typeorm"
import {IsBoolean, IsNotEmpty, IsOptional, MaxLength} from "class-validator";
import {Category} from "./Category";

@Entity()
export class Content {
    @PrimaryGeneratedColumn()
    id: number

    @IsNotEmpty()
    @MaxLength(100)
    @Column({length: "100"})
    title: string

    @Column({length: "130"})
    slug: string

    @IsOptional()
    @MaxLength(250)
    @Column({length: "250"})
    description: string

    @IsNotEmpty()
    @Column("text")
    content: string

    @IsNotEmpty()
    @ManyToOne(() => Category, (category) => category.contents)
    category: Category

    @IsBoolean()
    @Column()
    isActive: boolean

    @CreateDateColumn()
    createdDate: Date

    @UpdateDateColumn()
    updatedDate: Date
}