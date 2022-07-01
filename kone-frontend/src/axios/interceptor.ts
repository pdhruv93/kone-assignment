import axios from 'axios';
import { toast } from 'react-toastify';

axios.defaults.baseURL = process.env.REACT_APP_AWS_GATEWAY_URL;

// Intercepting the request
axios.interceptors.request.use((request) => {
  if (request?.headers) {
    // Ref: https://docs.aws.amazon.com/cognito/latest/developerguide/token-endpoint.html
    request.headers['Content-Type'] = 'application/json';
    request.headers['Accept'] = 'application/json';
  }

  return request;
});

// Intercepting the response
axios.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    toast.error(error.response.data.message);
    return Promise.reject(error);
  },
);
