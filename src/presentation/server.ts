import { error } from "console";
import { CheckService } from "../domain/use-cases/checks/check-service";
import { CronService } from "./cron/cron-service";
import { LogRespositoryImpl } from "../infrastructure/repositories/log.repository.implementation";
import { FileSystemDatasource } from "../infrastructure/datasources/file-sistem-datasource";
import { EmailService } from "./email/email.service";
import { sendEmailLogs } from "../domain/use-cases/email/send-email-logs";


const fileSystemLogRepository = new LogRespositoryImpl(
    // Aca es donde hacemos el cambio de nuestros repositorios
    new FileSystemDatasource()
)

const emailService = new EmailService();

export class Server {

    public static start() {

        console.log('Server started...');

        // Mandar Email

        new sendEmailLogs(
            emailService,
            fileSystemLogRepository
        ).execute('pepovaquel@gmail.com')

        // const emailService = new EmailService();
        // emailService.sendEmailWithFileSystemLogs('pepovaquel@gmail.com');      

        // CronService.createJob(
        //     '*/5 * * * * *', 
        //     () => {
        //         const url = 'https://google.com'
        //         new CheckService(
        //             fileSystemLogRepository,
        //             () => console.log(`${ url } is ok`), // Pueden ser undefined
        //             ( error ) => console.log(error),
        //         ).execute( url )
        //         // new CheckService().execute('http://localhost:3000')

        //     }
        // );
    }
}