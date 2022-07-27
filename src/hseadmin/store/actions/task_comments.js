import { fetchGET, fetchPOST, fetchPUT } from '../../utils/NetworkUtils';
import URLConstants from '../../constants/URLConstants';

export const GET_TASK_COMMENTS = 'GET_TASK_COMMENTS ';
export const GET_TASK_COMMENTS_PAGINATION = 'GET_TASK_COMMENTS_PAGINATION';
export const POST_TASK_COMMENTS = 'POST_TASK_COMMENTS ';
export const GET_TASK_COMMENT = 'GET_TASK_COMMENT';
export const UPDATE_TASK_COMMENT = 'UPDATE_TASK_COMMENT';

//
export const loadTaskComments = (page = 1, search = '', sort, direction) => {
  return async (dispatch) => {
    try {
      let url = `${URLConstants.TASK_COMMENTS_URL}?limit=10&page=${page}&sort=${sort}&direction=${direction}`;

      if (search !== undefined && search !== '') {
        url = `${url}&search=${search}`;
      }

      console.log('loadTaskComment url =', url);

      const resData = await fetchGET(url);

      console.log('loadTaskComment --->', resData);

      dispatch({
        type: GET_TASK_COMMENTS,
        payload: resData.data,
      });

      dispatch({
        type: GET_TASK_COMMENTS_PAGINATION,
        payload: resData.pagination,
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
};

export const addTaskComments = (taskComment) => {
  return async (dispatch) => {
    try {
      const url = URLConstants.TASK_CATEGORIES_URL;

      console.log('addTaskComment url =', url);

      const resData = await fetchPOST(url, taskComment);

      console.log('addTaskComment --->', resData);

      dispatch({
        type: POST_TASK_COMMENTS,
        payload: resData.data,
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
};

export const getTaskComments = (id) => {
  return async (dispatch) => {
    try {
      const url = `${URLConstants.GET_TASK_COMMENT_URL}/${id}.json`;

      console.log('getTaskComments url =', url);

      const resData = await fetchGET(url);

      console.log('getTaskComments --->', resData);

      dispatch({
        type: GET_TASK_COMMENT,
        payload: resData.data,
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
};

export const updateTaskComments = (taskComment) => {
  return async (dispatch) => {
    try {
      const url = `${URLConstants.GET_TASK_COMMENT_URL}/${taskComment.id}.json`;

      console.log('updateTaskComments url =', url);

      const resData = await fetchPUT(url, taskComment);

      console.log('updateTaskComment --->', resData);

      dispatch({
        type: UPDATE_TASK_COMMENT,
        payload: resData.data,
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
};
