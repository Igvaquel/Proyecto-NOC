import { LogEntity, LogSeverytyLevel } from "../entities/log.entity";


export abstract class LogDatasource {
    abstract saveLog( log: LogEntity ): Promise<void>;
    abstract getLog( severityLevel: LogSeverytyLevel ): Promise<LogEntity[]>;
}