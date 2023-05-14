export const SERVER_API_URL = (
  process.env.SERVER_API_URL || 'http://localhost:8000/api'
);

export const CLIENT_URL = (
  process.env.CLIENT_URL || 'http://localhost:3000'
)

export const TODO_FORM_MODE = {
  ADD: 'ADD',
  EDIT: 'EDIT',
};

export const TASK_STATUS = {
  TODO: 'Todo',
  INPROGRESS: 'Inprogress',
  FINISHED: 'Finished',
};

export const TASK_PRIORITY = {
  LOW: 'Low',
  NORMAL: 'Normal',
  HIGH: 'High',
};

export const STATE_ITEMS = (() => {
  const items = Object.values(TASK_STATUS).map(value => ({
    key: value,
    name: value,
    value,
  }));
  items.unshift({ key: 'None', name: 'No State', value: ''});
  return items;
})();

export const PRIORITY_ITEMS = (() => {
  const items = Object.values(TASK_PRIORITY).map(value => ({
    key: value,
    name: value,
    value,
  }));
  items.unshift({ key: 'None', name: 'No Priority', value: ''});
  return items;
})();