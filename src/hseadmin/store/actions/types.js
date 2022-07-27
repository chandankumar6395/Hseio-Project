import { fetchGET, fetchPOST, fetchPUT } from '../../utils/NetworkUtils';
import URLConstants from '../../constants/URLConstants';

export const GET_TYPES = 'GET_TYPES';
export const GET_TYPES_PAGINATION = 'GET_TYPES_PAGINATION';
export const POST_TYPES = 'POST_TYPES';
export const GET_TYPE = 'GET_TYPE';
export const UPDATE_TYPE = 'UPDATE_TYPE';

//
export const loadTypes = (page = 1, search = '', sort, direction) => {
  return async (dispatch) => {
    try {
      let url = `${URLConstants.TYPES_URL}?limit=10&page=${page}&sort=${sort}&direction=${direction}`;

      if (search !== undefined && search !== '') {
        url = `${url}&search=${search}`;
      }

      console.log('loadTypes url =', url);

      const resData = await fetchGET(url);

      console.log('loadTypes --->', resData);

      dispatch({
        type: GET_TYPES,
        payload: resData.data,
      });

      dispatch({
        type: GET_TYPES_PAGINATION,
        payload: resData.pagination,
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
};

export const addTypes = (type) => {
  return async (dispatch) => {
    try {
      const url = URLConstants.TYPES_URL;

      console.log('addTypes url =', url);

      const resData = await fetchPOST(url, type);

      console.log('addType --->', resData);

      dispatch({
        type: POST_TYPES,
        payload: resData.data,
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
};

export const getType = (id) => {
  return async (dispatch) => {
    try {
      const url = `${URLConstants.GET_TYPE_URL}/${id}.json`;

      console.log('getType url =', url);

      const resData = await fetchGET(url);

      console.log('getType --->', resData);

      dispatch({
        type: GET_TYPE,
        payload: resData.data,
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
};

export const updateType = (type) => {
  return async (dispatch) => {
    try {
      const url = `${URLConstants.GET_TYPE_URL}/${type.id}.json`;

      console.log('updateType url =', url);

      const resData = await fetchPUT(url, type);

      console.log('updateType --->', resData);

      dispatch({
        type: GET_TYPE,
        payload: resData.data,
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
};
