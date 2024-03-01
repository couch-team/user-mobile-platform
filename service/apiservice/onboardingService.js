import { apiRoutes } from '../apiroutes';

const baseObject = { isAuth: false };

// The baseObject here is the one specifying whether the endpoint is protected or not, i.e if it requires the Bearrer Token or not.
// The baseObject will always be false for the Authentication side tho, any endpoint you are running in the authentication will be false, it wont require the bearer token

export const LoginUser = data => {
  return {
    url: apiRoutes.LoginUserEndpoint(),
    type: 'post',
    data,
    ...baseObject,
  };
};

export const CreateUser = data => {
  return {
    url: apiRoutes.CreateUserEndpoint(),
    type: 'post',
    data,
    ...baseObject,
  };
};

// You just keep adding for every new endpoint here, that's all
// Just the api route and this too, that's all, then you call it in your component or screen.
