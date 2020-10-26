import { User } from "../../entities/User";
import { Field, ObjectType } from "type-graphql";
import FieldError from "./field-error";

@ObjectType()
export default class RegistrationResponse {
    @Field(() => [FieldError], { nullable: true })
    errors?: FieldError[];

    @Field(() => User, { nullable: true })
    user?: User | null;
}