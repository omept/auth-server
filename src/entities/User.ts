import { Entity } from "@mikro-orm/core/decorators/Entity";
import { PrimaryKey } from "@mikro-orm/core/decorators/PrimaryKey";
import { Property } from "@mikro-orm/core/decorators/Property";
import { Field, Int, ObjectType } from "type-graphql";

@ObjectType()
@Entity()
export class User {
    @Field(() => Int)
    @PrimaryKey()
    id!: number;

    @Field(() => String)
    @Property({ type: "date" })
    createdAt = new Date();

    @Field(() => String)
    @Property({ type: "date", onUpdate: () => new Date() })
    updatedAt = new Date();

    @Field(() => String)
    @Property({ type: "text", nullable: true })
    name!: string;

    @Field(() => String)
    @Property({ type: "text" })
    username!: string;

    @Field(() => String)
    @Property({ type: "text" })
    email!: string;

    @Property({ type: "text" })
    password!: string;


    @Field(() => Boolean)
    @Property({ type: 'boolean' })
    termsAccepted = false;


    @Field(() => String)
    @Property({ type: 'date', nullable: true })
    born?: Date;


    constructor(name: string, email: string) {
        this.name = name;
        this.email = email;
    }

}