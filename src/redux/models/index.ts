import { Models } from '@rematch/core';
import { Auth } from './Auth';
import { User } from './User';

export interface RootModel extends Models<RootModel> {
  Auth: typeof Auth;
  User: typeof User;
}

export const models: RootModel = { Auth, User };
