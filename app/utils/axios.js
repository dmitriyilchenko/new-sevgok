import axios from 'axios';
import { Platform } from 'react-native';

import { AXIOS_TIMEOUT, VERSION } from '../constants';


const axiosInstance = axios.create({
  timeout: AXIOS_TIMEOUT,
  headers: {
    Platform: Platform.OS,
    Accept: 'application/vnd.comparo.dk; version=2',
    'Build-Number': VERSION
  }
});

export default axiosInstance;
