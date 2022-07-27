import {
  GET_TASK_USERS,
  GET_TASK_USERS_PAGINATION,
  POST_TASK_USERS,
  UPDATE_TASK_USER,
  GET_TASK_USER,
} from '../actions/task_users';

const initialState = {
  taskUsers: [], // we will save token here.
  taskUser: null,
  page: 1,
  pagination: null,
  updateTaskUser: null,
};
// eslint-disable-next-line default-param-last
export default (state = initialState, action) => {
  switch (action.type) {
    case GET_TASK_USERS:
      console.log('I am here in task_user --->');
      return {
        ...state,
        taskUsers: action.payload,
      };

    case GET_TASK_USERS_PAGINATION:
      console.log('I am here in pagination --->');
      return {
        ...state,
        pagination: action.payload,
      };

    case POST_TASK_USERS:
      return {
        ...state,
        taskUser: action.payload,
      };

    case UPDATE_TASK_USER:
      return {
        ...state,
        editTaskUser: action.payload,
      };
    case GET_TASK_USER:
      console.log('I am here in task_user --->');
      return {
        ...state,
        taskUser: action.payload,
      };
    default:
      return state;
  }
};
