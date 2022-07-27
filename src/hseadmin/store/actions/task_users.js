import { fetchGET, fetchPOST, fetchPUT } from '../../utils/NetworkUtils';
import URLConstants from '../../constants/URLConstants';

export const GET_TASK_USERS = 'GET_TASK_USERS';
export const GET_TASK_USERS_PAGINATION = 'GET_TASK_USERS_PAGINATION';
export const POST_TASK_USERS = 'POST_TASK_USERS';
export const GET_TASK_USER = 'GET_TASK_USER';
export const UPDATE_TASK_USER = 'UPDATE_TASK_USER';

export const loadTaskUsers = (page = 1, search = '', sort, direction) => {
  return async (dispatch) => {
    try {
      let url = `${URLConstants.TASK_USERS_URL}?limit=10&page=${page}&sort=${sort}&direction=${direction}`;

      if (search !== undefined && search !== '') {
        url = `${url}&search=${search}`;
      }

      console.log('loadTaskUsers url =', url);

      const resData = await fetchGET(url);

      console.log('loadTaskUsers --->', resData);

      dispatch({
        type: GET_TASK_USERS,
        payload: resData.data,
      });

      dispatch({
        type: GET_TASK_USERS_PAGINATION,
        payload: resData.pagination,
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
};

export const addTaskUsers = (taskUser) => {
  return async (dispatch) => {
    try {
      const url = URLConstants.TASK_USERS_URL;

      console.log('addTaskUsers url =', url);

      const resData = await fetchPOST(url, taskUser);

      console.log('addTaskUsers --->', resData);

      dispatch({
        type: POST_TASK_USERS,
        payload: resData.data,
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
};

export const getTaskUser = (id) => {
  return async (dispatch) => {
    try {
      const url = `${URLConstants.GET_TASK_USER_URL}/${id}.json`;

      console.log('getTaskUser url =', url);

      const resData = await fetchGET(url);

      console.log('getTaskUser --->', resData);

      dispatch({
        type: GET_TASK_USER,
        payload: resData.data,
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
};

export const updateTaskUser = (taskUser) => {
  return async (dispatch) => {
    try {
      const url = `${URLConstants.GET_TASK_USER_URL}/${taskUser.id}.json`;

      console.log('updateTaskUser url =', url);

      const resData = await fetchPUT(url, taskUser);

      console.log('updateTaskUser --->', resData);

      dispatch({
        type: UPDATE_TASK_USER,
        payload: resData.data,
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
};
