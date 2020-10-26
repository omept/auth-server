import { MyContext } from "src/types";
import argon2 from 'argon2';
import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { User } from "../entities/User";
import RegistrationParams from "./request-params/register-params";
import LoginParams from "./request-params/login-params";
import LoginResponse from "./responses/login-response";
import RegistrationResponse from "./responses/registration-response";
import FieldError from "./responses/field-error";
import { ValidateEmail } from "../utils/validateEmail";





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

    @Mutation(() => RegistrationResponse, { nullable: true })
    async register(
        @Ctx() { em, req }: MyContext,
        @Arg('options') options: RegistrationParams
    ): Promise<RegistrationResponse> {
        const errors: FieldError[] = [];
        // validate 
        const { email, username, password, name } = options;
        if (!ValidateEmail(email)) {
            errors.push({ field: "email", message: "invalid email length" });
        }

        if (username.length <= 5) {
            errors.push({ field: "username", message: "invalid username length. username must be greater than 5" });
        }


        if (password.length <= 6) {
            errors.push({ field: "password", message: "invalid password length. password must be greater than 6" });
        }


        if (name.length <= 0) {
            errors.push({ field: "name", message: "name cannot be empty" });
        }



        const prevUser = await em.findOne(User, { email });
        if (prevUser) {
            console.log(prevUser);
            errors.push({ field: "email", message: "email already exists." });
        }


        try {
            if (!errors.length) {
                const hashPass = await argon2.hash(options.password);
                const user = em.create(User, { name, email, username, password: hashPass })
                await em.persistAndFlush(user);
                // set cookie to login
                req.session.userId = user!.id;
                return { user };
            }
        } catch (error) {
            errors.push({ field: "server_error", message: "error occured while saving" });
        }


        return { errors };

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