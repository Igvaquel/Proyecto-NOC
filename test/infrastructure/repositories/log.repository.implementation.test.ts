import { LogEntity, LogSeverytyLevel } from "../../../src/domain/entities/log.entity"
import { LogRespositoryImpl } from "../../../src/infrastructure/repositories/log.repository.implementation"


describe('LogRepositoryImpl', () => { 
    
    const mockLogDatasource= {
        saveLog : jest.fn(),
        getLogs : jest.fn()

    }

    const logRespository = new LogRespositoryImpl( mockLogDatasource )
    
    beforeEach(() => {
        jest.clearAllMocks();
    }) 

    test('saveLog should call the datasource with arguments', async() => { 
      
        const log = { level: LogSeverytyLevel.high , message: 'hola'} as LogEntity;
        await logRespository.saveLog( log );
        expect( mockLogDatasource.saveLog ).toHaveBeenCalledWith( log );

    })

    test('getLogs should call the datasource with arguments', async() => { 
      
        await logRespository.getLogs( LogSeverytyLevel.low );
        expect( mockLogDatasource.getLogs ).toBeCalledWith( LogSeverytyLevel.low)
        
    })
})