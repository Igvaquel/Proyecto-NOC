import { envs } from "../../../src/config/plugins/envs.plugins";

describe('envs.plugins.ts' , () => {

    test('should return env options' , () => { 
        
        expect( envs ).toEqual({
            "MAILER_EMAIL": "ignaciovaquel182@gmail.com",
            "MAILER_SECRET_KEY": "yznw gwlz bftt hkaw",
            "MAILER_SERVICE": "gmail",
            "MONGO_DB_NAME": "NOC-TEST",
            "MONGO_PASS": 123456789,
            "MONGO_URL": "mongodb://ignacio:123456789@localhost:27017",
            "MONGO_USER": "ignacio",
            "PORT": 3000,
            "PROD": false,
        })
        
    })

    test('should return error if not found env', async() => { 
        
        jest.resetModules();
        process.env.PORT = 'ABC';

        try {
            await import("../../../src/config/plugins/envs.plugins")
            expect(true).toBe(false);
        } catch (error) {
            expect(`${error}`).toContain('"PORT" should be a valid integer')
        }        
    })

})