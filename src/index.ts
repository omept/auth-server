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

import redis from 'redis';
import session from 'express-session';
import connectRedis from 'connect-redis';

let RedisStore = connectRedis(session)
let redisClient = redis.createClient()



const main = async () => {
    // init database
    const orm = await db();

    // init express
    const app = express();

    // redis session for express
    app.use(
        session({
            name: "redditlikeqid",
            store: new RedisStore({ client: redisClient, ttl: process.env.SESSION_APP_TTL }),
            secret: String(process.env.SESSION_APP_KEY),
            resave: false,
            saveUninitialized: false,
            cookie: {
                maxAge: Number(process.env.SESSION_APP_COOKIE_TTL),
                httpOnly: true,
                secure: __prod__,
                sameSite: 'lax'
            }
        })
    );


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
        context: ({ req, res }) => ({ em: orm.em, req, res })
    });


    apolloServer.applyMiddleware({ app });

    app.listen(process.env.NODE_SERVER_PORT, () => {
        console.log(`Server started on port ${process.env.NODE_SERVER_PORT}`);
    });


}


main().catch((err) => {
    console.error(err);
});