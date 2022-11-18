//import packages
import { Injectable } from '@nestjs/common';
import { createConnection } from 'typeorm';

//import constants
import { SERVICE } from './database.constants';
//import dtos
import { DatabaseConnectionDto } from 'src/provider/setup/setup.dto';
//import services
import { LoggerService } from 'src/common/logger/logger.service';

const {
    TESTMONGOCONNECTION_METHOD,     //
    TESTPOSTGRESCONNECTION_METHOD,  //
} = SERVICE;

@Injectable()
export class DatabaseService {
    constructor(
        private readonly logger: LoggerService
    ) {
        this.logger.setContext(DatabaseService.name);
    };

    async testPostgresConnection(data: DatabaseConnectionDto) {
        try {
            this.logger.serviceDebug(TESTPOSTGRESCONNECTION_METHOD);
            const { IP, port, account, password, DBName } = data;
            const connection = await createConnection({
                type: 'postgres',
                username: account,
                password: password,
                host: IP,
                port: +port,
                database: DBName
            });
            if (!connection) {

            } else {
                console.log(connection);
                await connection.destroy();
                return { results: 'Success' };
            };
        } catch (err) {
            throw err;
        };
    };

    async testMongoConnection(data: DatabaseConnectionDto) {
        this.logger.serviceDebug(TESTMONGOCONNECTION_METHOD);
        const { IP, port, account, password, DBName } = data;
        return createConnection({
            type: 'mongodb',
            username: account,
            password: password,
            host: IP,
            port: +port,
            database: DBName
        }).then(async connection => {
            await connection.close();
        });
    };
};