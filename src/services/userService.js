import apiClient from '../utils/apiClient';
import { SERVER_API_URL } from '../utils/constants';

const baseUrl = `${SERVER_API_URL}/user`;

export const getUsers = async () => {
  const { data } = await apiClient.get(baseUrl);
  return data;
}
