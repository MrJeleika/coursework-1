import { BaseEntity } from 'src/database/entities/base.entity';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

export enum Status {
  PENDING = 'pending',
  APPROVED = 'approved',
  REJECTED = 'rejected',
}

@Entity()
export class StudentEntity extends BaseEntity {
  @ApiProperty({
    type: Number,
    nullable: false,
    example: 2,
    description: 'Unique id the student',
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    type: String,
    nullable: false,
    example: 'John',
    description: 'Name of the student.',
  })
  @Column()
  name: string;

  @ApiProperty({
    type: String,
    nullable: false,
    example: 'Doe',
    description: 'Last name of the student.',
  })
  @Column()
  lastName: string;

  @ApiProperty({
    type: String,
    nullable: false,
    example: 'johndoe@email.com',
    description: 'Email of the person who sent the request.',
  })
  @Column()
  email: string;

  @ApiProperty({
    type: String,
    nullable: false,
    minLength: 10,
    maxLength: 10,
    example: '0506666666',
    description: 'Number of the student.',
  })
  @Column()
  number: string;

  @ApiProperty({
    type: Number,
    nullable: false,
    minimum: 100,
    maximum: 200,
    example: '170',
    description: 'Math rating of the student.',
  })
  @Column()
  mathRating: number;

  @ApiProperty({
    type: Number,
    nullable: false,
    minimum: 100,
    maximum: 200,
    example: '170',
    description: 'History rating of the student.',
  })
  @Column()
  historyRating: number;

  @ApiProperty({
    type: Number,
    nullable: false,
    minimum: 100,
    maximum: 200,
    example: '170',
    description: 'Ukrainian rating of the student.',
  })
  @Column()
  ukrainianRating: number;

  @ApiProperty({
    type: Number,
    nullable: false,
    minimum: 100,
    maximum: 200,
    example: '170',
    description: 'Average rating of the student.',
  })
  @Column({ type: 'numeric' })
  avgRating: number;

  @ApiProperty({
    type: Boolean,
    nullable: false,
    example: 'true',
    description: 'Readiness to pay on a contractual basis.',
  })
  @Column()
  contract: boolean;

  @ApiProperty({
    type: String,
    nullable: false,
    example: 'Lorem ipsum',
    description: 'Cover letter.',
  })
  @Column()
  coverLetter: string;

  @ApiProperty({
    type: String,
    nullable: false,
    example: 'pending',
    description: 'Status of the request.',
  })
  @Column({
    type: 'enum',
    enum: Status,
    default: Status.PENDING,
  })
  status: Status;
}
