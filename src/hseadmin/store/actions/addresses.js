/* eslint-disable default-param-last */
import { fetchGET, fetchPOST, fetchPUT } from '../../utils/NetworkUtils';
import URLConstants from '../../constants/URLConstants';

export const GET_ADDRESSES = 'GET_ADDRESSES';
export const GET_ADDRESSES_PAGINATION = 'GET_ADDRESSES_PAGINATION';
export const POST_ADDRESSES = 'POST_ADDRESSES';
export const GET_ADDRESS = 'GET_ADDRESS';
export const UPDATE_ADDRESS = 'UPDATE_ADDRESS';

//
export const loadAddresses = (page = 1, search = '', sort, direction) => {
  return async (dispatch) => {
    try {
      let url = `${URLConstants.ADDRESSES_URL}?limit=10&page=${page}&sort=${sort}&direction=${direction}`;

      if (search !== undefined && search !== '') {
        url = `${url}&search=${search}`;
      }
      const resData = await fetchGET(url);

      // console.log('loadAddresses --->', resData);

      dispatch({
        type: GET_ADDRESSES,
        payload: resData.data,
      });

      dispatch({
        type: GET_ADDRESSES_PAGINATION,
        payload: resData.pagination,
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
};

export const addAddresses = (address) => {
  return async (dispatch) => {
    try {
      const url = URLConstants.ADDRESSES_URL;

      // console.log('addAddresses url =', url);
      const resData = await fetchPOST(url, address);

      // console.log('addAddresses --->', resData);

      dispatch({
        type: POST_ADDRESSES,
        payload: resData.data,
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
};

export const getAddress = (id) => {
  return async (dispatch) => {
    try {
      const url = `${URLConstants.GET_ADDRESS_URL}/${id}.json`;

      // console.log('getAddress url =', url);
      const resData = await fetchGET(url);

      // console.log('getAddress --->', resData);

      dispatch({
        type: GET_ADDRESS,
        payload: resData.data,
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
};

export const updateAddress = (address) => {
  return async (dispatch) => {
    try {
      const url = `${URLConstants.GET_ADDRESS_URL}/${address.id}.json`;

      // console.log('updateAddress url =', url);

      const resData = await fetchPUT(url, address);

      // console.log('updateAddress --->', resData);

      dispatch({
        type: GET_ADDRESS,
        payload: resData.data,
      });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
      throw error;
    }
  };
};
