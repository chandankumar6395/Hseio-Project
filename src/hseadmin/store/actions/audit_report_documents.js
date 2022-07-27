/* eslint-disable default-param-last */
import { fetchGET, fetchPOST, fetchPUT } from '../../utils/NetworkUtils';
import URLConstants from '../../constants/URLConstants';

export const GET_AUDIT_REPORT_DOCUMENTS = 'GET_AUDIT_REPORT_DOCUMENTS';
export const GET_AUDIT_REPORT_DOCUMENTS_PAGINATION =
  'GET_AUDIT_REPORT_DOCUMENTS_PAGINATION';
export const POST_AUDIT_REPORT_DOCUMENTS = 'POST_AUDIT_REPORT_DOCUMENTS';
export const UPDATE_AUDIT_REPORT_DOCUMENT = 'UPDATE_AUDIT_REPORT_DOCUMENT';
export const GET_AUDIT_REPORT_DOCUMENT = 'GET_AUDIT_REPORT_DOCUMENT';
//
export const loadAuditReportDocument = (
  page = 1,
  search = '',
  sort,
  direction,
  limit = 10
) => {
  return async (dispatch) => {
    try {
      let url = `${URLConstants.GET_AUDIT_REPORT_DOCUMENTS_URl}?limit=${limit}&page=${page}&sort=${sort}&direction=${direction}`;

      if (search !== undefined && search !== '') {
        url = `${url}&search=${search}`;
      }
      const resData = await fetchGET(url);

      // console.log('loadAddresses --->', resData);

      dispatch({
        type: GET_AUDIT_REPORT_DOCUMENTS,
        payload: resData.data,
      });

      dispatch({
        type: GET_AUDIT_REPORT_DOCUMENTS_PAGINATION,
        payload: resData.pagination,
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
};

export const addAuditReportDocuments = (division) => {
  return async (dispatch) => {
    try {
      const url = URLConstants.AUDIT_REPORT_DOCUMENT_URL;

      console.log('addAuditReportDocuments url =', url);

      const resData = await fetchPOST(url, division);

      console.log('addAuditReportDocuments --->', resData);

      dispatch({
        type: POST_AUDIT_REPORT_DOCUMENTS,
        payload: resData.data,
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
};

export const getAuditReportDocument = (id) => {
  return async (dispatch) => {
    try {
      const url = `${URLConstants.GET_AUDIT_REPORT_DOCUMENT_URL}/${id}.json`;

      console.log('getAuditReportDocument url =', url);

      const resData = await fetchGET(url);

      console.log('getAuditReportDocument --->', resData);

      dispatch({
        type: GET_AUDIT_REPORT_DOCUMENT,
        payload: resData.data,
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
};

export const updateAuditReportDocument = (division) => {
  return async (dispatch) => {
    try {
      const url = `${URLConstants.GET_AUDIT_REPORT_DOCUMENT_URL}/${division.id}.json`;

      console.log('updateAuditReportDocument url =', url);

      const resData = await fetchPUT(url, division);
      console.log('updateAuditReportDocument --->', resData);

      dispatch({
        type: UPDATE_AUDIT_REPORT_DOCUMENT,
        payload: resData.data,
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
};
