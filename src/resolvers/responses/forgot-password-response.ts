import { Field, ObjectType } from "type-graphql";
import FieldError from "./field-error";

@ObjectType()
export default class ForgotPasswordResponse {
    @Field(() => [FieldError], { nullable: true })
    errors?: FieldError[];

    @Field(() => Boolean, { nullable: true })
    sent?: boolean | null;
}