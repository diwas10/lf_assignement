import { Migration } from '@mikro-orm/migrations';

export class Migration20221204042724 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "allergies" ("id" serial primary key, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "is_deleted" boolean not null, "is_permanent" boolean not null, "created_by" uuid null, "updated_by" uuid null, "is_active" boolean not null, "name" varchar(255) not null);');

    this.addSql('create table "patient_allergies" ("patient_entity_id" bigint not null, "allergies_entity_id" int not null, constraint "patient_allergies_pkey" primary key ("patient_entity_id", "allergies_entity_id"));');

    this.addSql('alter table "patient_allergies" add constraint "patient_allergies_patient_entity_id_foreign" foreign key ("patient_entity_id") references "patient" ("id") on update cascade on delete cascade;');
    this.addSql('alter table "patient_allergies" add constraint "patient_allergies_allergies_entity_id_foreign" foreign key ("allergies_entity_id") references "allergies" ("id") on update cascade on delete cascade;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "patient_allergies" drop constraint "patient_allergies_allergies_entity_id_foreign";');

    this.addSql('drop table if exists "allergies" cascade;');

    this.addSql('drop table if exists "patient_allergies" cascade;');
  }

}
