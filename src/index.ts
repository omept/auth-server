import { MikroORM } from "@mikro-orm/core";
import { __prod__ } from "./constants";
import { Post } from "./entities/Post";

require('dotenv').config({ path: __dirname + '/.env.local' });

console.log(__dirname);
const main = async () => {
    await MikroORM.init({
        dbName: process.env.DATABASE,
        user: process.env.USER,
        password: process.env.PASSWORD,
        debug: !__prod__,
        type: "mysql",
        entities: [Post]
    });


}


main();