/* eslint-disable default-param-last */
import {
  GET_AUDIT_TASK_CATEGORIES,
  // eslint-disable-next-line import/named
  GET_AUDIT_TASK_CATEGORIES_PAGINATION,
  POST_AUDIT_TASK_CATEGORIES,
  GET_AUDIT_TASK_CATEGORY,
  UPDATE_AUDIT_TASK_CATEGORY,
} from '../actions/audit_task_categories';

const initialState = {
  auditTaskCategories: [], // we will save token here.
  auditTaskCategory: null,
  page: 1,
  pagination: null,
  updateAuditTaskCategories: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_AUDIT_TASK_CATEGORIES:
      console.log('I am here in AuditTaskCategories --->');
      return {
        ...state,
        auditTaskCategories: action.payload,
      };

    case GET_AUDIT_TASK_CATEGORIES_PAGINATION:
      console.log('I am here in pagnation --->');
      return {
        ...state,
        pagination: action.payload,
      };

    case POST_AUDIT_TASK_CATEGORIES:
      return {
        ...state,
        auditTaskCategory: action.payload,
      };
    case GET_AUDIT_TASK_CATEGORY:
      return {
        ...state,
        auditTaskCategory: action.payload,
      };
    case UPDATE_AUDIT_TASK_CATEGORY:
      return {
        ...state,
        editAuditTaskCategory: action.payload,
      };

    default:
      return state;
  }
};
