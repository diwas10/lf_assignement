import {
  Collection,
  Entity,
  EntityRepositoryType,
  ManyToMany,
  PrimaryKey,
  Property,
} from "@mikro-orm/core";
import PatientRepository from "./patient.repository";
import { BaseEntity } from "../../shared/base.entity";
import { AllergiesEntity } from "@core/allergies/allergies.entity";

@Entity({ tableName: "patient", customRepository: () => PatientRepository })
export class PatientEntity extends BaseEntity {
  [EntityRepositoryType]?: PatientRepository;

  @PrimaryKey({ autoincrement: true, type: "bigint" })
  id: number;

  @Property()
  fullName: string;

  @Property()
  email: string;

  @Property()
  contactNumber: string;

  @Property()
  dob: string;

  @Property()
  address: string;

  @Property({ nullable: true })
  profileImage: string;

  @Property()
  isUrgent: boolean;

  @ManyToMany()
  allergies = new Collection<AllergiesEntity>(this);
}
