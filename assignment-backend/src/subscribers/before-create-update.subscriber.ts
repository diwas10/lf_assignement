import {
  BeforeCreate,
  BeforeUpdate,
  EventArgs,
  EventSubscriber,
  Subscriber,
} from "@mikro-orm/core";
import { getContextUser } from "@utils/utility";

@Subscriber()
export class BeforeCreateUpdateSubscriber implements EventSubscriber {
  @BeforeCreate()
  async beforeCreate(args: EventArgs<any>): Promise<void> {
    const currentUser = getContextUser()?.id;
    args.entity.createdBy = currentUser;
    args.entity.updatedBy = currentUser;
  }

  @BeforeUpdate()
  async beforeUpdate(args: EventArgs<any>): Promise<void> {
    args.entity.updatedBy = getContextUser()?.id;
  }
}
