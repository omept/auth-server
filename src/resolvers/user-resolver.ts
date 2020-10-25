import { MyContext } from "src/types";
import argon2 from 'argon2';
import { Arg, Ctx, Mutation, Resolver } from "type-graphql";
import { User } from "../entities/User";
import RegistrationParams from "./request-params/register-params";
import LoginParams from "./request-params/login-params";





@Resolver()
export class UserResolver {

    @Mutation(() => User, { nullable: true })
    async register(
        @Ctx() { em }: MyContext,
        @Arg('options') options: RegistrationParams
    ): Promise<User | null> {

        const hashPass = await argon2.hash(options.password);
        const user = em.create(User, { name: options.name, email: options.email, username: options.username, password: hashPass })
        await em.persistAndFlush(user);
        return user;

    }


    @Mutation(() => User, { nullable: true })
    async login(
        @Ctx() { em }: MyContext,
        @Arg('options') options: LoginParams
    ): Promise<User | String | null> {
        const { username, email } = options;
        const hashPass = await argon2.hash(options.password);
        let user: User | null;
        if (username) {
            user = await em.findOne(User, { username: options.username, password: hashPass })
        } else if (email) {
            user = await em.findOne(User, { email: options.email, password: hashPass })
        } else {
            return "invalid login credentials";
        }

        return user;

    }


}