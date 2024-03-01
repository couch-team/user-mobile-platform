const baseApiUrl = process.env.EXPO_PUBLIC_COUCH_URL;

const AUTH_URL = '/auth';
// const PROFILE_URL = '/profile';
// const USERS_URL = '/users';

export const apiRoutes = {
  // Authentication
  LoginUserEndpoint: () => baseApiUrl + AUTH_URL + '/login/',
  CreateUserEndpoint: () => baseApiUrl + AUTH_URL + '/register/',

  // Maybe Users

  // Maybe Profile

  // Just to categories them, nothing in particular, for readability
};
