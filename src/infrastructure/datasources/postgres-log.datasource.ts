import { PrismaClient, SeverityLevel } from "@prisma/client";
import { LogDatasource } from "../../domain/datasources/log.datasource";
import { LogEntity, LogSeverytyLevel } from "../../domain/entities/log.entity";


const prismaClient = new PrismaClient();

const severituEnum = {
    low: SeverityLevel.LOW,
    medium: SeverityLevel.MEDIUM,
    high: SeverityLevel.HIGH
}
export class PostgresLogDatasource implements LogDatasource {

    async saveLog(log: LogEntity): Promise<void> {

        const level = severituEnum[log.level]

        const newLog = await prismaClient.logModel.create({
            data: {
                ...log,
                level: level,
            }
        })
    }

    async getLogs(severityLevel: LogSeverytyLevel): Promise<LogEntity[]> {

        const level = severituEnum[severityLevel]


        const dbLogs = await prismaClient.logModel.findMany({
            where: { level }
        })

        return dbLogs.map( LogEntity.fromObject )
    }
 
    
}