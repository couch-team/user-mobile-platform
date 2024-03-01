import * as SecureStore from 'expo-secure-store';

const key = 'token';

// We are not changing anything here, this is how it will be all through the app
// Just in case you want to retrieve the token, you call this function, that's all

export const retrieveToken = async () => {
  try {
    const token = await SecureStore.getItemAsync(key);
    return token;
  } catch (error) {
    console.error('Failed to retrieve token', error);
  }
};

export const logout = async () => {
  try {
    await SecureStore.deleteItemAsync(key);
  } catch (error) {
    console.log('Error removing the auth token', error);
  }
};

export default {
  logout,
  retrieveToken,
};
