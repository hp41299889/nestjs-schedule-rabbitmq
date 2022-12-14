//import packages
import { Get, Controller, Res, Session, BadRequestException } from '@nestjs/common';
import { ApiExcludeController } from '@nestjs/swagger';
import { Response } from 'express';

//import constants
import { CONTROLLER } from './routes.constants';
//import services
import { LoggerService } from 'src/common/logger/logger.service';

const {
    SCHEDULE_VIEW_ROUTES,       //./Schedule/view
    SCHEDULE_VIEW_FILE,         //Schedule
    MONITOR_VIEW_ROUTES,        //./Monitor/view
    MONITOR_VIEW_FILE,          //Monitor
    EXECUTIONLOG_VIEW_ROUTES,   //./ExecutionLog/view
    EXECUTIONLOG_VIEW_FILE,     //ExecutionLog
    SETUP_VIEW_ROUTES,          //./Setup/view
    SETUP_VIEW_FILE,            //Setup
    AUTH_VIEW_ROUTES,           //./Auth/view
    AUTH_VIEW_FILE,             //Auth
    REDIRECT_ROUTES,            //../Auth/view
    INDEX_LAYOUT_FILE,          //pages/index
    LOGIN_LAYOUT_FILE,          //pages/login
} = CONTROLLER;

@ApiExcludeController()
@Controller()
export class RoutesController {
    constructor(
        private readonly logger: LoggerService
    ) {
        this.logger.setContext(RoutesController.name);
    };

    @Get(SCHEDULE_VIEW_ROUTES)
    schedule(@Res() response: Response, @Session() session: Record<string, any>) {
        try {
            this.logger.controllerDebug(SCHEDULE_VIEW_ROUTES);
            if (!session.visits) {
                return response.status(401).redirect(REDIRECT_ROUTES);
            } else {
                return response.render(SCHEDULE_VIEW_FILE, { layout: INDEX_LAYOUT_FILE });
            };
        } catch (err) {
            this.logger.errorMessage(err);
            throw new BadRequestException(err);
        };
    };

    @Get(MONITOR_VIEW_ROUTES)
    monitor(@Res() response: Response, @Session() session: Record<string, any>): void {
        try {
            this.logger.controllerDebug(MONITOR_VIEW_ROUTES);
            if (!session.visits) {
                return response.status(401).redirect(REDIRECT_ROUTES);
            } else {
                return response.render(MONITOR_VIEW_FILE, { layout: INDEX_LAYOUT_FILE });
            };
        } catch (err) {
            this.logger.errorMessage(err);
            throw new BadRequestException(err);
        };
    };

    @Get(EXECUTIONLOG_VIEW_ROUTES)
    executionLog(@Res() response: Response, @Session() session: Record<string, any>): void {
        try {
            this.logger.controllerDebug(EXECUTIONLOG_VIEW_ROUTES);
            if (!session.visits) {
                return response.status(401).redirect(REDIRECT_ROUTES);
            } else {
                return response.render(EXECUTIONLOG_VIEW_FILE, { layout: INDEX_LAYOUT_FILE });
            };
        } catch (err) {
            this.logger.errorMessage(err);
            throw new BadRequestException(err);
        };
    };

    @Get(SETUP_VIEW_ROUTES)
    setup(@Res() response: Response, @Session() session: Record<string, any>): void {
        try {
            this.logger.controllerDebug(SETUP_VIEW_ROUTES);
            if (!session.visits) {
                return response.status(401).redirect(REDIRECT_ROUTES);
            } else {
                return response.render(SETUP_VIEW_FILE, { layout: INDEX_LAYOUT_FILE });
            };
        } catch (err) {
            this.logger.errorMessage(err);
            throw new BadRequestException(err);
        };
    };

    @Get(AUTH_VIEW_ROUTES)
    auth(@Res() response: Response): void {
        try {
            return response.render(AUTH_VIEW_FILE, { layout: LOGIN_LAYOUT_FILE });
        } catch (err) {
            this.logger.errorMessage(err);
            throw new BadRequestException(err);
        };
    };
};