"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const Entity_1 = require("@mikro-orm/core/decorators/Entity");
const OneToMany_1 = require("@mikro-orm/core/decorators/OneToMany");
const PrimaryKey_1 = require("@mikro-orm/core/decorators/PrimaryKey");
const Property_1 = require("@mikro-orm/core/decorators/Property");
const Collection_1 = require("@mikro-orm/core/entity/Collection");
const Post_1 = require("./Post");
let User = class User {
    constructor(name, email) {
        this.createdAt = new Date();
        this.updatedAt = new Date();
        this.termsAccepted = false;
        this.posts = new Collection_1.Collection(this);
        this.name = name;
        this.email = email;
    }
};
__decorate([
    PrimaryKey_1.PrimaryKey(),
    __metadata("design:type", Number)
], User.prototype, "id", void 0);
__decorate([
    Property_1.Property(),
    __metadata("design:type", Object)
], User.prototype, "createdAt", void 0);
__decorate([
    Property_1.Property({ onUpdate: () => new Date() }),
    __metadata("design:type", Object)
], User.prototype, "updatedAt", void 0);
__decorate([
    Property_1.Property(),
    __metadata("design:type", String)
], User.prototype, "name", void 0);
__decorate([
    Property_1.Property(),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    Property_1.Property(),
    __metadata("design:type", Object)
], User.prototype, "termsAccepted", void 0);
__decorate([
    Property_1.Property(),
    __metadata("design:type", Array)
], User.prototype, "identities", void 0);
__decorate([
    Property_1.Property(),
    __metadata("design:type", Date)
], User.prototype, "born", void 0);
__decorate([
    OneToMany_1.OneToMany(() => Post_1.Post, post => post.title),
    __metadata("design:type", Object)
], User.prototype, "posts", void 0);
User = __decorate([
    Entity_1.Entity(),
    __metadata("design:paramtypes", [String, String])
], User);
exports.User = User;
//# sourceMappingURL=User.js.map