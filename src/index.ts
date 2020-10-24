import { MikroORM } from "@mikro-orm/core";
import { __prod__ } from "./constants";
import { Post } from "./entities/Post";
import microConfig, { db } from "./mikro-orm.config";

require('dotenv').config({ path: __dirname + '/.env.local' });

console.log(microConfig);
const main = async () => {

    const orm = await db();
    const post = new Post("Welcome Text odd");
    // orm.em.persistAndFlush(post);

}


main().catch((err) => {
    console.error(err);
});