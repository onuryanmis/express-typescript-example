import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    Index,
    BeforeInsert
} from 'typeorm'
import {IsEmail, IsNotEmpty, MaxLength, MinLength} from 'class-validator';
import {RoleEnum} from '../enum/RoleEnum';
import bcrypt from 'bcryptjs';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @IsNotEmpty()
    @Column()
    fullName: string;

    @IsNotEmpty()
    @MinLength(6)
    @MaxLength(32)
    @Column()
    password: string;

    @Column({
        type: 'enum',
        enum: RoleEnum,
        default: RoleEnum.USER,
    })
    role: RoleEnum;

    @IsNotEmpty()
    @IsEmail()
    @Index('email_index')
    @Column({
        unique: true,
    })
    email: string;

    @Column()
    isActive: boolean = false;

    @CreateDateColumn()
    createdDate: Date

    @UpdateDateColumn()
    updatedDate: Date

    @BeforeInsert()
    public async hashPassword() {
        this.password = await bcrypt.hash(this.password, 12);
    }
}