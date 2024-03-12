import axios, { AxiosInstance } from 'axios';
import { showMessage } from 'react-native-flash-message';
import store from '../store';
import { logout, setAccessToken, setRefreshToken } from 'store/slice/authSlice';
import { $api } from 'services';

export const baseURL = process.env.EXPO_PUBLIC_COUCH_URL;

const axiosConfig = {
  withCredentials: false,
  headers: {
    Accept: 'application/json',
  },
};

const axiosClient: AxiosInstance = axios.create(axiosConfig);

class ServiceApi {
  public url = baseURL;

  appendToURL(url: string) {
    return `${this.url}${url}`;
  }

  setupHeaders() {
    // console.log(store.getState().Auth.access_token);
    return {
      headers: {
        'Content-Type': 'application/json',
        Authorization: store.getState().Auth.access_token
          ? `Bearer ${store.getState().Auth.access_token}`
          : '',
      },
    };
  }

  setupImageHeaders() {
    return {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${store.getState().Auth.access_token}`,
      },
    };
  }

  async fetch(url: string) {
    try {
      const response = await axiosClient.get(
        this.appendToURL(url),
        this.setupHeaders(),
      );
      return response;
    } catch (err: any) {
      return err;
    }
  }

  async delete(url: string) {
    try {
      const response = await axiosClient.delete(
        this.appendToURL(url),
        this.setupHeaders(),
      );
      return response;
    } catch (err: any) {
      return err;
    }
  }

  async post(url: string, data: any, form_data?: boolean) {
    try {
      const response = await axiosClient.post(
        this.appendToURL(url),
        data,
        form_data ? this.setupImageHeaders() : this.setupHeaders(),
      );
      return response;
    } catch (err: any) {
      return err;
    }
  }

  async update(url: string, data: any, form_data?: boolean) {
    try {
      const response = await axiosClient.put(
        this.appendToURL(url),
        data,
        form_data ? this.setupImageHeaders() : this.setupHeaders(),
      );
      return response;
    } catch (err: any) {
      return err;
    }
  }

  async patch(url: string, data: any, form_data?: boolean) {
    try {
      const response = await axiosClient.put(
        this.appendToURL(url),
        data,
        form_data ? this.setupImageHeaders() : this.setupHeaders(),
      );
      return response;
    } catch (err: any) {
      return err;
    }
  }

  isSuccessful(response: any): boolean {
    // console.log(JSON.stringify(response));
    const codes = [200, 201, 202, 204];
    const validationErrorCodes = [422, 400, 403];
    const authorizationErrorCodes = [401];
    if (
      !codes.includes(
        response?.response?.status ||
          response?.response?.statusCode ||
          response?.response?.code,
      )
    ) {
      if (validationErrorCodes.includes(response?.response?.status)) {
        const keys = response?.response?.data?.error
          ? Object.keys(response?.response?.data?.error?.message)
          : Object.keys(response?.response?.data?.errors);
        if (Array.isArray(response?.response?.data?.error?.message[keys[0]])) {
          showMessage({
            message: response?.response?.data?.error?.message[keys[0]][0],
            duration: 3000,
            type: 'danger',
          });
        } else if (!Array.isArray(response?.response?.data?.error?.message)) {
          showMessage({
            message: response?.response?.data?.error?.message,
            duration: 3000,
            type: 'danger',
          });
        } else if (response?.response?.data?.errors[keys[0]][0]) {
          showMessage({
            message: response?.response?.data?.errors[keys[0]],
            duration: 3000,
            type: 'danger',
          });
        } else {
          showMessage({
            message: response?.response?.data?.message,
            duration: 3000,
            type: 'success',
          });
        }
      } else if (authorizationErrorCodes.includes(response?.response?.status)) {
        //do nothing here since there is an interceptor below to handle authorization errors
      } else if (response?.response?.status === 500) {
        showMessage({
          message: 'server Error',
          duration: 3000,
          type: 'danger',
        });
      }
    }
    return !response?.data?.errors &&
      codes.includes(response?.status || response?.statusCode || response?.code)
      ? true
      : false;
  }
}

axiosClient.interceptors.request.use(async config => {
  //   console.log(config);
  return config;
});

async function refreshToken() {
  try {
    const response = await $api.post('/api/auth/refresh/', {
      refresh: store.getState().Auth.refresh_token,
    });
    if ($api.isSuccessful(response)) {
      store.dispatch(setAccessToken(response?.data?.access));
      store.dispatch(setRefreshToken(response?.data?.refresh));
    }
    return response;
  } catch (err: any) {
    return err;
  }
}

axiosClient.interceptors.response.use(
  response => {
    return response;
  },
  async error => {
    const originalRequest = error.config;

    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest.retry
    ) {
      originalRequest.retry = true;

      try {
        const token = await refreshToken();
        if ($api.isSuccessful(token)) {
          return axiosClient(originalRequest);
        }
      } catch (refreshError) {
        showMessage({
          message: 'Session expired',
          duration: 3000,
          type: 'danger',
        });
        store.dispatch(logout());
      }
    }

    return Promise.reject(error);
  },
);

export default new ServiceApi();
