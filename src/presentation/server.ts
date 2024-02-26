import { CronService } from "./cron/cron-service";
import { LogRespositoryImpl } from "../infrastructure/repositories/log.repository.implementation";
import { FileSystemDatasource } from "../infrastructure/datasources/file-system.datasource";
import { EmailService } from "./email/email.service";
import { MongoLogDatasource } from "../infrastructure/datasources/mongo-log.datasource";
import { PostgresLogDatasource } from "../infrastructure/datasources/postgres-log.datasource";
import { CheckServiceMultiple } from "../domain/use-cases/checks/check-service-multiple";


const fsLogRepository = new LogRespositoryImpl(
    new FileSystemDatasource()
)
const mongoLogRepository = new LogRespositoryImpl(
    new MongoLogDatasource()
)
const postgresLogRepository = new LogRespositoryImpl(
    new PostgresLogDatasource()
)

const emailService = new EmailService();

export class Server {

    public static start() {

        console.log('Server started...');

        // Mandar Email
        // new sendEmailLogs(
        //     emailService,
        //     fileSystemLogRepository
        // ).execute('pepovaquel@gmail.com')

        // const emailService = new EmailService();
        // emailService.sendEmailWithFileSystemLogs('pepovaquel@gmail.com');      

        // CronService.createJob(
        //     '*/5 * * * * *', 
        //     () => {
        //         const url = 'https://google.com'
        //         new CheckServiceMultiple(
        //             [ fsLogRepository, postgresLogRepository, mongoLogRepository ],
        //             () => console.log(`${ url } is ok`), // Pueden ser undefined
        //             ( error ) => console.log(error),
        //         ).execute( url )

        //     }
        // );
    }
}