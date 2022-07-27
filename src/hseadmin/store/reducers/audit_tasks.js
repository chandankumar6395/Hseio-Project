/* eslint-disable default-param-last */
// eslint-disable-next-line import/no-self-import
import {
  // eslint-disable-next-line import/named
  GET_AUDIT_TASKS,
  GET_AUDIT_TASKS_PAGINATION,
  GET_AUDIT_TASK,
  POST_AUDIT_TASKS,
  UPDATE_AUDIT_TASK,
  RESET_AUDIT_TASK,
} from '../actions/audit_tasks';

const initialState = {
  auditTasks: [], // we will save token here.
  auditTask: null,
  page: 1,
  pagination: null,
  updateAuditTask: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_AUDIT_TASKS:
      console.log('I am here in audit tasks --->');
      return {
        ...state,
        auditTasks: action.payload,
      };
    case GET_AUDIT_TASKS_PAGINATION:
      console.log('I am here in pagination --->');
      return {
        ...state,
        pagination: action.payload,
      };

    case POST_AUDIT_TASKS:
      return {
        ...state,
        auditTask: action.payload,
      };
    case GET_AUDIT_TASK:
      return {
        ...state,
        auditTask: action.payload,
      };
    case UPDATE_AUDIT_TASK:
      return {
        ...state,
        editAuditTask: action.payload,
      };
    case RESET_AUDIT_TASK:
      return {
        ...state,
        auditTask: null,
      };

    default:
      return state;
  }
};
