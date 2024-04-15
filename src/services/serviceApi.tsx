/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosInstance } from 'axios';
import { showMessage } from 'react-native-flash-message';
import store, { AppDispatch } from '../store';
import { setAccessToken, setRefreshToken } from 'store/slice/authSlice';
import { logout } from 'store/actions/logout';
import useAppDispatch from 'hooks/useAppDispatch';

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

  setupHeaders(token?: string) {
    return {
      headers: {
        'Content-Type': 'application/json',
        Authorization: token
          ? `Bearer ${token}`
          : store.getState().Auth.access_token
          ? `Bearer ${store.getState().Auth.access_token}`
          : '',
      },
    };
  }

  setupImageHeaders(token?: string) {
    return {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: token
          ? `Bearer ${token}`
          : store.getState().Auth.access_token
          ? `Bearer ${store.getState().Auth.access_token}`
          : '',
      },
    };
  }

  async fetch(url: string, token?: string) {
    try {
      const response = await axiosClient.get(
        this.appendToURL(url),
        this.setupHeaders(token),
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

  async post(url: string, data: any, form_data?: boolean, token?: string) {
    try {
      const response = await axiosClient.post(
        this.appendToURL(url),
        data,
        form_data ? this.setupImageHeaders(token) : this.setupHeaders(token),
      );
      return response;
    } catch (err: any) {
      return err;
    }
  }

  async update(url: string, data: any) {
    try {
      const response = await axiosClient.put(
        this.appendToURL(url),
        data,
        this.setupHeaders(),
      );
      return response;
    } catch (err: any) {
      return err;
    }
  }

  async patch(url: string, data: any, form_data?: boolean) {
    try {
      const response = await axiosClient.patch(
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
    const codes = [200, 201, 202, 204];
    const validationErrorCodes = [422, 400, 403];
    if (
      !codes.includes(
        response?.response?.status ||
          response?.response?.statusCode ||
          response?.response?.code,
      )
    ) {
      if (validationErrorCodes.includes(response?.response?.status)) {
        if(response?.response?.message){
          showMessage({
            message: response?.response?.message,
            duration: 3000,
            type: 'danger',
          });
        }
        else if(response?.response?.data?.errors){
          const keys = Object.keys(response?.response?.data?.errors);
          if (response?.response?.data?.errors[keys[0]][0]) {
            keys.forEach(key => {
              response?.response?.data?.errors[key].forEach(
                (errorMessage: string) => {
                  showMessage({
                    message: errorMessage,
                    duration: 3000,
                    type: 'danger',
                  });
                },
              );
            });
          } 
        } 
        else if(response?.response?.data?.non_field_errors){
          response?.response?.data?.non_field_errors?.map((message: string) => {
            return(
              showMessage({
                message: message,
                duration: 3000,
                type: 'danger',
              })
            )
          })
        }
        else if(response?.response?.data){
          const keys = Object.keys(response?.response?.data);
          if (response?.response?.data[keys[0]][0]) {
            keys.forEach(key => {
              response?.response?.data[key].forEach(
                (errorMessage: string) => {
                  showMessage({
                    message: errorMessage,
                    duration: 3000,
                    type: 'danger',
                  });
                },
              );
            });
          } 
        }
        else {
          showMessage({
            message: response?.response?.data?.message,
            duration: 3000,
            type: 'danger',
          });
        }
      }
    } else if (response?.response?.status == 500) {
      showMessage({
        message: 'server Error',
        duration: 3000,
        type: 'danger',
      });
    }
    return !response?.data?.errors &&
      codes.includes(response?.status || response?.statusCode || response?.code)
      ? true
      : false;
  }
}

export default new ServiceApi();
const $api = new ServiceApi();

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

axiosClient.interceptors.request.use(
  config => {
    // console.log('request below')
    // console.log(config)
    return config;
  },
  error => {
    Promise.reject(error);
  },
);

axiosClient.interceptors.response.use(
  responseConfig => {
    // console.log('Response below')
    // console.log(responseConfig)
    return responseConfig;
  },
  async error => {
    const dispatch: AppDispatch = store.dispatch;
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest.retry) {
      originalRequest.retry = true;
      try {
        const newTokenResponse = await refreshToken();
        originalRequest.headers[
          'Authorization'
        ] = `Bearer ${newTokenResponse?.data?.access}`;
        if ($api.isSuccessful(newTokenResponse)) {
          return axiosClient(originalRequest);
        } else {
          dispatch(logout());
          showMessage({
            message: 'Session expired',
            duration: 3000,
            type: 'danger',
          });
          return error;
        }
      } catch (refreshError) {
        return error;
      }
    }

    return Promise.reject(error);
  },
);
