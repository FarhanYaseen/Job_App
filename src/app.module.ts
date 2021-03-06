import { Module } from '@nestjs/common';
import { JobModule } from './modules/job/job.module';
import { ShiftModule } from './modules/shift/shift.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { TalentModule } from './modules/talent/talent.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: './database.sqlite',
      entities: [join(__dirname, '**/**.entity{.ts,.js}')],
      synchronize: true,
    }),
    JobModule,
    ShiftModule,
    TalentModule,
  ],
})
export class AppModule {}
