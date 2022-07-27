import { fetchGET, fetchPOST, fetchPUT } from '../../utils/NetworkUtils';
import URLConstants from '../../constants/URLConstants';

export const GET_JOB_WORK_AUTHORIZATIONS = 'GET_JOB_WORK_AUTHORIZATIONS';
export const GET_JOB_WORK_AUTHORIZATIONS_PAGINATION =
  'GET_JOB_WORK_AUTHORIZATIONS_PAGINATION';
export const POST_JOB_WORK_AUTHORIZATIONS = 'POST_JOB_WORK_AUTHORIZATIONS';
export const GET_JOB_WORK_AUTHORIZATION = 'GET_JOB_WORK_AUTHORIZATION';
export const UPDATE_JOB_WORK_AUTHORIZATION = 'UPDATE_JOB_WORK_AUTHORIZATION';

export const loadJobWorkAuthorizations = (
  page = 1,
  search = '',
  sort,
  direction
) => {
  return async (dispatch) => {
    try {
      let url = `${URLConstants.JOB_WORK_AUTHORIZATIONS_URL}?limit=10&page=${page}&sort=${sort}&direction=${direction}`;

      if (search !== undefined && search !== '') {
        url = `${url}&search=${search}`;
      }

      console.log('loadJobWorkAuthorizations url =', url);

      const resData = await fetchGET(url);
      console.log('loadJobWorkAuthorizations --->', resData);

      dispatch({
        type: GET_JOB_WORK_AUTHORIZATIONS,
        payload: resData.data,
      });

      dispatch({
        type: GET_JOB_WORK_AUTHORIZATIONS_PAGINATION,
        payload: resData.pagination,
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
};

export const addJobWorkAuthorizations = (jobWorkAuthorization) => {
  return async (dispatch) => {
    try {
      const url = URLConstants.JOB_WORK_AUTHORIZATIONS_URL;

      console.log('addJobWorkAuthorizations url =', url);

      const resData = await fetchPOST(url, jobWorkAuthorization);

      console.log('addJobWorkAuthorizations --->', resData);

      dispatch({
        type: POST_JOB_WORK_AUTHORIZATIONS,
        payload: resData.data,
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
};

export const getJobWorkAuthorization = (id) => {
  return async (dispatch) => {
    try {
      const url = `${URLConstants.GET_JOB_WORK_AUTHORIZATION_URL}/${id}.json`;

      console.log('getJobWorkAuthorization url =', url);

      const resData = await fetchGET(url);
      console.log('getJobWorkAuthorization --->', resData);

      dispatch({
        type: GET_JOB_WORK_AUTHORIZATION,
        payload: resData.data,
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
};

export const updateJobWorkAuthorization = (jobWorkAuthorization) => {
  return async (dispatch) => {
    try {
      const url = `${URLConstants.GET_JOB_WORK_AUTHORIZATION_URL}/${jobWorkAuthorization.id}.json`;

      console.log('updateJobWorkAuthorization url =', url);

      const resData = await fetchPUT(url, jobWorkAuthorization);

      console.log('updateJobWorkAuthorization --->', resData);

      dispatch({
        type: UPDATE_JOB_WORK_AUTHORIZATION,
        payload: resData.data,
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
};
