import { Migration } from '@mikro-orm/migrations';

export class Migration20221130021725 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "user" alter column "id" type varchar(255) using ("id"::varchar(255));');
    this.addSql('alter table "user" alter column "id" drop default;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "user" alter column "id" type bigint using ("id"::bigint);');
    this.addSql('create sequence if not exists "user_id_seq";');
    this.addSql('select setval(\'user_id_seq\', (select max("id") from "user"));');
    this.addSql('alter table "user" alter column "id" set default nextval(\'user_id_seq\');');
  }

}
