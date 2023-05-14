import React, { useMemo } from "react";
import moment from "moment";
import { FaEdit, FaTrashAlt } from "react-icons/fa";

const Todo = ({ todo, onUpdate, onDelete }) => {
  const deadline = useMemo(() => {
    if (todo.deadline) {
      const dl = new Date(todo.deadline);
      return moment(dl).format('yyyy-MM-DD');
    } else {
      return '';
    }
  }, [todo.deadline])

  const { title, description, assignee, state, priority } = todo;

  return (
    <div className="px-4 py-2 mb-2 bg-white rounded-md shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium">{title}</h3>
        <div className="flex space-x-2">
          <button
            className="rounded-full bg-blue-500 text-white p-2 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            onClick={() => onUpdate(todo)}
          >
            <FaEdit />
          </button>
          <button
            className="rounded-full bg-red-500 text-white p-2 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
            onClick={() => onDelete(todo._id)}
          >
            <FaTrashAlt />
          </button>
        </div>
      </div>
      <p className="text-gray-600">{description}</p>
      <div className="flex justify-between items-center mt-4">
        <div className="flex w-4/12 items-center space-x-2">
          <p className="text-sm text-gray-600">Deadline:</p>
          <p className="text-sm font-medium text-gray-700">{deadline}</p>
        </div>
        <div className="flex w-4/12 items-center space-x-2">
          <p className="text-sm text-gray-600">Assignee:</p>
          <p className="text-sm font-medium text-gray-700">{assignee?.username}</p>
        </div>
        <div className="flex gap-1 w-4/12 justify-end">
          <div>
            <span className={`px-2 py-1 rounded-lg font-bold ${state === "completed" ? "bg-green-500 text-white" : "bg-yellow-500 text-gray-800"}`}>
              {state}
            </span>
          </div>
          <div>
            <span className={`px-2 py-1 rounded-lg font-bold ${state === "completed" ? "bg-green-500 text-white" : "bg-yellow-500 text-gray-800"}`}>
              {priority || 'None'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Todo;
