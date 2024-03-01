// eslint-disable-next-line no-unused-vars
import React from 'react';
import axios from 'axios';
import { retrieveToken } from '../apiservice/tokenService';

// This place actually, it does not need any changing again, this is how it will be all through the app.

export const request = async ({
  url,
  type,
  data = null,
  isAuth = true,
  noStringify = false,
  contentType = 'Application/json',
  downloadFile = false,
}) => {
  let REQUEST_URL = url;
  let bodyData;
  let service;
  bodyData = noStringify ? JSON.stringify(data) : data;
  let config;

  if (isAuth) {
    // These are for the endpoints that require the Bearer Token to work, those are the ones inside the app mostly
    const token = await retrieveToken();
    config = {
      headers: {
        // "Content-type": contentType,
        Authorization: `Bearer ${token}`,
      },
    };
  } else {
    // These onse do not require the Bearer Token, like the ones that are used for the login and signup, authentication in general
    config = {};
    // We will get our config from the operation below, checking whether the data is a FormData or not
  }

  if (type === 'get') {
    service = axios.get(REQUEST_URL, config);
  } else if (type === 'post' || type === 'put' || type === 'patch') {
    if (data instanceof FormData) {
      bodyData = data;
      config.headers = {
        ...config.headers,
        'Content-Type': 'multipart/form-data',
      };
    } else {
      bodyData = noStringify ? JSON.stringify(data) : data;
      config.headers = {
        ...config.headers,
        'Content-Type': contentType,
      };
    }

    if (type === 'post') {
      service = axios.post(REQUEST_URL, bodyData, config);
    } else if (type === 'put') {
      service = axios.put(REQUEST_URL, bodyData, config);
    } else if (type === 'patch') {
      service = axios.patch(REQUEST_URL, bodyData, config);
    }
  } else if (type === 'delete') {
    service = axios.delete(REQUEST_URL, config);
  }

  return service
    .then(response => response)
    .catch(error => {
      if (error.response) {
        if (error.response.status === 401) {
          // Handle unauthorized access
        } else {
          // Handle other errors
        }
      }
      return Promise.reject(error);
    });
};

export default request;
