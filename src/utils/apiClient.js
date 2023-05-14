import axios from 'axios';
import { tokenRefresh } from '../services/authService';
import { isSignedin, refreshTokenExists } from './checker';
import { CLIENT_URL } from './constants';

let blocking = false;

axios.interceptors.request.use(function (config) {
  const accessToken = isSignedin();
  config.headers.Authorization =  `Bearer ${accessToken}`;
  return config;
});

axios.interceptors.response.use(
  function (response) {
    return response;
  }, 
  async function (error) {
    if (error.response.data?.statusCode === 401) {
      // if (blocking) return error;
      // blocking = true;

      localStorage.setItem('accessToken', null);
      
      const refreshToken = refreshTokenExists();
      if (refreshToken) {
        try {
          const { data } = await tokenRefresh(refreshToken);
          if (data?.accessToken) {
            localStorage.setItem('accessToken', data.accessToken);
            window.location.href = CLIENT_URL;
          }
        } catch (error) {
          localStorage.setItem('refreshToken', null);
          window.location.href = `${CLIENT_URL}/signin`;
        }
      } else {
        localStorage.setItem('refreshToken', null);
        window.location.href = '/signin';
      }
    }
    // blocking = false;
    return error;
  }
);

export default axios;