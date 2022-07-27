/* eslint-disable default-param-last */
import {
  GET_TASK_CATEGORIES,
  GET_TASK_CATEGORIES_PAGINATION,
  POST_TASK_CATEGORIES,
  UPDATE_TASK_CATEGORY,
  GET_TASK_CATEGORY,
} from '../actions/task_categories';

const initialState = {
  taskCategories: [], // we will save token here.
  taskCategory: null,
  page: 1,
  pagination: null,
  updateTaskCategory: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_TASK_CATEGORIES:
      console.log('I am here in task Category --->');
      return {
        ...state,
        taskCategories: action.payload,
      };

    case GET_TASK_CATEGORIES_PAGINATION:
      console.log('I am here in pagination --->');
      return {
        ...state,
        pagination: action.payload,
      };

    case POST_TASK_CATEGORIES:
      return {
        ...state,
        taskCategory: action.payload,
      };
    case UPDATE_TASK_CATEGORY:
      return {
        ...state,
        editTaskCategory: action.payload,
      };
    case GET_TASK_CATEGORY:
      console.log('I am here in task category --->');
      return {
        ...state,
        taskCategory: action.payload,
      };
    default:
      return state;
  }
};
