import exp from "constants"
import { LogEntity } from "../../../../src/domain/entities/log.entity"
import { LogRepository } from "../../../../src/domain/repository/log.repository"
import { SendEmailLogs } from "../../../../src/domain/use-cases/email/send-email-logs"

describe('SendLogEmail', () => { 
    
    const mockEmailService = {
        sendEmailWithFileSystemLogs: jest.fn().mockReturnValue(true),
    }
    const mockLogRepository: LogRepository = {
        saveLog: jest.fn(),
        getLogs: jest.fn(),
    }
    
    const sendEmailLogs = new SendEmailLogs(
        mockEmailService as any,
        mockLogRepository
    )

    beforeEach(() => {
        jest.clearAllMocks();
    })
    
    test('should call sendEmail and saveLog', async() => { 
        

        const result = await sendEmailLogs.execute('ignacio@google.com')

        expect( result ).toBeTruthy();
        expect( mockEmailService.sendEmailWithFileSystemLogs ).toHaveBeenCalledTimes(1);
        expect( mockLogRepository.saveLog ).toBeCalledWith( expect.any( LogEntity ) );
        expect( mockLogRepository.saveLog ).toBeCalledWith({
            "createdAt": expect.any(Date),
            "level": "low",
            "message": "Log email sent",
            "origin": "send-email-logs.ts",
        });
            
    })

    test('shouldlog in case of error', async() => { 
        
       mockEmailService.sendEmailWithFileSystemLogs.mockReturnValue(false);

        const result = await sendEmailLogs.execute('ignacio@google.com')

        expect( result ).toBeFalsy();
        expect( mockEmailService.sendEmailWithFileSystemLogs ).toHaveBeenCalledTimes(1);
        expect( mockLogRepository.saveLog ).toBeCalledWith( expect.any( LogEntity ) );
        expect( mockLogRepository.saveLog ).toBeCalledWith({
            "createdAt": expect.any(Date),
            "level": "high",
            "message": "Error: Email log not sent",
            "origin": "send-email-logs.ts",
        });
            
    })
})