/* eslint-disable default-param-last */
import { fetchGET, fetchPOST, fetchPUT } from '../../utils/NetworkUtils';
import URLConstants from '../../constants/URLConstants';

export const GET_AUDIT_TYPES = 'GET_AUDIT_TYPES';
export const GET_AUDIT_TYPES_PAGINATION = 'GET_AUDIT_TYPES_PAGINATION';
export const POST_AUDIT_TYPES = 'POST_AUDIT_TYPES';
export const GET_AUDIT_TYPE = 'GET_AUDIT_TYPE';
export const UPDATE_AUDIT_TYPE = 'UPDATE_AUDIT_TYPE';

//
export const loadAuditTypes = (page = 1, search = '', sort, direction) => {
  return async (dispatch) => {
    try {
      let url = `${URLConstants.AUDIT_TYPES_URL}?limit=10&page=${page}&sort=${sort}&direction=${direction}`;

      if (search !== undefined && search !== '') {
        url = `${url}&search=${search}`;
      }

      console.log('loadAuditTypes url =', url);

      const resData = await fetchGET(url);

      console.log('loadAuditTypes --->', resData);

      dispatch({
        type: GET_AUDIT_TYPES,
        payload: resData.data,
      });

      dispatch({
        type: GET_AUDIT_TYPES_PAGINATION,
        payload: resData.pagination,
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
};

export const addAuditTypes = (auditType) => {
  return async (dispatch) => {
    try {
      const url = URLConstants.AUDIT_TYPES_URL;

      console.log('addAuditTypes url =', url);

      const resData = await fetchPOST(url, auditType);

      console.log('addAuditType --->', resData);

      dispatch({
        type: POST_AUDIT_TYPES,
        payload: resData.data,
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
};

export const getAuditType = (id) => {
  return async (dispatch) => {
    try {
      const url = `${URLConstants.GET_AUDIT_TYPE_URL}/${id}.json`;

      console.log('getAuditType url =', url);

      const resData = await fetchGET(url);

      console.log('getAuditType --->', resData);

      dispatch({
        type: GET_AUDIT_TYPE,
        payload: resData.data,
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
};

export const updateAuditType = (auditType) => {
  return async (dispatch) => {
    try {
      const url = `${URLConstants.GET_AUDIT_TYPE_URL}/${auditType.id}.json`;

      console.log('updateAuditType url =', url);

      const resData = await fetchPUT(url, auditType);

      console.log('updateAuditType --->', resData);

      dispatch({
        type: GET_AUDIT_TYPE,
        payload: resData.data,
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
};
