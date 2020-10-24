import { Migration } from '@mikro-orm/migrations';

export class Migration20201024122950 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table `user` (`id` int unsigned not null auto_increment primary key, `created_at` json not null, `updated_at` json not null, `name` varchar(255) not null, `email` varchar(255) not null, `terms_accepted` json not null, `identities` text not null, `born` datetime not null) default character set utf8mb4 engine = InnoDB;');

    this.addSql('create table `post` (`id` int unsigned not null auto_increment primary key, `created_at` datetime not null, `updated_at` datetime not null, `title` varchar(255) not null) default character set utf8mb4 engine = InnoDB;');
  }

}
