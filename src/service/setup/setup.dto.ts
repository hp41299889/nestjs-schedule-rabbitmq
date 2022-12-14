//import packages
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class AdminDto {
    @ApiProperty({ default: 'admin' })
    readonly account: string;
    @ApiProperty({ default: 'admin' })
    readonly password: string;
};
export class ConnectionDto extends AdminDto {
    @ApiProperty()
    readonly IP: string;
    @ApiProperty()
    readonly port: string;
};

export class DatabaseConnectionDto extends ConnectionDto {
    @ApiProperty()
    readonly DBName: string;
};

export class QueueConnectionDto extends ConnectionDto {
    @ApiProperty()
    readonly inputQueueName: string;
    @ApiProperty()
    readonly outputQueueName: string;
};

export class SaveSetupDto {
    @ApiPropertyOptional()
    readonly enableScheduleService: boolean;

    @ApiPropertyOptional()
    readonly bossQueue: QueueConnectionDto;

    @ApiPropertyOptional()
    readonly jobQueue: QueueConnectionDto;

    @ApiPropertyOptional()
    readonly admin: AdminDto;

    @ApiPropertyOptional()
    readonly postgreSQL: DatabaseConnectionDto;

    @ApiPropertyOptional()
    readonly mongoDB: DatabaseConnectionDto;
};