import { fetchGET, fetchPOST, fetchPUT } from '../../utils/NetworkUtils';
import URLConstants from '../../constants/URLConstants';

export const GET_INSPECTIONS = 'GET_INSPECTIONS ';
export const GET_INSPECTIONS_PAGINATION = 'GET_INSPECTIONS_PAGINATION';
export const POST_INSPECTIONS = 'POST_INSPECTIONS ';
export const GET_INSPECTION = 'GET_INSPECTION';
export const UPDATE_INSPECTION = 'UPDATE_INSPECTION';

//
export const loadInspections = (page = 1, search = '', sort, direction) => {
  return async (dispatch) => {
    try {
      let url = `${URLConstants.GET_INSPECTION_URL}?limit=10&page=${page}&sort=${sort}&direction=${direction}`;

      if (search !== undefined && search !== '') {
        url = `${url}&search=${search}`;
      }

      console.log('loadInspections url =', url);

      const resData = await fetchGET(url);

      console.log('loadInspections --->', resData);

      dispatch({
        type: GET_INSPECTIONS,
        payload: resData.data,
      });

      dispatch({
        type: GET_INSPECTIONS_PAGINATION,
        payload: resData.pagination,
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
};

export const addInspections = (job) => {
  return async (dispatch) => {
    try {
      const url = URLConstants.INSPECTIONS_URL;

      console.log('addInspections url =', url);

      const resData = await fetchPOST(url, job);

      console.log('addInspections --->', resData);

      dispatch({
        type: POST_INSPECTIONS,
        payload: resData.data,
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
};

export const getInspection = (id) => {
  return async (dispatch) => {
    try {
      const url = `${URLConstants.GET_INSPECTION_URL}/${id}.json`;

      console.log('getInspection url =', url);

      const resData = await fetchGET(url);

      console.log('getInspection --->', resData);

      dispatch({
        type: GET_INSPECTION,
        payload: resData.data,
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
};

export const updateInspection = (job) => {
  return async (dispatch) => {
    try {
      const url = `${URLConstants.GET_INSPECTION_URL}/${job.id}.json`;

      console.log('updateInspection url =', url);

      const resData = await fetchPUT(url, job);

      console.log('updateInspection --->', resData);

      dispatch({
        type: UPDATE_INSPECTION,
        payload: resData.data,
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
};
