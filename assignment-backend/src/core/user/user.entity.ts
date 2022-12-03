import { Entity, EntityRepositoryType, PrimaryKey, Property } from "@mikro-orm/core";
import { v4 } from "uuid";
import UserRepository from "@core/user/user.repository";
import { BaseEntity } from "../../shared/base.entity";

@Entity({ tableName: "user", customRepository: () => UserRepository })
export class UserEntity extends BaseEntity {
  [EntityRepositoryType]?: UserRepository;

  @PrimaryKey()
  id = v4();

  @Property()
  email: string;

  @Property({ hidden: true })
  password: string;

  @Property({ type: "text", hidden: true, nullable: true })
  refreshToken: string;
}
