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
  SELECT_TODO,
  CANCEL_EDIT,
} from "./todoActionTypes";

const initialState = {
  todos: [],
  selectedTodo: null,
  todoCound: 0,
  lastAction: null,
  loading: false,
  error: null,
};

const todoReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TODO_REQUEST:
    case UPDATE_TODO_REQUEST:
    case DELETE_TODO_REQUEST:
    case GET_TODOS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case ADD_TODO_SUCCESS:
      return {
        ...state,
        loading: false,
        todos: [...state.todos],
        todoCount: state.todoCount + 1,
        lastAction: ADD_TODO_SUCCESS,
      };
    case UPDATE_TODO_SUCCESS:
      const updatedTodo = action.payload;
      const updatedTodos = state.todos.map(
        todo => todo._id === updatedTodo._id ? updatedTodo : todo
      );
      return {
        ...state,
        loading: false,
        todos: updatedTodos,
      };
    case DELETE_TODO_SUCCESS:
      const deletedTodoId = action.payload;
      const filteredTodos = state.todos.filter(
        todo => todo._id !== deletedTodoId
      );
      return {
        ...state,
        loading: false,
        todos: filteredTodos,
        todoCount: state.todoCount - 1,
        lastAction: DELETE_TODO_SUCCESS,
      };
    case GET_TODOS_SUCCESS:
      return {
        ...state,
        loading: false,
        todos: action.payload.tasks,
        todoCount: action.payload.taskCount,
        lastAction: null,
      };
    case ADD_TODO_FAILURE:
    case UPDATE_TODO_FAILURE:
    case DELETE_TODO_FAILURE:
    case GET_TODOS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case SELECT_TODO:
      return {
        ...state,
        selectedTodo: action.payload,
      };
    case CANCEL_EDIT:
      return {
        ...state,
        selectedTodo: null,
      }
    default:
      return state;
  }
};

export default todoReducer;
