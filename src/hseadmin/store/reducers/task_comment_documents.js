/* eslint-disable default-param-last */
import {
  GET_TASK_COMMENT_DOCUMENTS,
  GET_TASK_COMMENT_DOCUMENTS_PAGINATION,
  POST_TASK_COMMENT_DOCUMENTS,
  UPDATE_TASK_COMMENT_DOCUMENT,
  GET_TASK_COMMENT_DOCUMENT,
} from '../actions/task_comment_documents';

const initialState = {
  taskCommentDocuments: [], // we will save token here.
  taskCommentDocument: null,
  page: 1,
  pagination: null,
  updateTaskCommentDocument: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_TASK_COMMENT_DOCUMENTS:
      console.log('I am here in task_comment_documents --->');
      return {
        ...state,
        taskCommentDocuments: action.payload,
      };

    case GET_TASK_COMMENT_DOCUMENTS_PAGINATION:
      console.log('I am here in pagination --->');
      return {
        ...state,
        pagination: action.payload,
      };

    case POST_TASK_COMMENT_DOCUMENTS:
      return {
        ...state,
        taskCommentDocument: action.payload,
      };

    case UPDATE_TASK_COMMENT_DOCUMENT:
      return {
        ...state,
        editTaskCommentDocument: action.payload,
      };
    case GET_TASK_COMMENT_DOCUMENT:
      console.log('I am here in task_comment_documents --->');
      return {
        ...state,
        taskCommentDocument: action.payload,
      };
    default:
      return state;
  }
};
