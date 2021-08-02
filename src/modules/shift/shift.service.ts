import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Shift } from './shift.entity';
import { v4 as UUIDv4 } from 'uuid';

@Injectable()
export class ShiftService {
  constructor(
    @InjectRepository(Shift)
    private readonly repository: Repository<Shift>,
  ) {}

  public async getShifts(uuid: string): Promise<Shift[]> {
    return this.repository.find({
      where: {
        jobId: uuid,
      },
    });
  }

  public async bookTalent(talent: string, id: string): Promise<void> {
    const shift = await this.repository.findOne(id);
    if (shift) {
      shift.talentId = talent;
      await this.repository.save(shift);
    }
    throw new HttpException(
      `Couldn't find any shift against job id ${id}`,
      HttpStatus.NOT_FOUND,
    );
  }
  public async cancelShiftByJobId(jobId: string): Promise<DeleteResult> {
    const shifts = await this.repository.find({ jobId });
    if (shifts.length) {
      try {
        return this.repository.delete({ jobId });
      } catch (e) {
        throw new HttpException(
          `Internal Server Error`,
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    } else {
      throw new HttpException(
        `Couldn't find any shift against job id: ${jobId}`,
        HttpStatus.NOT_FOUND,
      );
    }
  }

  public async cancelShiftById(id: string): Promise<DeleteResult> {
    const shift = await this.repository.findOne(id);
    if (shift) {
      try {
        return this.repository.delete({ id });
      } catch (e) {
        throw new HttpException(
          `Internal Server Error`,
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    } else {
      throw new HttpException(
        `Couldn't find any shift against id: ${id}`,
        HttpStatus.NOT_FOUND,
      );
    }
  }

  public async cancelShiftsByTalentId(talentId: string): Promise<DeleteResult> {
    const shifts = await this.repository.find({ talentId });
    if (shifts && shifts.length) {
      try {
        const result = await this.repository.delete({ talentId });
        if (result) {
          for (const jobShift of shifts) {
            const day = new Date();
            day.setDate(new Date().getDate() + 1);
            const startTime = new Date(day);
            startTime.setUTCHours(8);
            const endTime = new Date(day);
            endTime.setUTCHours(17);
            const shift = new Shift();
            shift.jobId = jobShift.jobId;
            shift.id = UUIDv4();
            shift.startTime = startTime;
            shift.endTime = endTime;
            shift.talentId = UUIDv4();
            await this.repository.save(shift);
          }
        }
        return result;
      } catch (e) {
        throw new HttpException(
          `Internal Server Error`,
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }
}
