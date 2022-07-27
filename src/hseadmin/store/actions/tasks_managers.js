/* eslint-disable default-param-last */
import { fetchGET, fetchPOST, fetchPUT } from '../../utils/NetworkUtils';
import URLConstants from '../../constants/URLConstants';

export const GET_TASKS_MANAGERS = 'GET_TASK_MANAGERS ';
export const GET_TASKS_MANAGERS_PAGINATION = 'GET_TASK_MANAGERS_PAGINATION';
export const POST_TASKS_MANAGERS = 'POST_TASK_MANAGERS ';
export const GET_TASKS_MANAGER = 'GET_TASK_MANAGER';
export const UPDATE_TASKS_MANAGER = 'UPDATE_TASK_MANAGER';

//
export const loadTasksManagers = (page = 1, search = '', sort, direction) => {
  return async (dispatch) => {
    try {
      let url = `${URLConstants.TASKS_MANAGERS_URL}?limit=10&page=${page}&sort=${sort}&direction=${direction}`;

      if (search !== undefined && search !== '') {
        url = `${url}&search=${search}`;
      }

      console.log('tasksManagers url =', url);

      const resData = await fetchGET(url);

      console.log('tasksManagers --->', resData);

      dispatch({
        type: GET_TASKS_MANAGERS,
        payload: resData.data,
      });

      dispatch({
        type: GET_TASKS_MANAGERS_PAGINATION,
        payload: resData.pagination,
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
};

export const addTasksManagers = (question) => {
  return async (dispatch) => {
    try {
      const url = URLConstants.TASKS_MANAGERS_URL;

      console.log('addTasksManagers url =', url);

      const resData = await fetchPOST(url, question);

      console.log('addTasksManagers --->', resData);

      dispatch({
        type: POST_TASKS_MANAGERS,
        payload: resData.data,
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
};

export const getTasksManager = (id) => {
  return async (dispatch) => {
    try {
      const url = `${URLConstants.GET_TASKS_MANAGER_URL}/${id}.json`;

      console.log('getTasksManager url =', url);

      const resData = await fetchGET(url);

      console.log('getTasksManager --->', resData);

      dispatch({
        type: GET_TASKS_MANAGER,
        payload: resData.data,
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
};

export const updateTasksManager = (question) => {
  return async (dispatch) => {
    try {
      const url = `${URLConstants.GET_TASKS_MANAGER_URL}/${question.id}.json`;

      console.log('updateTasksManager url =', url);

      const resData = await fetchPUT(url, question);

      console.log('updateTasksManager --->', resData);

      dispatch({
        type: UPDATE_TASKS_MANAGER,
        payload: resData.data,
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
};
