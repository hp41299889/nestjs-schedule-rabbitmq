import { ApiProperty, ApiPropertyOptional, ApiPropertyOptions } from '@nestjs/swagger';

// type dateIntervals = '前一日' | '前一週' | '前一月' | '前一年';

export enum dateIntervalEnum {
    '前一日' = 'day',
    '前一週' = 'week',
    '前一月' = 'month',
    '前一年' = 'year'
};

export class QueryDto {
    @ApiProperty({ default: '2022/11/17' })
    startDate: string;
    @ApiProperty({ enum: Object.keys(dateIntervalEnum) })
    dateInterval: dateIntervalEnum;
};