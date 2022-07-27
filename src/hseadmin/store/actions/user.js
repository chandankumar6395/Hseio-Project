import { fetchGET, fetchPOST, fetchPUT } from '../../utils/NetworkUtils';
import URLConstants from '../../constants/URLConstants';

export const GET_USERS = 'GET_USERS';
export const GET_USERS_PAGINATION = 'GET_USERS_PAGINATION';
export const POST_USERS = 'POST_USERS';
export const GET_USER = 'GET_USER';
export const UPDATE_USER = 'UPDATE_USER';

//
export const loadUsers = (page = 1, search = '', sort, direction) => {
  return async (dispatch) => {
    try {
      let url = `${URLConstants.USERS_URL}?limit=10&page=${page}&sort=${sort}&direction=${direction}`;

      if (search !== undefined && search !== '') {
        url = `${url}&search=${search}`;
      }

      console.log('loadUsers url =', url);

      const resData = await fetchGET(url);
      console.log('loadUsers --->', resData);

      dispatch({
        type: GET_USERS,
        payload: resData.data,
      });

      dispatch({
        type: GET_USERS_PAGINATION,
        payload: resData.pagination,
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
};

export const addUsers = (user) => {
  return async (dispatch) => {
    try {
      const url = URLConstants.USERS_URL;

      console.log('addUsers url =', url);

      const resData = await fetchPOST(url, user);

      console.log('addUsers --->', resData);

      dispatch({
        type: POST_USERS,
        payload: resData.data,
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
};

export const getUser = (id) => {
  return async (dispatch) => {
    try {
      const url = `${URLConstants.GET_USER_URL}/${id}.json`;

      console.log('getUser url =', url);

      const resData = await fetchGET(url);

      console.log('getUser --->', resData);

      dispatch({
        type: GET_USER,
        payload: resData.data,
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
};

export const updateUser = (user) => {
  return async (dispatch) => {
    try {
      const url = `${URLConstants.GET_USER_URL}/${user.id}.json`;

      console.log('updateUser url =', url);

      const resData = await fetchPUT(url, user);
      console.log('updateUser --->', resData);

      dispatch({
        type: UPDATE_USER,
        payload: resData.data,
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
};
