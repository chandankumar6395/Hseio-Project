/* eslint-disable default-param-last */
import { fetchGET, fetchPOST, fetchPUT } from '../../utils/NetworkUtils';
import URLConstants from '../../constants/URLConstants';

export const GET_AUDIT_REPORT_ANSWERS = 'GET_AUDIT_REPORT_ANSWERS ';
export const GET_AUDIT_REPORT_ANSWERS_PAGINATION =
  'GET_AUDIT_REPORT_ANSWERS_PAGINATION';
export const POST_AUDIT_REPORT_ANSWERS = 'POST_AUDIT_REPORT_ANSWERS';
export const GET_AUDIT_REPORT_ANSWER = 'GET_AUDIT_REPORT_ANSWER';
export const UPDATE_AUDIT_REPORT_ANSWER = 'UPDATE_AUDIT_REPORT_ANSWER';

//
export const loadAuditReportAnswers = (
  page = 1,
  search = '',
  sort,
  direction
) => {
  return async (dispatch) => {
    try {
      let url = `${URLConstants.AUDIT_REPORT_ANSWERS_URL}?limit=10&page=${page}&sort=${sort}&direction=${direction}`;

      if (search !== undefined && search !== '') {
        url = `${url}&search=${search}`;
      }

      url = `${URLConstants.AUDIT_REPORT_ANSWERS_URL}`;

      console.log('loadAuditReportAnswerURl url =', url);

      const resData = await fetchGET(url);

      console.log('loadAuditReportAnswer --->', resData);

      dispatch({
        type: GET_AUDIT_REPORT_ANSWERS,
        payload: resData.data,
      });

      dispatch({
        type: GET_AUDIT_REPORT_ANSWERS_PAGINATION,
        payload: resData.pagination,
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
};

export const addAuditReportAnswers = (auditReportAnswer) => {
  return async (dispatch) => {
    try {
      const url = URLConstants.AUDIT_REPORT_ANSWERS_URL;

      console.log('addAuditReportAnswers url =', url);

      const resData = await fetchPOST(url, auditReportAnswer);

      console.log('addAuditReportAnswers --->', resData);

      dispatch({
        type: POST_AUDIT_REPORT_ANSWERS,
        payload: resData.data,
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
};

export const getAuditReportAnswer = (id) => {
  return async (dispatch) => {
    try {
      const url = `${URLConstants.GET_AUDIT_REPORT_ANSWER_URL}/${id}.json`;

      console.log('getAuditReportAnswers url =', url);

      const resData = await fetchGET(url);

      console.log('getAuditReportAnswers --->', resData);

      dispatch({
        type: GET_AUDIT_REPORT_ANSWER,
        payload: resData.data,
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
};

export const updateAuditReportAnswers = (auditReportAnswer) => {
  return async (dispatch) => {
    try {
      const url = `${URLConstants.GET_AUDIT_REPORT_ANSWER_URL}/${auditReportAnswer.id}.json`;

      console.log('updateAuditReportsAnswers url =', url);

      const resData = await fetchPUT(url, auditReportAnswer);

      console.log('updateAuditReportAnswers--->', resData);

      dispatch({
        type: UPDATE_AUDIT_REPORT_ANSWER,
        payload: resData.data,
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
};
