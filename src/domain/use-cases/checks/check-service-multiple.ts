import { LogEntity, LogSeverytyLevel } from "../../entities/log.entity";
import { LogRespository } from "../../repository/log.repository";


interface CheckServiceMultipleUseCase {
    execute( url: string ):Promise<boolean>;
}

type SuccesCallback = (() => void ) | undefined;
type ErrorCallback = (( error: string ) => void ) | undefined;



export class CheckServiceMultiple implements CheckServiceMultipleUseCase{

    constructor(
        private readonly logRepository: LogRespository[],
        private readonly succesCallback: SuccesCallback,
        private readonly errorCallback: ErrorCallback,
    ) {}

    private callLogs( log: LogEntity ) {
        this.logRepository.forEach( logRepository => {
            logRepository.saveLog(log)
        })
    }

    public async execute( url: string):Promise<boolean>{

        try {
            const req = await fetch( url )
            if( !req.ok){
                throw new Error(`Error on check service ${ url }`)
            }

            const log = new LogEntity({
                message:`Service ${ url } working`, 
                level: LogSeverytyLevel.low, 
                origin: 'check-service.ts'
            });
            
            this.callLogs( log );
            this.succesCallback && this.succesCallback() ;

            return true;
        } catch (error) {
            
            const errorMessage = `${ url } in not ok. ${ error }`;
            const log = new LogEntity({
                message: errorMessage, 
                level: LogSeverytyLevel.high,
                origin: 'check-service.ts'
            });

            this.callLogs( log );
            this.errorCallback && this.errorCallback( errorMessage );

            return false;
        }
    }
}