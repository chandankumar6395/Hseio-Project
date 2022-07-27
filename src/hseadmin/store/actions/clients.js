/* eslint-disable default-param-last */
import { fetchGET, fetchPOST, fetchPUT } from '../../utils/NetworkUtils';
import URLConstants from '../../constants/URLConstants';

export const GET_CLIENTS = 'GET_CLIENTS';
export const GET_CLIENTS_PAGINATION = 'GET_CLIENTS_PAGINATION';
export const POST_CLIENT = 'POST_CLIENT';
export const GET_CLIENT = 'GET_CLIENT';
export const UPDATE_CLIENT = 'UPDATE_CLIENT';
export const RESET_CLIENT = 'RESET_CLIENT';

//
export const loadClients = (
  page = 1,
  search = '',
  sort,
  direction,
  companyId = -1,
  limit = 10
) => {
  return async (dispatch) => {
    try {
      let url = `${URLConstants.CLIENTS_URL}?limit=${limit}&page=${page}&sort=${sort}&direction=${direction}`;
      if (search !== undefined && search !== '') {
        url = `${url}&search=${search}`;
      }

      if (companyId !== -1) {
        url = `${url}&company_id=${companyId}`;
      }

      const resData = await fetchGET(url);

      console.log('loadClients --->', resData);

      dispatch({
        type: GET_CLIENTS,
        payload: resData.data,
      });

      dispatch({
        type: GET_CLIENTS_PAGINATION,
        payload: resData.pagination,
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
};

export const addClient = (entity) => {
  return async (dispatch) => {
    try {
      const url = URLConstants.CLIENTS_URL;

      console.log('addClients url =', url);

      const resData = await fetchPOST(url, entity);

      console.log('addClients --->', resData);

      dispatch({
        type: POST_CLIENT,
        payload: resData.data,
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
};
export const getClient = (id) => {
  return async (dispatch) => {
    try {
      const url = `${URLConstants.GET_CLIENT_URL}/${id}.json`;

      console.log('getClient url =', url);

      const resData = await fetchGET(url);

      console.log('getClient --->', resData);

      dispatch({
        type: GET_CLIENT,
        payload: resData.data,
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
};

export const updateClient = (entity) => {
  return async (dispatch) => {
    try {
      const url = `${URLConstants.GET_CLIENT_URL}/${entity.id}.json`;

      console.log('updateClient url =', url);

      const resData = await fetchPUT(url, entity);
      console.log('updateClient --->', resData);

      dispatch({
        type: UPDATE_CLIENT,
        payload: resData.data,
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
};

export const resetClient = () => {
  return async (dispatch) => {
    dispatch({
      type: RESET_CLIENT,
      payload: null,
    });
  };
};
