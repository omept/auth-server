
import { InputType, Field } from "type-graphql";

@InputType()
export default class PasswordResetParams {

    @Field()
    email: string;

    @Field()
    password: string;

    @Field()
    password_token: string;

}