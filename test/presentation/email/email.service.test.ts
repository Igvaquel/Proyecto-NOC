import nodemailer from "nodemailer";
import { EmailService, SendMailOptions } from "../../../src/presentation/email/email.service"


describe('EmailService', () => { 

    const mockSendMail = jest.fn()
    
    // Mock al createTransport
    nodemailer.createTransport = jest.fn().mockReturnValue({
        sendMail: mockSendMail
    })
    
    const emailService = new EmailService();
    
    test('should send email', async() => { 
      

        const options: SendMailOptions = {
            to: 'ignacio@google.com',
            subject: 'test',
            htmlBody: '<h1>Test</h1>'
        }

        await emailService.sendEmail( options );

        expect( mockSendMail ).toHaveBeenCalledWith({
            "attachments": expect.any(Array),
            "html": "<h1>Test</h1>",
            "subject": "test",
            "to": "ignacio@google.com",
        })

    })

    test('should send email with attachements', async() => { 
        const emial = 'ignacio@google.com'
        await emailService.sendEmailWithFileSystemLogs(emial)

        expect( mockSendMail ).toHaveBeenCalledWith({
            to: emial,
            subject: 'Logs del servidor',
            html: expect.any(String),
            attachments: expect.arrayContaining([
                { filename: 'logs-low.log', path: './logs/logs-low.log'},
                { filename: 'logs-high.log', path: './logs/logs-high.log'},
                { filename: 'logs-medium.log', path: './logs/logs-medium.log'}
            ])
        })
    })
})