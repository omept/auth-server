
import { InputType, Field } from "type-graphql";

@InputType()
export default class ForgotPasswordParams {

    @Field({ nullable: true })
    usernameOrEmail!: string;

}