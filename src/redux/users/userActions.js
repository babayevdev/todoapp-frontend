import {
  GET_USERS_REQUEST,
  GET_USERS_SUCCESS,
  GET_USERS_FAILURE,
} from './userActionTypes';
import * as userService from '../../services/userService';

export const getUsers = () => async (dispatch) => {
  try {
    dispatch({ type: GET_USERS_REQUEST });

    // Make API call to get all todos
    const { data } = await userService.getUsers();

    dispatch({ type: GET_USERS_SUCCESS, payload: data?.users });
  } catch (error) {
    dispatch({
      type: GET_USERS_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
