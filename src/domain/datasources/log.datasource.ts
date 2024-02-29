import { LogEntity, LogSeverytyLevel } from "../entities/log.entity";


export abstract class LogDatasource {
    abstract saveLog( log: LogEntity ): Promise<void>;
    abstract getLogs( severityLevel: LogSeverytyLevel ): Promise<LogEntity[]>;
}