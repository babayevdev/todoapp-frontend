import axios from 'axios';
import { CLIENT_URL, SERVER_API_URL } from '../utils/constants';

const baseUrl = `${SERVER_API_URL}/auth`;

export const signin = async (signinData) => {
  const { data } = await axios.post(`${baseUrl}/signin`, signinData);
  return data;
}

export const signup = async (signupData) => (
  await axios.post(`${baseUrl}/signup`, signupData)
)

export const tokenRefresh = async (refreshToken) => {
  const { data } = await axios.post(`${baseUrl}/refresh-token`, {
    refreshToken,
  });
  return data;
}

export const signout = async () => {
  localStorage.setItem('accessToken', null);
  localStorage.setItem('refreshToken', null);
  window.location.href = `${CLIENT_URL}`;
}