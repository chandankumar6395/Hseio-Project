/* eslint-disable default-param-last */
import {
  GET_AUDIT_TASK_CATEGORY_QUESTIONS,
  // eslint-disable-next-line import/named
  GET_AUDIT_TASK_CATEGORY_QUESTIONS_PAGINATION,
  POST_AUDIT_TASK_CATEGORY_QUESTIONS,
  GET_AUDIT_TASK_CATEGORY_QUESTION,
  UPDATE_AUDIT_TASK_CATEGORY_QUESTION,
} from '../actions/audit_task_category_questions';

const initialState = {
  auditTaskCategoryQuestions: [], // we will save token here.
  auditTaskCategoryQuestion: null,
  page: 1,
  pagination: null,
  updateAuditTaskCategoryQuestions: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_AUDIT_TASK_CATEGORY_QUESTIONS:
      console.log('I am here in AuditTaskCategoryQuestion --->');
      return {
        ...state,
        auditTaskCategoryQuestions: action.payload,
      };

    case GET_AUDIT_TASK_CATEGORY_QUESTIONS_PAGINATION:
      console.log('I am here in pagnation --->');
      return {
        ...state,
        pagination: action.payload,
      };

    case POST_AUDIT_TASK_CATEGORY_QUESTIONS:
      console.log('I am here in post --->');
      return {
        ...state,
        auditTaskCategoryQuestions: action.payload,
      };
    case GET_AUDIT_TASK_CATEGORY_QUESTION:
      return {
        ...state,
        auditTaskCategoryQuestion: action.payload,
      };
    case UPDATE_AUDIT_TASK_CATEGORY_QUESTION:
      return {
        ...state,
        editAuditTaskCategoryQuestion: action.payload,
      };

    default:
      return state;
  }
};
