import { Module } from '@nestjs/common';
import { StudentsController } from './students.controller';
import { StudentsService } from './students.service';
import { DatabaseModule } from 'src/database';

@Module({
  controllers: [StudentsController],
  providers: [StudentsService],
  imports: [DatabaseModule],
})
export class StudentsModule {}
