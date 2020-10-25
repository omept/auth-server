import { InputType, Field } from "type-graphql";

@InputType()
export default class RegistrationParams {
    @Field()
    name: string;

    @Field({ nullable: true })
    username: string;

    @Field()
    password: string;

    @Field()
    email: string;
}
