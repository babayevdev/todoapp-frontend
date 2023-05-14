import {
  GET_USERS_REQUEST,
  GET_USERS_SUCCESS,
  GET_USERS_FAILURE,
} from "./userActionTypes";

const initialState = {
  users: [],
  loading: false,
  error: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USERS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
      const deletedTodoId = action.payload;
      const filteredUSERS = state.USERS.filter(
        (todo) => todo.id !== deletedTodoId
      );
      return {
        ...state,
        loading: false,
        USERS: filteredUSERS,
      };
    case GET_USERS_SUCCESS:
      return {
        ...state,
        loading: false,
        users: action.payload,
      };
    case GET_USERS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;
