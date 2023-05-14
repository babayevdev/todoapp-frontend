import {
  ADD_TODO_REQUEST,
  ADD_TODO_SUCCESS,
  ADD_TODO_FAILURE,
  UPDATE_TODO_REQUEST,
  UPDATE_TODO_SUCCESS,
  UPDATE_TODO_FAILURE,
  DELETE_TODO_REQUEST,
  DELETE_TODO_SUCCESS,
  DELETE_TODO_FAILURE,
  GET_TODOS_REQUEST,
  GET_TODOS_SUCCESS,
  GET_TODOS_FAILURE,
} from './todoActionTypes';
import * as todoService from '../../services/todoService';

export const createTodo = (todo) => async (dispatch) => {
  try {
    dispatch({ type: ADD_TODO_REQUEST });

    const { data } = await todoService.createTodo(todo);

    dispatch({ type: ADD_TODO_SUCCESS, payload: data?.data?.task });
  } catch (error) {
    dispatch({
      type: ADD_TODO_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateTodo = (todoId, todo) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_TODO_REQUEST });
    
    const { data } = await todoService.updateTodo(todoId, todo);
    dispatch({ type: UPDATE_TODO_SUCCESS, payload: data?.data?.task });
  } catch (error) {
    dispatch({
      type: UPDATE_TODO_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteTodo = (todoId) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_TODO_REQUEST });

    const result = await todoService.deleteTodo(todoId);

    dispatch({ type: DELETE_TODO_SUCCESS, payload: todoId });
  } catch (error) {
    dispatch({
      type: DELETE_TODO_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getTodos = (params) => async (dispatch) => {
  try {
    dispatch({ type: GET_TODOS_REQUEST });

    const { data } = await todoService.getTodos(params);

    dispatch({ type: GET_TODOS_SUCCESS, payload: data?.data });
  } catch (error) {
    dispatch({
      type: GET_TODOS_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
