//import packages
import { Injectable } from '@nestjs/common';
import * as pm2 from 'pm2';

//import constants
import { SERVICE } from './setup.constants';
//import dtos
import { DatabaseConnectionDto, SaveSetupDto } from './setup.dto';
//import services
import { JsonService } from 'src/config/json/json.service';
import { ConnectionService } from 'src/database/connection/connection.service';
import { LoggerService } from 'src/common/logger/logger.service';

const {
    READ_METHOD,                  //read()
    POSTGRESCONNECTTEST_METHOD,   //postgreConnectTest()
    MONGOCONNECTTEST_METHOD,      //mongoConnectTest()
    SAVE_METHOD,                  //save()
} = SERVICE;

@Injectable()
export class SetupService {
    constructor(
        private readonly jsonService: JsonService,
        private readonly connectionService: ConnectionService,
        private readonly logger: LoggerService
    ) {
        this.logger.setContext(SetupService.name);
    };

    async read(): Promise<string> {
        try {
            this.logger.serviceDebug(READ_METHOD);
            return await this.jsonService.readAll();
        } catch (err) {
            throw err;
        };
    };

    async postgreConnectTest(data: DatabaseConnectionDto): Promise<void> {
        try {
            this.logger.debug(POSTGRESCONNECTTEST_METHOD);
            await this.connectionService.testPostgresConnection(data);
        } catch (err) {
            throw err;
        };
    };

    async mongoConnectTest(data: DatabaseConnectionDto): Promise<void> {
        try {
            this.logger.debug(MONGOCONNECTTEST_METHOD);
            await this.connectionService.testMongoConnection(data);
        } catch (err) {
            throw err;
        };
    };

    async save(data: SaveSetupDto) {
        try {
            this.logger.debug(SAVE_METHOD);
            await this.jsonService.save(data);
            this.restart();
        } catch (err) {
            throw err;
        };
    };

    restart() {
        pm2.connect(err => {
            if (err) {
                console.log(err);
                process.exit(2);
            };
            pm2.restart('ScheduleService', err => {
                console.log(err);
            });
        });
    };
};