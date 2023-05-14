import apiClient from '../utils/apiClient';
import { SERVER_API_URL } from '../utils/constants';

const baseUrl = `${SERVER_API_URL}/task`;

export const getTodos = async (params) => (
  await apiClient.get(baseUrl, { params })
)

export const createTodo = async (todo) => (
  await apiClient.post(baseUrl, todo)
)

export const updateTodo = async (todoId, todo) => (
  await apiClient.put(`${baseUrl}/${todoId}`, todo)
)

export const deleteTodo = async (todoId) => (
  await apiClient.delete(`${baseUrl}/${todoId}`)
)
