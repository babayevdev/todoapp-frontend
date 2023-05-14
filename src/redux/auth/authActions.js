import {
  SIGNIN_REQUEST,
  SIGNIN_SUCCESS,
  SIGNIN_FAILURE,
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,
  TOKEN_REFRESH_REQUEST,
  TOKEN_REFRESH_SUCCESS,
  TOKEN_REFRESH_FAILURE,
} from './authActionTypes';
import * as authService from '../../services/authService';

export const signin = (signinData, navigate) => async (dispatch) => {
  try {
    dispatch({ type: SIGNIN_REQUEST });

    const { data } = await authService.signin(signinData);

    dispatch({ type: SIGNIN_SUCCESS });

    localStorage.setItem('accessToken', data.accessToken);
    localStorage.setItem('refreshToken', data.refreshToken);

    navigate('/');
  } catch (error) {
    dispatch({
      type: SIGNIN_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const signup = (signupData, navigate) => async (dispatch) => {
  try {
    dispatch({ type: SIGNUP_REQUEST });

    const { data } = await authService.signup(signupData);

    dispatch({ type: SIGNUP_SUCCESS });

    if (data.statusCode === 200) {
      navigate('/signin');
    }
  } catch (error) {
    dispatch({
      type: SIGNUP_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const tokenRefresh = () => async (dispatch) => {
  try {
    dispatch({ type: TOKEN_REFRESH_REQUEST });

    const { data } = await authService.tokenRefresh();

    dispatch({ type: TOKEN_REFRESH_SUCCESS });

    // if (data.statusCode === 200) {
    //   navigate('/signin');
    // }
  } catch (error) {
    dispatch({
      type: TOKEN_REFRESH_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};