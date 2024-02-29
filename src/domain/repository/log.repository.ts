
import { LogEntity, LogSeverytyLevel } from "../entities/log.entity";


export abstract class LogRepository {
    abstract saveLog( log: LogEntity ): Promise<void>;
    abstract getLogs( severityLevel: LogSeverytyLevel ): Promise<LogEntity[]>;
}
