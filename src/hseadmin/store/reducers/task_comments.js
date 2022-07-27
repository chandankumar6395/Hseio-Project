import {
  GET_TASK_COMMENTS,
  GET_TASK_COMMENTS_PAGINATION,
  POST_TASK_COMMENTS,
  UPDATE_TASK_COMMENT,
  GET_TASK_COMMENT,
} from '../actions/task_comments';

const initialState = {
  taskComments: [], // we will save token here.
  taskComment: null,
  page: 1,
  pagination: null,
  updateTaskComment: null,
};
// eslint-disable-next-line default-param-last
export default (state = initialState, action) => {
  switch (action.type) {
    case GET_TASK_COMMENTS:
      console.log('I am here in task Comments --->');
      return {
        ...state,
        taskComments: action.payload,
      };

    case GET_TASK_COMMENTS_PAGINATION:
      console.log('I am here in pagination --->');
      return {
        ...state,
        pagination: action.payload,
      };

    case POST_TASK_COMMENTS:
      return {
        ...state,
        taskComments: action.payload,
      };
    case UPDATE_TASK_COMMENT:
      return {
        ...state,
        editTaskComment: action.payload,
      };
    case GET_TASK_COMMENT:
      console.log('I am here in task comment --->');
      return {
        ...state,
        taskComment: action.payload,
      };
    default:
      return state;
  }
};
