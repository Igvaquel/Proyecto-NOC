import { LogDatasource } from "../../domain/datasources/log.datasource";
import { LogEntity, LogSeverytyLevel } from "../../domain/entities/log.entity";
import { LogRepository } from "../../domain/repository/log.repository";


export class LogRespositoryImpl implements LogRepository {

    constructor(
        private readonly logDatasource: LogDatasource, //Injeccion de dependencia
    ) {}

    async saveLog( log: LogEntity ): Promise<void> {
        return this.logDatasource.saveLog( log );
    }
    async getLogs( severityLevel: LogSeverytyLevel ): Promise<LogEntity[]> {
        return this.logDatasource.getLogs( severityLevel );
    }






}