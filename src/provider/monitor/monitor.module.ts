//import packages
import { Module } from '@nestjs/common';

//import modules
import { LoggerModule } from 'src/common/logger/logger.module';
import { TimeHelperModule } from 'src/util/time/timeHelper.module';
import { JobQueueModule } from '../jobQueue/job.module';
//import models
import { ScheduleSetupModelModule } from 'src/model/postgre/scheduleSetup/scheduleSetup.module';
import { ScheduleExecutionLogModelModule } from 'src/model/mongo/ScheduleExecutionLog/ScheduleExecutionLog.module';
//import controllers
import { MonitorController } from './monitor.controller';
//import services
import { MonitorService } from './monitor.service';

@Module({
  imports: [
    LoggerModule,
    ScheduleSetupModelModule,
    ScheduleExecutionLogModelModule,
    TimeHelperModule,
    JobQueueModule
  ],
  providers: [MonitorService],
  controllers: [MonitorController]
})
export class MonitorModule { }
