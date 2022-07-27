/* eslint-disable default-param-last */
import {
  GET_AUDIT_REPORT_DOCUMENTS,
  GET_AUDIT_REPORT_DOCUMENTS_PAGINATION,
  POST_AUDIT_REPORT_DOCUMENTS,
  UPDATE_AUDIT_REPORT_DOCUMENT,
  GET_AUDIT_REPORT_DOCUMENT,
} from '../actions/audit_report_documents';

const initialState = {
  auditReportDocuments: [], // we will save token here.
  auditReportDocument: null,
  page: 1,
  pagination: null,
  updateAuditReportDocument: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_AUDIT_REPORT_DOCUMENTS:
      console.log('I am here in auditReportDocuments --->');
      return {
        ...state,
        auditReportDocument: action.payload,
      };

    case GET_AUDIT_REPORT_DOCUMENTS_PAGINATION:
      console.log('I am here in pagination --->');
      return {
        ...state,
        pagination: action.payload,
      };

    case POST_AUDIT_REPORT_DOCUMENTS:
      return {
        ...state,
        auditReportDocument: action.payload,
      };

    // default:
    //   return state;

    case GET_AUDIT_REPORT_DOCUMENT:
      return {
        ...state,
        auditReportDocument: action.payload,
      };
    case UPDATE_AUDIT_REPORT_DOCUMENT:
      return {
        ...state,
        auditReportDocument: action.payload,
      };
    default:
      return state;
  }
};
