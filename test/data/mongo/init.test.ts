import mongoose from "mongoose";
import { envs } from "../../../src/config/plugins/envs.plugins";
import { MongoDatabase } from "../../../src/data/mongo"

describe('init MongoDB' , () => {

    afterAll(() => {
        mongoose.connection.close()
    })

    test('should connect to MongoDB', async() => {

        
        const connected = await MongoDatabase.connect({
            dbName: process.env.MONGO_DB_NAME!,
            mongoUrl: process.env.MONGO_URL!
        })

        expect( connected ).toBe(true)
    });

    test('should throw an error', async() => {

        try {
            const connected = await MongoDatabase.connect({
                dbName: process.env.MONGO_DB_NAME!,
                mongoUrl: 'mongodb://ignacio:123456@localhost:2asd7017asdasd'
            })
            expect( true ).toBe(false)
        } catch (error) {
            
        }


    })
})