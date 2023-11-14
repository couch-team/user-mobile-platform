import { Models } from '@rematch/core';
import { Auth } from './Auth';
import { Journal } from './Journal';
import { User } from './User';

export interface RootModel extends Models<RootModel> {
  Auth: typeof Auth;
  Journal: typeof Journal;
  User: typeof User;
}

export const models: RootModel = { Auth, Journal, User };
