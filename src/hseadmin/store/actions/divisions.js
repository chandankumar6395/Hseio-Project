/* eslint-disable default-param-last */
import { fetchGET, fetchPOST, fetchPUT } from '../../utils/NetworkUtils';
import URLConstants from '../../constants/URLConstants';

export const GET_DIVISIONS = 'GET_DIVISIONS';
export const GET_DIVISIONS_PAGINATION = 'GET_DIVISIONS_PAGINATION';
export const POST_DIVISIONS = 'POST_DIVISIONS';
export const GET_DIVISION = 'GET_DIVISION';
export const UPDATE_DIVISION = 'UPDATE_DIVISION';
// export const RESET_COMPANY = 'RESET_COMPANY';

//
export const loadDivisions = (
  page = 1,
  search = '',
  sort,
  direction,
  limit = 10
) => {
  return async (dispatch) => {
    try {
      let url = `${URLConstants.DIVISIONS_URL}?limit=${limit}&page=${page}&sort=${sort}&direction=${direction}`;

      if (search !== undefined && search !== '') {
        url = `${url}&search=${search}`;
      }
      const resData = await fetchGET(url);

      // console.log('loadAddresses --->', resData);

      dispatch({
        type: GET_DIVISIONS,
        payload: resData.data,
      });

      dispatch({
        type: GET_DIVISIONS_PAGINATION,
        payload: resData.pagination,
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
};

export const addDivisions = (division) => {
  return async (dispatch) => {
    try {
      const url = URLConstants.DIVISIONS_URL;

      console.log('addDivisions url =', url);

      const resData = await fetchPOST(url, division);

      console.log('addDivisions --->', resData);

      dispatch({
        type: POST_DIVISIONS,
        payload: resData.data,
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
};

export const getDivision = (id) => {
  return async (dispatch) => {
    try {
      const url = `${URLConstants.GET_DIVISION_URL}/${id}.json`;

      console.log('getDivision url =', url);

      const resData = await fetchGET(url);

      console.log('getDivision --->', resData);

      dispatch({
        type: GET_DIVISION,
        payload: resData.data,
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
};

export const updateDivision = (division) => {
  return async (dispatch) => {
    try {
      const url = `${URLConstants.GET_DIVISION_URL}/${division.id}.json`;

      console.log('updateDivision url =', url);

      const resData = await fetchPUT(url, division);
      console.log('updateDivision --->', resData);

      dispatch({
        type: UPDATE_DIVISION,
        payload: resData.data,
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
};
