import { EmailService } from "../../../presentation/email/email.service";
import { LogEntity, LogSeverytyLevel } from "../../entities/log.entity";
import { LogRepository } from "../../repository/log.repository";

interface SendLogEmailUseCase {
    execute: ( to: string | string[] ) => Promise<boolean>
}

export class SendEmailLogs implements SendLogEmailUseCase {

    constructor(
        //Injectamos el servicio y nuestro repositorio
        private readonly emailService: EmailService,
        private readonly  logRepository: LogRepository
    ){}


    async execute( to: string | string[] ) {

        try {
            
            const sent = await this.emailService.sendEmailWithFileSystemLogs( to )
            if( !sent ) {
                throw new Error('Email log not sent')
            }   
            const log = new LogEntity({
                message: `Log email sent`,
                level: LogSeverytyLevel.low,
                origin: 'send-email-logs.ts'
            });
            this.logRepository.saveLog( log );
            
            return true;
        } catch (error) {

            const log = new LogEntity({
                message: `${error}`,
                level: LogSeverytyLevel.high,
                origin: 'send-email-logs.ts'
            });
            this.logRepository.saveLog( log );

            return false;            
        }

        return true;
    }
}