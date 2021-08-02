import {
  Controller,
  Post,
  Body,
  Get,
  Delete,
  Param,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { v4 as UUIDv4 } from 'uuid';
import { JobService } from './job.service';
import { ShiftService } from '../shift/shift.service';
import { ResponseDto } from '../../utils/ResponseDto';
import { ValidationPipe } from '../ValidationPipe';
import { JobRequest } from './dto/JobRequest';
import { JobRequestResponse } from './dto/JobRequestResponse';
import { CancelResponse } from '../../utils/CancelResponse';

@Controller('job')
export class JobController {
  constructor(
    private readonly jobService: JobService,
    private readonly shiftService: ShiftService,
  ) {}

  @Post()
  async requestJob(
    @Body(new ValidationPipe<JobRequest>())
    dto: JobRequest,
  ): Promise<ResponseDto<JobRequestResponse>> {
    const currentDate = new Date();
    const { start, end } = dto;
    // Check end date should be greater than the start data
    if (end <= start) {
      throw new HttpException(
        'The end date should be after the start date',
        HttpStatus.BAD_REQUEST,
      );
    }
    const diffMs = end.valueOf() - start.valueOf();
    const diffHrs = Math.floor((diffMs % 86400000) / 3600000); // hours
    // Check shift duration
    if (diffHrs < 2 || diffHrs > 8) {
      throw new HttpException(
        'Shift can only be at most 8 hours long and at least 2 hours',
        HttpStatus.BAD_REQUEST,
      );
    }
    const startDateDiffMs = currentDate.valueOf() - start.valueOf();
    const diffMins = Math.round(
      ((startDateDiffMs % 86400000) % 3600000) / 60000,
    ); // minutes
    // Only past 5 minutes start date will be valid
    if (diffMins >= 5) {
      throw new HttpException(
        'The start date cannot be in the past',
        HttpStatus.BAD_REQUEST,
      );
    }
    // Create New Job
    const job = await this.jobService.createJob(UUIDv4(), dto.start, dto.end);
    return new ResponseDto<JobRequestResponse>(new JobRequestResponse(job.id));
  }

  @Delete(':id')
  async cancelJob(
    @Param('id') id: string,
  ): Promise<ResponseDto<CancelResponse>> {
    // Delete Shift
    const cancelShift = this.shiftService.cancelShiftByJobId(id);
    // Delete Job
    if (cancelShift) {
      await this.jobService.cancelJob(id);
    }
    return new ResponseDto<CancelResponse>(new CancelResponse(id));
  }
}
