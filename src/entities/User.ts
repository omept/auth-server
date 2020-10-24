import { Entity } from "@mikro-orm/core/decorators/Entity";
import { PrimaryKey } from "@mikro-orm/core/decorators/PrimaryKey";
import { Property } from "@mikro-orm/core/decorators/Property";


@Entity()
export class User {

    @PrimaryKey()
    id!: number;

    @Property()
    createdAt = new Date();

    @Property({ onUpdate: () => new Date() })
    updatedAt = new Date();

    @Property()
    name!: string;

    @Property()
    email!: string;


    @Property()
    termsAccepted = false;

    @Property()
    identities?: string[];

    @Property()
    born?: Date;


    constructor(name: string, email: string) {
        this.name = name;
        this.email = email;
    }

}