import { Server } from "./presentation/server";
import { envs } from './config/plugins/envs.plugins';
import { MongoDatabase } from './data/mongo/init';
import { PrismaClient } from '@prisma/client';

(async() => {
    main()
})();


async function main() {

    await MongoDatabase.connect({
        mongoUrl: envs.MONGO_URL,
        dbName: envs.MONGO_DB_NAME
    })


    

    Server.start();
}
