import { Migration } from '@mikro-orm/migrations';

export class Migration20201025074147 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table `user` (`id` int unsigned not null auto_increment primary key, `created_at` datetime not null, `updated_at` datetime not null, `name` text null, `username` text not null, `email` text not null, `password` text not null, `terms_accepted` tinyint(1) not null, `born` datetime null) default character set utf8mb4 engine = InnoDB;');

    this.addSql('create table `post` (`id` int unsigned not null auto_increment primary key, `created_at` datetime not null, `updated_at` datetime not null, `title` varchar(255) not null) default character set utf8mb4 engine = InnoDB;');
  }

}
