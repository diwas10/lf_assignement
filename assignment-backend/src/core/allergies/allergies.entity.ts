import {
  Collection,
  Entity,
  EntityRepositoryType,
  ManyToMany,
  PrimaryKey,
  Property,
} from "@mikro-orm/core";
import AllergiesRepository from "./allergies.repository";
import { BaseEntity } from "../../shared/base.entity";
import { PatientEntity } from "@core/patient/patient.entity";

@Entity({ tableName: "allergies", customRepository: () => AllergiesRepository })
export class AllergiesEntity extends BaseEntity {
  [EntityRepositoryType]?: AllergiesRepository;

  @PrimaryKey({ autoincrement: true })
  id: number;

  @Property()
  name: string;

  @ManyToMany(() => PatientEntity, (patientEntity) => patientEntity.allergies)
  patient = new Collection<PatientEntity>(this);
}
