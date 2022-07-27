import {
  GET_TASKS_MANAGERS,
  GET_TASKS_MANAGERS_PAGINATION,
  POST_TASKS_MANAGERS,
  GET_TASKS_MANAGER,
  UPDATE_TASKS_MANAGER,
} from '../actions/tasks_managers';

const initialState = {
  tasksManagers: [], // we will save token here.
  tasksManager: null,
  page: 1,
  pagination: null,
  updateTasksManager: null,
};
// eslint-disable-next-line default-param-last
export default (state = initialState, action) => {
  switch (action.type) {
    case GET_TASKS_MANAGERS:
      console.log('I am here in tasksManager --->');
      return {
        ...state,
        tasksManagers: action.payload,
      };

    case GET_TASKS_MANAGERS_PAGINATION:
      console.log('I am here in pagnation --->');
      return {
        ...state,
        pagination: action.payload,
      };

    case POST_TASKS_MANAGERS:
      return {
        ...state,
        tasksManager: action.payload,
      };
    case GET_TASKS_MANAGER:
      return {
        ...state,
        tasksManager: action.payload,
      };
    case UPDATE_TASKS_MANAGER:
      return {
        ...state,
        editTasksManager: action.payload,
      };

    default:
      return state;
  }
};
