/* eslint-disable default-param-last */
// eslint-disable-next-line import/no-self-import
import {
  // eslint-disable-next-line import/named
  GET_AUDIT_REPORTS,
  GET_AUDIT_REPORTS_PAGINATION,
  GET_AUDIT_REPORT,
  POST_AUDIT_REPORTS,
  UPDATE_AUDIT_REPORT,
  RESET_AUDIT_REPORT,
} from '../actions/audit_reports';

const initialState = {
  auditReports: [], // we will save token here.
  auditReport: null,
  page: 1,
  pagination: null,
  updateAuditReport: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_AUDIT_REPORTS:
      console.log('I am here in audit reports --->');
      return {
        ...state,
        auditReports: action.payload,
      };
    case GET_AUDIT_REPORTS_PAGINATION:
      console.log('I am here in pagination --->');
      return {
        ...state,
        pagination: action.payload,
      };

    case POST_AUDIT_REPORTS:
      return {
        ...state,
        auditReport: action.payload,
      };
    case GET_AUDIT_REPORT:
      return {
        ...state,
        auditReport: action.payload,
      };
    case UPDATE_AUDIT_REPORT:
      return {
        ...state,
        editAuditReport: action.payload,
      };
    case RESET_AUDIT_REPORT:
      return {
        ...state,
        auditReport: null,
      };

    default:
      return state;
  }
};
