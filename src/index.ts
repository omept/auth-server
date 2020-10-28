import { __prod__ } from "./constants";
import { db } from "./mikro-orm.config";
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { HelloResolver } from "./resolvers/hello";
import { PostResolver } from "./resolvers/post-resolver";
import { UserResolver } from "./resolvers/user-resolver";
import cors from 'cors';
require('dotenv').config({ path: __dirname + '/.env.local' });

import Redis from 'ioredis';
import session from 'express-session';
import connectRedis from 'connect-redis';

// set up redis
let RedisStore = connectRedis(session)
let redisClient = new Redis(
    Number(process.env.REDIS_PORT),
    String(process.env.REDIS_HOST),
    {
        username: process.env.REDIS_USERNAME,
        password: process.env.REDIS_PASSWORD
    }
)



const main = async () => {
    // init database
    const orm = await db();

    // init express
    const app = express();

    app.use(cors({
        origin: process.env.WEB_CLIENT_URL,
        credentials: true
    }));
    // redis session for express
    app.use(
        session({
            name: process.env.APP_COOKIE_ID,
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
        // pass contex values that can be accessed in all the resolvers
        context: ({ req, res }) => ({ em: orm.em, req, res, redis: redisClient })
    });


    apolloServer.applyMiddleware({
        app, cors: false
    });

    app.listen(process.env.NODE_SERVER_PORT, () => {
        console.log(`Server started on port ${process.env.NODE_SERVER_PORT}`);
    });


}


main().catch((err) => {
    console.error(err);
});