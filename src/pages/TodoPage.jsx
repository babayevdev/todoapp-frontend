import React, { useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TodoForm from '../components/Todo/TodoForm';
import TodoList from '../components/Todo/TodoList';
import Pagination from '../components/Pagenation';
import SearchBox from '../components/SearchBox';
import Select from '../components/Select';
import * as todoAction from '../redux/todos/todoActions';
import { getUsers } from '../redux/users/userActions';
import {
  ADD_TODO_SUCCESS,
  CANCEL_EDIT,
  DELETE_TODO_SUCCESS,
  SELECT_TODO,
} from '../redux/todos/todoActionTypes';
import {
  STATE_ITEMS,
  PRIORITY_ITEMS,
} from '../utils/constants';

const TodoPage = () => {
  const dispatch = useDispatch();
  const { todos, todoCount, lastAction } = useSelector(state => state.todos);
  const { users } = useSelector(state => state.users);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [priority, setPriority] = useState('');
  const [search, setSearch] = useState('');
  const [state, setState] = useState('');

  const totalPages = useMemo(
    () => Math.ceil(todoCount / pageSize),
    [todoCount, pageSize]
  );

  const params = useMemo(() => ({
    page: currentPage,
    pageSize,
    search,
    state,
    priority,
  }), [currentPage, pageSize, search, state, priority])

  useEffect(() => {
    dispatch(todoAction.getTodos());
    dispatch(getUsers());
  }, []);

  useEffect(() => {
    if (lastAction === ADD_TODO_SUCCESS) {
      setCurrentPage(totalPages);
      dispatch(todoAction.getTodos({ ...params, page: totalPages }));
    } else if (lastAction === DELETE_TODO_SUCCESS) {
      dispatch(todoAction.getTodos(params));
    }
  }, [lastAction])

  useEffect(() => {
    dispatch(todoAction.getTodos(params));
  }, [currentPage, pageSize])

  useEffect(() => {
    setCurrentPage(1);
    console.log(params);
    dispatch(todoAction.getTodos({ ...params, page: 1 }));
  }, [search, state, priority])

  const createTodo = (todo) => {
    dispatch(todoAction.createTodo(todo));
  }

  const selectTodo = (todo) => {
    dispatch({ type: SELECT_TODO, payload: todo });
  }

  const updateTodo = (todoId, todo) => {
    dispatch(todoAction.updateTodo(todoId, todo));
  }

  const deleteTodo = (todoId) => {
    dispatch(todoAction.deleteTodo(todoId));
  }

  const cancelEdit = () => {
    dispatch({ type: CANCEL_EDIT });
  }

  const onChangePage = (page) => {
    setCurrentPage(page);
  }

  const onSearch = (search) => {
    setSearch(search);
  }

  const onStateChange = (e) => {
    setState(e.target.value);
  }

  const onPriorityChange = (e) => {
    setPriority(e.target.value);
  }

  return (
    <div>
      <div className='flex flex-row gap-3'>
        <div className='w-4/12'>
          <TodoForm createTodo={createTodo} updateTodo={updateTodo} cancelEdit={cancelEdit} users={users} />
        </div>
        <div className='w-8/12 flex flex-col'>
          <div className='flex flex-row mb-2 gap-2'>
            <div className='w-4/12'>
              <SearchBox onSearch={onSearch} />
            </div>
            <div className='w-4/12'>
              <Select value={state} items={STATE_ITEMS} onChange={onStateChange} placeholder='state' />
            </div>
            <div className='w-4/12'>
              <Select value={priority} items={PRIORITY_ITEMS} onChange={onPriorityChange} placeholder='priority' />
            </div>
          </div>
          <TodoList todos={todos} onUpdate={selectTodo} onDelete={deleteTodo} />
          <Pagination currentPage={currentPage} totalPages={totalPages} onChangePage={onChangePage} />
        </div>
      </div>
    </div>
  );
};

export default TodoPage;
