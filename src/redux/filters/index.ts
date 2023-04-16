import { createFilter } from 'redux-persist-transform-filter';

const AuthFilter = createFilter('Auth', ['isLoggedIn']);

export const AllFilters = [AuthFilter];
