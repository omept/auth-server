import { Entity } from "@mikro-orm/core/decorators/Entity";
import { OneToMany } from "@mikro-orm/core/decorators/OneToMany";
import { PrimaryKey } from "@mikro-orm/core/decorators/PrimaryKey";
import { Property } from "@mikro-orm/core/decorators/Property";
import { Collection } from "@mikro-orm/core/entity/Collection";
import { Post } from "./Post";

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

    @OneToMany(() => Post, post => post.title)
    posts = new Collection<Post>(this);


    constructor(name: string, email: string) {
        this.name = name;
        this.email = email;
    }

}