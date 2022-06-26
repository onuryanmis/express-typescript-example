import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn} from "typeorm"
import {IsBoolean, IsNotEmpty, IsOptional, MaxLength} from "class-validator";

@Entity()
export class Category {
    @PrimaryGeneratedColumn()
    id: number

    @IsNotEmpty()
    @MaxLength(100)
    @Column({length: "100"})
    title: string

    @IsOptional()
    @MaxLength(250)
    @Column({length: "250"})
    description: string

    @IsBoolean()
    @Column()
    isActive: boolean

    @CreateDateColumn()
    createdDate: Date

    @UpdateDateColumn()
    updatedDate: Date
}