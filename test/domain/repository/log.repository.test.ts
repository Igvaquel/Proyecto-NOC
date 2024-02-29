import { LogEntity, LogSeverytyLevel } from "../../../src/domain/entities/log.entity";
import { LogRepository } from "../../../src/domain/repository/log.repository";

describe('log.repository.test.ts', () => { 

    const newLog = new LogEntity({
        origin: 'log.repository.test.ts',
        message: 'test-message',
        level: LogSeverytyLevel.low
    })
    
    class MockLogRepository implements LogRepository {
        async saveLog(log: LogEntity): Promise<void> {
            return;
        }
        async getLogs(severityLevel: LogSeverytyLevel): Promise<LogEntity[]> {
            return[newLog];
        }
    }


    test('should test the abstract class', async() => { 
        
        const mockLogRepository = new MockLogRepository();

        expect( mockLogRepository ).toBeInstanceOf( MockLogRepository );
        expect( typeof mockLogRepository.saveLog ).toBe( 'function' );
        expect( typeof mockLogRepository.getLogs ).toBe( 'function' );

        await mockLogRepository.saveLog( newLog );
        const logs = await mockLogRepository.getLogs( LogSeverytyLevel.high );
        expect( logs ).toHaveLength(1);
        expect( logs[0] ).toBeInstanceOf( LogEntity );

    })
})