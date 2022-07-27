import {
  GET_AUDIT_REPORT_ANSWERS,
  // eslint-disable-next-line import/named
  GET_AUDIT_REPORT_ANSWERS_PAGINATION,
  POST_AUDIT_REPORT_ANSWERS,
  GET_AUDIT_REPORT_ANSWER,
  UPDATE_AUDIT_REPORT_ANSWER,
} from '../actions/audit_report_answers';

const initialState = {
  auditReportAnswers: [], // we will save token here.
  auditReportAnswer: null,
  page: 1,
  pagination: null,
  updateAuditReportAnswer: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_AUDIT_REPORT_ANSWERS:
      console.log('I am here in AuditReportAnswers --->');
      return {
        ...state,
        auditReportAnswers: action.payload,
      };

    case GET_AUDIT_REPORT_ANSWERS_PAGINATION:
      console.log('I am here in pagnation --->');
      return {
        ...state,
        pagination: action.payload,
      };

    case POST_AUDIT_REPORT_ANSWERS:
      return {
        ...state,
        auditReportAnswer: action.payload,
      };
    case GET_AUDIT_REPORT_ANSWER:
      return {
        ...state,
        auditReportAnswer: action.payload,
      };
    case UPDATE_AUDIT_REPORT_ANSWER:
      return {
        ...state,
        editAuditReportAnswer: action.payload,
      };

    default:
      return state;
  }
};
