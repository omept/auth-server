import { Entity } from "@mikro-orm/core/decorators/Entity";
import { PrimaryKey } from "@mikro-orm/core/decorators/PrimaryKey";
import { Property } from "@mikro-orm/core/decorators/Property";
import { Field } from "type-graphql";


@Entity()
export class User {
    @Field()
    @PrimaryKey()
    id!: number;

    @Field(() => String)
    @Property({ type: "date" })
    createdAt = new Date();

    @Field(() => String)
    @Property({ type: "date", onUpdate: () => new Date() })
    updatedAt = new Date();

    @Field(() => String)
    @Property({ type: "text" })
    name!: string;

    @Field(() => String)
    @Property({ type: "text", unique: true })
    username!: string;

    @Field(() => String)
    @Property({ type: "text", unique: true })
    email!: string;

    @Property({ type: "text" })
    password!: string;



    @Property({ type: 'boolean' })
    termsAccepted = false;


    @Field(() => String)
    @Property({ type: 'date' })
    born?: Date;


    constructor(name: string, email: string) {
        this.name = name;
        this.email = email;
    }

}