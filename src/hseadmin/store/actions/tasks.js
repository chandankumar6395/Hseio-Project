import { fetchGET, fetchPOST, fetchPUT } from '../../utils/NetworkUtils';
import URLConstants from '../../constants/URLConstants';

export const GET_TASKS = 'GET_TASKS ';
export const GET_TASKS_PAGINATION = 'GET_TASKS_PAGINATION';
export const POST_TASKS = 'POST_TASKS ';
export const GET_TASK = 'GET_TASK';
export const UPDATE_TASK = 'UPDATE_TASK';

//
export const loadTasks = (page = 1, search = '', sort, direction) => {
  return async (dispatch) => {
    try {
      let url = `${URLConstants.TASKS_URL}?limit=10&page=${page}&sort=${sort}&direction=${direction}`;

      if (search !== undefined && search !== '') {
        url = `${url}&search=${search}`;
      }

      console.log('tasks url =', url);

      const resData = await fetchGET(url);

      console.log('tasks --->', resData);

      dispatch({
        type: GET_TASKS,
        payload: resData.data,
      });

      dispatch({
        type: GET_TASKS_PAGINATION,
        payload: resData.pagination,
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
};

export const addTasks = (task) => {
  return async (dispatch) => {
    try {
      const url = URLConstants.TASKS_URL;

      console.log('addTasks url =', url);

      const resData = await fetchPOST(url, task);

      console.log('addTasks --->', resData);

      dispatch({
        type: POST_TASKS,
        payload: resData.data,
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
};

export const getTask = (id) => {
  return async (dispatch) => {
    try {
      const url = `${URLConstants.GET_TASK_URL}/${id}.json`;

      console.log('getTask url =', url);

      const resData = await fetchGET(url);

      console.log('GetTask --->', resData);

      dispatch({
        type: GET_TASK,
        payload: resData.data,
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
};

export const updateTask = (task) => {
  return async (dispatch) => {
    try {
      const url = `${URLConstants.GET_TASK_URL}/${task.id}.json`;

      console.log('updateTask url =', url);

      const resData = await fetchPUT(url, task);

      console.log('updateTask --->', resData);

      dispatch({
        type: UPDATE_TASK,
        payload: resData.data,
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
};
