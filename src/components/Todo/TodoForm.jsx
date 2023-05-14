import React, { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import moment from 'moment/moment';
import { TODO_FORM_MODE, STATE_ITEMS, PRIORITY_ITEMS } from '../../utils/constants';
import Select from '../Select';

const TodoForm = ({ createTodo, updateTodo, cancelEdit, users }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [deadline, setDeadline] = useState('');
  const [assignee, setAssignee] = useState('');
  const [state, setState] = useState('');
  const [priority, setPriority] = useState('');
  const [allUsers, setAllUsers] = useState([]);
  const { selectedTodo } = useSelector(state => state.todos);

  const mode = useMemo(() => {
    if (selectedTodo?._id) {
      return TODO_FORM_MODE.EDIT;
    } else {
      return TODO_FORM_MODE.ADD;
    }
  }, [selectedTodo])

  

  useEffect(() => {
    if (users.length > 0) setAllUsers([
      { id: '123456789', value: null, username: 'None' },
      ...users,
    ]);
  }, [users])

  useEffect(() => {
    if (selectedTodo?._id) {
      const dl = selectedTodo.deadline ?
        moment(new Date(selectedTodo.deadline)).format('yyyy-MM-DD') : '';

      resetForm();
      setTitle(selectedTodo.title);
      setDescription(selectedTodo.description);
      setDeadline(dl);
      setAssignee(selectedTodo.assignee?._id);
      setState(selectedTodo.state);
      setPriority(selectedTodo.priority);
    }
  }, [selectedTodo])

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setDeadline('');
    setAssignee('');
    setState('');
    setPriority('');
  }

  const onCancel = () => {
    cancelEdit();
    resetForm();
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title) {
      const newTodo = {
        title,
        description,
        deadline,
        assignee,
        state,
        priority,
      };
      if (mode === TODO_FORM_MODE.ADD) {
        createTodo(newTodo);
      } else {
        updateTodo(selectedTodo._id, newTodo);
        cancelEdit();
      }
      resetForm();
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="title">
            Title
          </label>
          <input
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="title"
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="description">
            Description
          </label>
          <textarea
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="description"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="deadline">
            Deadline
          </label>
          <input
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="deadline"
            type="date"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="assignee">
            Assignee
          </label>
          <select
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="assignee"
            placeholder="Assignee"
            value={assignee}
            onChange={(e) => setAssignee(e.target.value)}
          >
            {allUsers?.map(user => (
              <option key={user._id} value={user._id}>
                {user.username}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="priority">
            Priority
          </label>
          <Select
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="priority"
            placeholder="Priority"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            items={PRIORITY_ITEMS}
            required
          />
        </div>
        {
          mode === TODO_FORM_MODE.EDIT && (
            <div className="mb-6">
              <label className="block text-gray-700 font-bold mb-2" htmlFor="state">
                State
              </label>
              <Select
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="state"
                placeholder="State"
                value={state}
                onChange={(e) => setState(e.target.value)}
                items={STATE_ITEMS}
                required
              />
            </div>
          )
        }
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            {mode === TODO_FORM_MODE.ADD ? 'Add Todo' : 'Edit Todo'}
          </button>
          {
            mode === TODO_FORM_MODE.EDIT && (
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                onClick={onCancel}
              >
                Cancel
              </button>
            )
          }
        </div>
      </form>
    </div>
  );
};

export default TodoForm;
