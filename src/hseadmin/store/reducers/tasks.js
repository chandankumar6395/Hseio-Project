import {
  // eslint-disable-next-line import/named
  GET_TASKS,
  GET_TASKS_PAGINATION,
  POST_TASKS,
  GET_TASK,
  UPDATE_TASK,
} from '../actions/tasks';

const initialState = {
  tasks: [], // we will save token here.
  task: null,
  page: 1,
  pagination: null,
  updateTask: null,
};
// eslint-disable-next-line default-param-last
export default (state = initialState, action) => {
  switch (action.type) {
    case GET_TASKS:
      console.log('I am here in tasks --->');
      return {
        ...state,
        tasks: action.payload,
      };

    case GET_TASKS_PAGINATION:
      console.log('I am here in pagnation --->');
      return {
        ...state,
        pagination: action.payload,
      };

    case POST_TASKS:
      return {
        ...state,
        question: action.payload,
      };
    case GET_TASK:
      return {
        ...state,
        task: action.payload,
      };
    case UPDATE_TASK:
      return {
        ...state,
        editTask: action.payload,
      };

    default:
      return state;
  }
};
