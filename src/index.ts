import "reflect-metadata"
import { __prod__ } from "./constants";
import { db } from "./mikro-orm.config";
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { HelloResolver } from "./resolvers/hello";
import { PostResolver } from "./resolvers/post-resolver";
import { UserResolver } from "./resolvers/user-resolver";

require('dotenv').config({ path: __dirname + '/.env.local' });

const main = async () => {
    // init database
    const orm = await db();

    // init express
    const app = express();

    // init qraphql
    const apolloServer = new ApolloServer({
        schema: await buildSchema({
            resolvers: [
                HelloResolver,
                PostResolver,
                UserResolver
            ],
            validate: false
        }),
        context: () => ({ em: orm.em })
    });

    apolloServer.applyMiddleware({ app });

    app.listen(process.env.NODE_SERVER_PORT, () => {
        console.log(`Server started on port ${process.env.NODE_SERVER_PORT}`);
    });


}


main().catch((err) => {
    console.error(err);
});