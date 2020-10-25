import { Field, ObjectType } from "type-graphql";

@ObjectType()
export default class FieldError {
    @Field()
    field: String

    @Field()
    message: String
} 