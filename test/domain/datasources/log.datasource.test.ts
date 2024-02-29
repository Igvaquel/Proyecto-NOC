import { LogDatasource } from "../../../src/domain/datasources/log.datasource";
import { LogEntity, LogSeverytyLevel } from "../../../src/domain/entities/log.entity"

describe('log.datasoruce.test.ts', () => { 

    const newLog = new LogEntity({
        origin: 'log.datasource.test.ts',
        message: 'test-message',
        level: LogSeverytyLevel.low
    })
    
    class MockLogDatasource implements LogDatasource {
        async saveLog(log: LogEntity): Promise<void> {
            return;
        }
        async getLogs(severityLevel: LogSeverytyLevel): Promise<LogEntity[]> {
            return[newLog];
        }

    }


    test('should test the abstract class', async() => { 
        
        const mockLogDatasource = new MockLogDatasource();

        expect( mockLogDatasource ).toBeInstanceOf( MockLogDatasource );
        expect( typeof mockLogDatasource.saveLog ).toBe( 'function' );
        expect( typeof mockLogDatasource.getLogs ).toBe( 'function' );

        await mockLogDatasource.saveLog( newLog );
        const logs = await mockLogDatasource.getLogs( LogSeverytyLevel.high );
        expect( logs ).toHaveLength(1);
        expect( logs[0] ).toBeInstanceOf( LogEntity );

    })
})