import axios from 'axios';
import { getBaseUrl } from '@/utils/url.util';

const AxiosInstance = axios.create({
  baseURL: getBaseUrl(),
  headers: {
    Authorization: localStorage.getItem('token'),
    'Content-Type': 'application/json',
    'Access-Control-Allow-Headers': 'Access-Control-Allow-Headers',
    Accept: '*/*',
    timeout: 3000
  }
});

export default AxiosInstance;
