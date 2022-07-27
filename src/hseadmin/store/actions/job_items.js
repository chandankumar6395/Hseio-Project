import { fetchGET, fetchPOST, fetchPUT } from '../../utils/NetworkUtils';
import URLConstants from '../../constants/URLConstants';

export const GET_JOB_ITEMS = 'GET_JOB_ITEMS';
export const GET_JOB_ITEMS_PAGINATION = 'GET_JOB_ITEMS_PAGINATION';
export const POST_JOB_ITEMS = 'POST_JOB_ITEMS';
export const GET_JOB_ITEM = 'GET_JOB_ITEM';
export const UPDATE_JOB_ITEM = 'UPDATE_JOB_ITEM';

//
export const loadJobItems = (page = 1, search = '', sort, direction) => {
  return async (dispatch) => {
    try {
      let url = `${URLConstants.JOB_ITEMS_URL}?limit=10&page=${page}&sort=${sort}&direction=${direction}`;

      if (search !== undefined && search !== '') {
        url = `${url}&search=${search}`;
      }

      console.log('loadJobItems url =', url);

      const resData = await fetchGET(url);

      console.log('loadJobItems --->', resData);

      dispatch({
        type: GET_JOB_ITEMS,
        payload: resData.data,
      });

      dispatch({
        type: GET_JOB_ITEMS_PAGINATION,
        payload: resData.pagination,
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
};

export const addJobItems = (job) => {
  return async (dispatch) => {
    try {
      const url = URLConstants.JOB_ITEMS_URL;

      console.log('addJobItems url =', url);

      const resData = await fetchPOST(url, job);

      console.log('addJobItems --->', resData);

      dispatch({
        type: POST_JOB_ITEMS,
        payload: resData.data,
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
};

export const getJobItem = (id) => {
  return async (dispatch) => {
    try {
      const url = `${URLConstants.GET_JOB_ITEM_URL}/${id}.json`;

      console.log('getJobItem url =', url);

      const resData = await fetchGET(url);

      console.log('getJobItem --->', resData);

      dispatch({
        type: GET_JOB_ITEM,
        payload: resData.data,
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
};

export const updateJobItem = (job) => {
  return async (dispatch) => {
    try {
      const url = `${URLConstants.GET_JOB_ITEM_URL}/${job.id}.json`;

      console.log('updateJobItem url =', url);

      const resData = await fetchPUT(url, job);

      console.log('updateJobItem --->', resData);

      dispatch({
        type: UPDATE_JOB_ITEM,
        payload: resData.data,
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
};
