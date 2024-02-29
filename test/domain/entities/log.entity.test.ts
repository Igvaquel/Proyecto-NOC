import { LogEntity, LogSeverytyLevel } from "../../../src/domain/entities/log.entity"

describe('logEntity', () => { 
    
    const dataObj = {
        message: 'Hola mundo',
        level: LogSeverytyLevel.high,
        origin: 'log.entity.test.ts'
    }

    test('should create a logEntity instace', () => { 
        
        const log = new LogEntity(dataObj)

        expect( log ).toBeInstanceOf( LogEntity );
        expect( log.message ).toBe( dataObj.message );
        expect( log.level ).toBe( dataObj.level );
        expect( log.origin ).toBe( dataObj.origin );
        expect( log.createdAt ).toBeInstanceOf( Date );

    })

    test('should create a LogEntity instance from json', () => { 
        
        const json = '{"message":"Service https://google.com working","level":"low","createdAt":"2024-02-06T20:33:00.258Z","origin":"check-service.ts"}'

        const log = LogEntity.fromJson(json);

        expect( log ).toBeInstanceOf( LogEntity );
        expect( log.message ).toBe( "Service https://google.com working" );
        expect( log.level ).toBe( LogSeverytyLevel.low );
        expect( log.origin ).toBe( "check-service.ts" );
        expect( log.createdAt ).toBeInstanceOf( Date );
    })

    test('should create a LogEntity instance from object', () => { 
        
        const log = LogEntity.fromObject(dataObj)

        expect( log ).toBeInstanceOf( LogEntity );
        expect( log.message ).toBe( dataObj.message );
        expect( log.level ).toBe( dataObj.level );
        expect( log.origin ).toBe( dataObj.origin );
        expect( log.createdAt ).toBeInstanceOf( Date );

    })
})