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
} from "./authActionTypes";

const initialState = {
  loading: false,
  error: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGNIN_REQUEST:
    case SIGNUP_REQUEST:
    case TOKEN_REFRESH_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case SIGNIN_SUCCESS:
    case SIGNUP_SUCCESS:
    case TOKEN_REFRESH_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case SIGNIN_FAILURE:
    case SIGNUP_FAILURE:
    case TOKEN_REFRESH_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default authReducer;
