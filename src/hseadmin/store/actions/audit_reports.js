/* eslint-disable default-param-last */
import { fetchGET, fetchPOST, fetchPUT } from '../../utils/NetworkUtils';
import URLConstants from '../../constants/URLConstants';

export const GET_AUDIT_REPORTS = 'GET_AUDIT_REPORTS';
export const GET_AUDIT_REPORTS_PAGINATION = 'GET_AUDIT_REPORTS_PAGINATION';
export const POST_AUDIT_REPORTS = 'POST_AUDIT_REPORTS';
export const GET_AUDIT_REPORT = 'GET_AUDIT_REPORT';
export const UPDATE_AUDIT_REPORT = 'UPDATE_AUDIT_REPORT';
export const RESET_AUDIT_REPORT = 'RESET_AUDIT_REPORT';

//
export const loadAuditReports = (
  page = 1,
  search = '',
  sort,
  direction,
  limit = 5
) => {
  return async (dispatch) => {
    dispatch({
      type: RESET_AUDIT_REPORT,
      payload: null,
    });
    try {
      let url = `${URLConstants.AUDIT_REPORTS_URL}?limit=${limit}&page=${page}&sort=${sort}&direction=${direction}`;
      if (search !== undefined && search !== '') {
        url = `${url}&search=${search}`;
      }

      const resData = await fetchGET(url);

      console.log('loadAuditReports --->', resData);

      dispatch({
        type: GET_AUDIT_REPORTS,
        payload: resData.data,
      });

      dispatch({
        type: GET_AUDIT_REPORTS_PAGINATION,
        payload: resData.pagination,
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
};

export const addAuditReport = (auditReport) => {
  return async (dispatch) => {
    try {
      const url = URLConstants.AUDIT_REPORTS_URL;

      console.log('addAuditReports url =', url);

      const resData = await fetchPOST(url, auditReport);

      console.log('addAuditReports --->', resData);

      dispatch({
        type: POST_AUDIT_REPORTS,
        payload: resData.data,
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
};
export const getAuditReport = (id) => {
  return async (dispatch) => {
    try {
      const url = `${URLConstants.GET_AUDIT_REPORT_URL}/${id}.json`;

      console.log('getAuditReport url =', url);

      const resData = await fetchGET(url);

      console.log('getAuditReport --->', resData);

      dispatch({
        type: GET_AUDIT_REPORT,
        payload: resData.data,
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
};

export const updateAuditReport = (auditReport) => {
  return async (dispatch) => {
    try {
      const url = `${URLConstants.GET_AUDIT_REPORT_URL}/${auditReport.id}.json`;

      console.log('updateAuditReport url =', url);

      const resData = await fetchPUT(url, auditReport);
      console.log('updateAuditReport --->', resData);

      dispatch({
        type: UPDATE_AUDIT_REPORT,
        payload: resData.data,
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
};

export const resetAuditReport = () => {
  return async (dispatch) => {
    dispatch({
      type: RESET_AUDIT_REPORT,
      payload: null,
    });
  };
};
