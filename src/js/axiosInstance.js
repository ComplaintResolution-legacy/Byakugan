import axios from 'axios';

let axiosInstance = axios.create({
  baseURL: 'http://complaint-resolver.eu-gb.mybluemix.net/v1',
  timeout: 20000,
  headers: {'Content-Type': 'application/json'}
});

export default axiosInstance;