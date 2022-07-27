import { fetchGET, fetchPOST, fetchPUT } from '../../utils/NetworkUtils';
import URLConstants from '../../constants/URLConstants';

export const GET_TASK_CATEGORIES = 'GET_TASK_CATEGORIES ';
export const GET_TASK_CATEGORIES_PAGINATION = 'GET_TASK_CATEGORIES_PAGINATION';
export const POST_TASK_CATEGORIES = 'POST_TASK_CATEGORIES ';
export const GET_TASK_CATEGORY = 'GET_TASK_CATEGORY';
export const UPDATE_TASK_CATEGORY = 'UPDATE_TASK_CATEGORY';

//
export const loadTaskCategories = (page = 1, search = '', sort, direction) => {
  return async (dispatch) => {
    try {
      let url = `${URLConstants.TASK_CATEGORIES_URL}?limit=10&page=${page}&sort=${sort}&direction=${direction}`;

      if (search !== undefined && search !== '') {
        url = `${url}&search=${search}`;
      }

      console.log('loadTaskCategories url =', url);

      const resData = await fetchGET(url);

      console.log('loadTaskCategories --->', resData);

      dispatch({
        type: GET_TASK_CATEGORIES,
        payload: resData.data,
      });

      dispatch({
        type: GET_TASK_CATEGORIES_PAGINATION,
        payload: resData.pagination,
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
};

export const addTaskCategories = (taskCategory) => {
  return async (dispatch) => {
    try {
      const url = URLConstants.TASK_CATEGORIES_URL;

      console.log('addTaskCategory url =', url);

      const resData = await fetchPOST(url, taskCategory);

      console.log('addTaskCategory --->', resData);

      dispatch({
        type: POST_TASK_CATEGORIES,
        payload: resData.data,
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
};

export const getTaskCategory = (id) => {
  return async (dispatch) => {
    try {
      const url = `${URLConstants.GET_TASK_CATEGORY_URL}/${id}.json`;

      console.log('getTaskCategory url =', url);

      const resData = await fetchGET(url);

      console.log('getTaskCategory --->', resData);

      dispatch({
        type: GET_TASK_CATEGORIES,
        payload: resData.data,
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
};

export const updateTaskCategory = (taskCategory) => {
  return async (dispatch) => {
    try {
      const url = `${URLConstants.GET_TASK_CATEGORY_URL}/${taskCategory.id}.json`;

      console.log('updateTaskCategory url =', url);

      const resData = await fetchPUT(url, taskCategory);

      console.log('updateTaskcategory --->', resData);

      dispatch({
        type: UPDATE_TASK_CATEGORY,
        payload: resData.data,
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
};
