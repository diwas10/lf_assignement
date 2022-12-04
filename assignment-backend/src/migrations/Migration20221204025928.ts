import { Migration } from '@mikro-orm/migrations';

export class Migration20221204025928 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "patient" add column "is_urgent" boolean not null;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "patient" drop column "is_urgent";');
  }

}
