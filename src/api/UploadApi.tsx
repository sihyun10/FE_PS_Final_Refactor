// eslint-disable-next-line import/named
import axios, { AxiosInstance, CancelTokenSource } from 'axios';
import { MoreturnUrl } from '../utils/constants';

// 반복횟수
const maxRetries = 3;

// const createAxiosInstance = () => {
//   return axios.create({
//     baseURL: MoreturnUrl,
//     headers: {
//       'Content-Type': 'multipart/form-data',
//       accept: '*/*',
//     },
//     responseType: 'json',
//   });
// };

const handleRetry = async (error: any) => {
  const { config } = error;

  config.retries = config.retries || 0;

  if (config.retries < maxRetries) {
    config.retries += 1;
    return instance(config);
  }

  return Promise.reject(error);
};

// const setupResponseInterceptor = (instance: AxiosInstance) => {
//   instance.interceptors.response.use(undefined, handleRetry);
// };

// const instance = createAxiosInstance();
const instance = axios.create({
  baseURL: MoreturnUrl,
  headers: {
    'Content-Type': 'multipart/form-data',
    accept: '*/*',
  },
  responseType: 'json',
});
// setupResponseInterceptor(instance);
instance.interceptors.response.use(undefined, handleRetry);

const cancelTokenSource = (): CancelTokenSource => {
  return axios.CancelToken.source();
};

export { instance, cancelTokenSource };
