/* eslint-disable default-param-last */
import { fetchGET, fetchPOST, fetchPUT } from '../../utils/NetworkUtils';
import URLConstants from '../../constants/URLConstants';

export const GET_AUDIT_TASKS = 'GET_AUDIT_TASKS';
export const GET_AUDIT_TASKS_PAGINATION = 'GET_AUDIT_TASKS_PAGINATION';
export const POST_AUDIT_TASKS = 'POST_AUDIT_TASKS';
export const GET_AUDIT_TASK = 'GET_AUDIT_TASK';
export const UPDATE_AUDIT_TASK = 'UPDATE_AUDIT_TASK';
export const RESET_AUDIT_TASK = 'RESET_AUDIT_TASK';

//
export const loadAuditTasks = (
  page = 1,
  search = '',
  sort,
  direction,
  limit = 5
) => {
  return async (dispatch) => {
    dispatch({
      type: RESET_AUDIT_TASK,
      payload: null,
    });
    try {
      let url = `${URLConstants.AUDIT_TASKS_URL}?limit=${limit}&page=${page}&sort=${sort}&direction=${direction}`;
      if (search !== undefined && search !== '') {
        url = `${url}&search=${search}`;
      }

      const resData = await fetchGET(url);

      console.log('loadAuditTasks --->', resData);

      dispatch({
        type: GET_AUDIT_TASKS,
        payload: resData.data,
      });

      dispatch({
        type: GET_AUDIT_TASKS_PAGINATION,
        payload: resData.pagination,
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
};

export const addAuditTask = (auditTask) => {
  return async (dispatch) => {
    try {
      const url = URLConstants.AUDIT_TASKS_URL;

      console.log('addAuditTasks url =', url);

      const resData = await fetchPOST(url, auditTask);

      console.log('addAuditTasks --->', resData);

      dispatch({
        type: POST_AUDIT_TASKS,
        payload: resData.data,
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
};
export const getAuditTask = (id) => {
  return async (dispatch) => {
    try {
      const url = `${URLConstants.GET_AUDIT_TASK_URL}/${id}.json`;

      console.log('getAuditTask url =', url);

      const resData = await fetchGET(url);

      console.log('getAuditTask --->', resData);

      dispatch({
        type: GET_AUDIT_TASK,
        payload: resData.data,
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
};

export const updateAuditTask = (auditTask) => {
  return async (dispatch) => {
    try {
      const url = `${URLConstants.GET_AUDIT_TASK_URL}/${auditTask.id}.json`;

      console.log('updateAuditTask url =', url);

      const resData = await fetchPUT(url, auditTask);
      console.log('updateAuditTask --->', resData);

      dispatch({
        type: UPDATE_AUDIT_TASK,
        payload: resData.data,
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
};

export const resetAuditTask = () => {
  return async (dispatch) => {
    dispatch({
      type: RESET_AUDIT_TASK,
      payload: null,
    });
  };
};
