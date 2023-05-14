import {
  createStore,
  applyMiddleware,
  combineReducers
} from 'redux';
import thunk from 'redux-thunk';
import todoReducer from "./todos/todoReducer";
import userReducer from './users/userReducer';
import authReducer from './auth/authReducer';

const rootReducer = combineReducers({
  todos: todoReducer,
  users: userReducer,
  auth: authReducer,
});

const store = createStore(
  rootReducer,
  applyMiddleware(thunk),
);

export default store;
