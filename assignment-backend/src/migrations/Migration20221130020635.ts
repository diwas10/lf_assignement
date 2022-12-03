import { Migration } from '@mikro-orm/migrations';

export class Migration20221130020635 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "patient" ("id" bigserial primary key, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "is_deleted" boolean not null, "is_permanent" boolean not null, "created_by" uuid null, "updated_by" uuid null, "is_active" boolean not null, "full_name" varchar(255) not null, "email" varchar(255) not null, "contact_number" varchar(255) not null, "dob" varchar(255) not null, "address" varchar(255) not null, "profile_image" varchar(255) null);');

    this.addSql('create table "user" ("id" bigserial primary key, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "is_deleted" boolean not null, "is_permanent" boolean not null, "created_by" uuid null, "updated_by" uuid null, "is_active" boolean not null, "email" varchar(255) not null, "password" varchar(255) not null, "refresh_token" text null);');
  }

  async down(): Promise<void> {
    this.addSql('drop table if exists "patient" cascade;');

    this.addSql('drop table if exists "user" cascade;');
  }

}
