import { error } from "console";
import { CheckService } from "../domain/use-cases/checks/check-service";
import { CronService } from "./cron/cron-service";
import { LogRespositoryImpl } from "../infrastructure/repositories/log.repository.implementation";
import { FileSystemDatasource } from "../infrastructure/datasources/file-sistem-datasource";


const fileSystemLogRepository = new LogRespositoryImpl(
    // Aca es donde hacemos el cambio de nuestros repositorios
    new FileSystemDatasource()
)

export class Server {

    public static start() {

        console.log('Server started...');
        
        CronService.createJob(
            '*/5 * * * * *', 
            () => {
                const url = 'https://google.com'
                new CheckService(
                    fileSystemLogRepository,
                    () => console.log(`${ url } is ok`), // Pueden ser undefined
                    ( error ) => console.log(error),
                ).execute( url )
                // new CheckService().execute('http://localhost:3000')

            }
        );
    }
}