
export enum LogSeverytyLevel {
    low    = 'low',
    medium = 'medium',
    high   = 'high',

}

export interface LogEntityOptions {
    level: LogSeverytyLevel; 
    message: string;
    origin: string;
    createdAt?: Date;
}



export class LogEntity {

    public level: LogSeverytyLevel; // Enum
    public message : string;
    public createdAt : Date;
    public origin : string;

    constructor( options: LogEntityOptions ) {  // Cuando mando mando 3 o mas argumentos en un metodo o funcion mandar un objeto con todo lo que necesitemos
        const { message, level, origin, createdAt = new Date()} = options
        this.message = message;
        this.level = level;
        this.createdAt = createdAt;
        this.origin = origin;
    }

    static fromJson = ( json: string ):LogEntity => {
        json = ( json === '' ) ? '{}': json;
        const { message, level, createdAt, origin } = JSON.parse(json);
        
        const log = new LogEntity({ 
            message,
            level,
            createdAt,
            origin,
         });
        log.createdAt = new Date(createdAt);

        return log;
    };


    static fromObject = ( object: { [key: string] : any } ):LogEntity => {
        const { message, level, createdAt, origin } = object;
        const log = new LogEntity({
            message, level, createdAt, origin
        });
        return log;
    }

}