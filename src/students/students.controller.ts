import { ApiBody, ApiOkResponse, ApiQuery, ApiTags } from '@nestjs/swagger';
import { StudentsService } from './students.service';
import { Body, Controller, Put, Get, Post, Query } from '@nestjs/common';
import { CreateStudentDto } from './dtos/create-student.dto';
import { Status } from 'src/database';

@Controller('students')
@ApiTags('students')
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  @Get()
  @ApiOkResponse({
    type: [CreateStudentDto],
    status: 200,
    description: 'Successfully got all students',
  })
  public async getAllStudents() {
    return await this.studentsService.getAllStudents();
  }

  @Post()
  @ApiBody({
    type: CreateStudentDto,
    description: 'Data required to add student to the list',
    required: true,
  })
  public async createStudent(@Body() dto: CreateStudentDto) {
    return await this.studentsService.createStudent(dto);
  }

  @Put('accept')
  @ApiOkResponse({
    type: CreateStudentDto,
    status: 200,
    description: 'Successfully accepted student',
  })
  @ApiQuery({
    name: 'id',
    description: 'Id of the student to accept',
    required: true,
    type: Number,
    example: 10,
  })
  public async acceptStudent(@Query('id') id: number) {
    return await this.studentsService.acceptStudent(id);
  }

  @Put('reject')
  @ApiOkResponse({
    type: CreateStudentDto,
    status: 200,
    description: 'Successfully rejected student',
  })
  @ApiQuery({
    name: 'id',
    description: 'Id of the student to reject',
    required: true,
    type: Number,
    example: 10,
  })
  public async rejectStudent(@Query('id') id: number) {
    return await this.studentsService.rejectStudent(id);
  }

  @Get('enrollment')
  @ApiOkResponse({
    type: [CreateStudentDto],
    status: 200,
    description: 'Successfully got students for the enrollment',
  })
  @ApiQuery({
    name: 'amount',
    description: 'Amount of enrolled students',
    required: true,
    type: Number,
    example: 10,
  })
  public async getStudentsForEnrollment(@Query('amount') amount: number) {
    return await this.studentsService.enrolledStudents(amount);
  }

  @Get('interview')
  @ApiOkResponse({
    type: [CreateStudentDto],
    status: 200,
    description: 'Successfully got students for the interview',
  })
  @ApiQuery({
    name: 'minRating',
    type: Number,
    description: 'Min average rating of students',
    required: true,
    example: 170,
  })
  public async getStudentsForInterview(@Query('minRating') minRating: number) {
    return await this.studentsService.interviewStudents(minRating);
  }
}
