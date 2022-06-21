import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class Category {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ length: "100" })
    title: string

    @Column({ length: "250" })
    description: string

    @Column()
    isActive: boolean
}