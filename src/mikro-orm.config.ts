import { MikroORM } from "@mikro-orm/core";
import { __prod__ } from "./constants";
import { Post } from "./entities/Post";

require('dotenv').config({ path: __dirname + '/.env.local' });

const options = {
    dbName: process.env.DATABASE_NAME,
    user: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    port: Number(process.env.DATABASE_PORT),
    debug: !__prod__,
    type: "mysql",
    entities: [Post],
    migrations: {
        tableName: 'mikro_orm_migrations', // name of database table with log of executed transactions
        path: __dirname + '/migrations', // path to the folder with migrations
        pattern: /^[\w-]+\d+\.[tj]s$/, // regex pattern for the migration files
    },
    // clientUrl: process.env.CLIENT_URL,

} as Parameters<typeof MikroORM.init>[0];


export async function db(): Promise<MikroORM> {
    return MikroORM.init(options);
}

export default options;
