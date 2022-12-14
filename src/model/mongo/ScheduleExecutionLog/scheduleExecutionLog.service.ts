//import packages
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

//import dtos
import { CreateScheduleExecutionLogDto, FindPeriodDto } from './scheduleExecutionLog.dto';
//import constants
import { SERVICE } from './scheduleExecutionLog.constants';
//import models
import { ScheduleExecutionLog, ScheduleExecutionLogDocument } from './scheduleExecutionLog.schema';
//import services
import { LoggerService } from 'src/common/logger/logger.service';

const {
    CONNECTION_NAME,    //connection name for MongooseModule
    CREATE_METHOD,      //create()
    READALL_METHOD,     //readAll()
    READPERIOD_METHOD,  //readPeriod()
} = SERVICE;

@Injectable()
export class ScheduleExecutionLogModel {
    constructor(
        @InjectModel(ScheduleExecutionLog.name, CONNECTION_NAME)
        private scheduleExecutionLogModel: Model<ScheduleExecutionLogDocument>,
        private readonly logger: LoggerService
    ) {
        this.logger.setContext(ScheduleExecutionLogModel.name);
    };

    async create(createCatDto: CreateScheduleExecutionLogDto): Promise<ScheduleExecutionLog> {
        try {
            this.logger.serviceDebug(CREATE_METHOD);
            const document = new this.scheduleExecutionLogModel(createCatDto);
            return await document.save();
        } catch (err) {
            throw err;
        };
    };

    async readPeriod(data: FindPeriodDto): Promise<ScheduleExecutionLog[]> {
        try {
            this.logger.serviceDebug(READPERIOD_METHOD);
            const { start, end, scheduleID } = data;
            if (scheduleID) {
                const documents = this.scheduleExecutionLogModel
                    .find({ scheduleID: scheduleID })
                    .where('processDatetime').gt(Number(start)).lt(Number(end))
                    .exec();
                return await documents;
            } else {
                const documents = this.scheduleExecutionLogModel
                    .find()
                    .where('processDatetime').gt(Number(start)).lt(Number(end))
                    .exec();
                return await documents;
            };
        } catch (err) {
            throw err;
        };
    };
};