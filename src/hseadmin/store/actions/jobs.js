import { fetchGET, fetchPOST, fetchPUT } from '../../utils/NetworkUtils';
import URLConstants from '../../constants/URLConstants';

export const GET_JOBS = 'GET_JOBS ';
export const GET_JOBS_PAGINATION = 'GET_JOBS_PAGINATION';
export const POST_JOBS = 'POST_JOBS ';
export const GET_JOB = 'GET_JOB';
export const UPDATE_JOB = 'UPDATE_JOB';

//
export const loadJobs = (page = 1, search = '', sort, direction) => {
  return async (dispatch) => {
    try {
      let url = `${URLConstants.JOBS_URL}?limit=10&page=${page}&sort=${sort}&direction=${direction}`;

      if (search !== undefined && search !== '') {
        url = `${url}&search=${search}`;
      }

      console.log('loadJobs url =', url);

      const resData = await fetchGET(url);

      console.log('loads --->', resData);

      dispatch({
        type: GET_JOBS,
        payload: resData.data,
      });

      dispatch({
        type: GET_JOBS_PAGINATION,
        payload: resData.pagination,
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
};

export const addJobs = (job) => {
  return async (dispatch) => {
    try {
      const url = URLConstants.JOBS_URL;

      console.log('addJobs url =', url);

      const resData = await fetchPOST(url, job);

      console.log('addJobs --->', resData);

      dispatch({
        type: POST_JOBS,
        payload: resData.data,
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
};

export const getJob = (id) => {
  return async (dispatch) => {
    try {
      const url = `${URLConstants.GET_JOB_URL}/${id}.json`;

      console.log('getJob url =', url);

      const resData = await fetchGET(url);

      console.log('getJob --->', resData);

      dispatch({
        type: GET_JOB,
        payload: resData.data,
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
};

export const updateJob = (job) => {
  return async (dispatch) => {
    try {
      const url = `${URLConstants.GET_JOB_URL}/${job.id}.json`;

      console.log('updateJob url =', url);

      const resData = await fetchPUT(url, job);

      console.log('updateJob --->', resData);

      dispatch({
        type: UPDATE_JOB,
        payload: resData.data,
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
};
