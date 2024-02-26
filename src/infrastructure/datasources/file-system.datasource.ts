import fs from "fs";
import { LogDatasource } from "../../domain/datasources/log.datasource"
import { LogEntity, LogSeverytyLevel } from "../../domain/entities/log.entity";




export class FileSystemDatasource implements LogDatasource {

    private readonly logPath = 'logs/';
    private readonly allLogsPath    = 'logs/logs-low.log';
    private readonly mediumLogsPath = 'logs/logs-medium.log';
    private readonly highLogsPath   = 'logs/logs-high.log';

    constructor() {
        this.createLogsFiles(); // Apenas se cree una instancia FileSystemDatasource y sea utilizada se crean los dir y archivos
    }

    // Asegura que esten creados los directorios y archivos esten creados, sino los crea
    private createLogsFiles = () => {

        if( !fs.existsSync( this.logPath ) ){
            fs.mkdirSync( this.logPath )
        }

        [
            this.allLogsPath,
            this.mediumLogsPath,
            this.highLogsPath,
        ].forEach( path => {
            if( fs.existsSync( path ) ) return;

            fs.writeFileSync( path, '');
        });

    }

    async saveLog( newLog: LogEntity ): Promise<void> {

        const logAsJson =  `${ JSON.stringify(newLog) }\n`;
        
        fs.appendFileSync( this.allLogsPath, logAsJson ); // Guardar el log como un JSON

        if( newLog.level === LogSeverytyLevel.low )return;

        if( newLog.level === LogSeverytyLevel.medium ){
            fs.appendFileSync( this.mediumLogsPath, logAsJson  )
        } else {
            fs.appendFileSync( this.highLogsPath, logAsJson  )

        }

    }

    private getLogsFromFile = ( path: string ): LogEntity[] => {
        const content = fs.readFileSync( path, 'utf-8');
        if( content === '' ) return[];

        const logs = content.split('\n').map( LogEntity.fromJson );

        return logs;
    }


    async getLog(severityLevel: LogSeverytyLevel): Promise<LogEntity[]> {

        switch ( severityLevel ) {
            case LogSeverytyLevel.low:
                return this.getLogsFromFile( this.allLogsPath );

            case LogSeverytyLevel.medium:
                return this.getLogsFromFile( this.mediumLogsPath );

            case LogSeverytyLevel.high:
                return this.getLogsFromFile( this.highLogsPath );

            default:
                throw new Error(`${ severityLevel } not implemented`);

        }
    }

}