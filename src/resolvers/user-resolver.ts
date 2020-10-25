import { MyContext } from "src/types";
import argon2 from 'argon2';
import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { User } from "../entities/User";
import RegistrationParams from "./request-params/register-params";
import LoginParams from "./request-params/login-params";
import LoginResponse from "./responses/login-response";





@Resolver()
export class UserResolver {

    @Query(() => User, { nullable: true })
    async me(
        @Ctx() { em, req }: MyContext,
    ): Promise<User | null> {
        console.log(req.session.userId);
        // not logged in
        if (!req.session.userId) {
            return null;
        }
        const user = await em.findOne(User, { id: req.session.userId })
        return user ?? null;
    }

    @Mutation(() => User, { nullable: true })
    async register(
        @Ctx() { em, req }: MyContext,
        @Arg('options') options: RegistrationParams
    ): Promise<User | null> {

        const hashPass = await argon2.hash(options.password);
        const user = em.create(User, { name: options.name, email: options.email, username: options.username, password: hashPass })
        await em.persistAndFlush(user);

        // set cookie to login
        req.session.userId = user!.id;

        return user;

    }


    @Mutation(() => LoginResponse, { nullable: true })
    async login(
        @Ctx() { em, req }: MyContext,
        @Arg('options') options: LoginParams
    ): Promise<LoginResponse> {
        const { username, email, password } = options;
        let user: User | null;
        let errors = [];

        if (username) {
            user = await em.findOne(User, { username });
        } else if (email) {
            user = await em.findOne(User, { email });
        } else {
            user = null;
        }

        if (!user) {
            errors.push({ field: "username", message: "invalid username or email" });
        } else {
            const validPass = await argon2.verify(user.password, password);
            if (!validPass) {
                errors.push({ field: "password", message: "invalid password" });
            }
        }


        if (errors.length) {
            return { errors };
        } else {
            req.session.userId = user!.id;
            return { user };
        }

    }


}