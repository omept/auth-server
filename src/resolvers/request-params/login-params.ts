import { InputType, Field } from "type-graphql";

@InputType()
export default class LoginParams {
    @Field({ nullable: true })
    email: string;

    @Field({ nullable: true })
    username!: string;

    @Field()
    password: string;

}