import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, IsNumber, IsBoolean } from 'class-validator';

export class CreateStudentDto {
  @ApiProperty({
    type: String,
    nullable: false,
    required: true,
    example: 'John',
    description: 'Name of the student.',
  })
  @IsString()
  name: string;

  @ApiProperty({
    type: String,
    nullable: false,
    required: true,
    example: 'Doe',
    description: 'Last name of the student.',
  })
  @IsString()
  lastName: string;

  @ApiProperty({
    type: String,
    nullable: false,
    required: true,
    example: 'johndoe@email.com',
    description: 'Email of the person who sent the request.',
  })
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty({
    type: String,
    nullable: false,
    required: true,
    minLength: 10,
    maxLength: 10,
    example: '0506666666',
    description: 'Number of the student.',
  })
  @IsString()
  number: string;

  @ApiProperty({
    type: Number,
    nullable: false,
    required: true,
    minimum: 100,
    maximum: 200,
    example: '170',
    description: 'Math rating of the student.',
  })
  @IsNumber()
  mathRating: number;

  @ApiProperty({
    type: Number,
    nullable: false,
    required: true,
    minimum: 100,
    maximum: 200,
    example: '170',
    description: 'History rating of the student.',
  })
  @IsNumber()
  historyRating: number;

  @ApiProperty({
    type: Number,
    nullable: false,
    required: true,
    minimum: 100,
    maximum: 200,
    example: '170',
    description: 'Ukrainian rating of the student.',
  })
  @IsNumber()
  ukrainianRating: number;

  @ApiProperty({
    type: Boolean,
    nullable: false,
    required: true,
    example: 'true',
    description: 'Readiness to pay on a contractual basis.',
  })
  @IsBoolean()
  contract: boolean;

  @ApiProperty({
    type: String,
    nullable: false,
    required: true,
    example: 'Lorem ipsum',
    description: 'Cover letter.',
  })
  @IsString()
  coverLetter: string;
}
