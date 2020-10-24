import { Entity, PrimaryKey, Property } from "@mikro-orm/core";

@Entity()
export class Post {

    @PrimaryKey()
    id!: number;

    @Property({ type: 'date' })
    createdAt = new Date().toDateString();

    @Property({ type: 'date', onUpdate: () => new Date().toDateString() })
    updatedAt = new Date().toDateString();

    @Property()
    title!: string;

    constructor(title: string) {
        this.title = title;
    }

}