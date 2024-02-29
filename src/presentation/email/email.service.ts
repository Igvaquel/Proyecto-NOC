import nodemailer from 'nodemailer';
import { envs } from '../../config/plugins/envs.plugins';
import { LogRepository } from '../../domain/repository/log.repository';
import { LogEntity, LogSeverytyLevel } from '../../domain/entities/log.entity';


export interface SendMailOptions {
    to: string | string[],
    subject: string,
    htmlBody: string,
    attachements?: Attachement[];
}

export interface Attachement{
    filename: string;
    path: string;
}




export class EmailService {

    private trasporter = nodemailer.createTransport({
        service: envs.MAILER_SERVICE,
        auth: {
            user: envs.MAILER_EMAIL,
            pass: envs.MAILER_SECRET_KEY,
        }
    });

    constructor() {}

    async sendEmail( options: SendMailOptions ):Promise<boolean> {

        const { htmlBody, subject, to, attachements = [] } = options

        try {

            const sentInformation = await this.trasporter.sendMail({
                to: to,
                subject: subject,
                html: htmlBody,
                attachments: attachements
            });
      
            return true;
        } catch (error) {

            return false;
        }

    }

    async sendEmailWithFileSystemLogs( to: string | string[] ) {
        const subject = 'Logs del servidor';
        const htmlBody = `
            <h3>Logs de sistema - NOC</h3>
            <p>Lo menos frecuente en este mundo es vivir. La mayoría de la gente existe.</p>
            <p>Ver logs adjuntos</p>
        `;

        const attachements: Attachement[] = [
            { filename: 'logs-low.log', path: './logs/logs-low.log'},
            { filename: 'logs-high.log', path: './logs/logs-high.log'},
            { filename: 'logs-medium.log', path: './logs/logs-medium.log'}
        ];

        return this.sendEmail({
            to, htmlBody, subject, attachements
        })
    }

}