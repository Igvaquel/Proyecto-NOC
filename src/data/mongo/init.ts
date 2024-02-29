import mongoose from "mongoose";


interface ConnectionOptions {
    mongoUrl: string;
    dbName: string;
}



export class MongoDatabase {

    static async connect( options: ConnectionOptions ) {
        const { dbName, mongoUrl } = options;

        try {
            
            await mongoose.connect( mongoUrl, {
                dbName: dbName,
            });

            return true 

        } catch (error) {
            throw error;            
        }
    }
}