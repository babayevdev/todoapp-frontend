import React from 'react';
import Todo from './Todo';

const TodoList = ({ todos, onUpdate, onDelete }) => {
  return (
    <ul className="divide-y divide-gray-200">
      {todos?.map((todo) => (
        <Todo key={todo._id} todo={todo} onUpdate={onUpdate} onDelete={onDelete} />
      ))}
    </ul>
  );
};

export default TodoList;
