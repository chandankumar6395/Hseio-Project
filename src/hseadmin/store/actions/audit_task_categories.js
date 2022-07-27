/* eslint-disable default-param-last */
import { fetchGET, fetchPOST, fetchPUT } from '../../utils/NetworkUtils';
import URLConstants from '../../constants/URLConstants';

export const GET_AUDIT_TASK_CATEGORIES = 'GET_AUDIT_TASK_CATEGORIES ';
export const GET_AUDIT_TASK_CATEGORIES_PAGINATION =
  'GET_AUDIT_TASK_CATEGORIES_PAGINATION';
export const POST_AUDIT_TASK_CATEGORIES = 'POST_AUDIT_TASK_CATEGORIES';
export const GET_AUDIT_TASK_CATEGORY = 'GET_AUDIT_TASK_CATEGORY';
export const UPDATE_AUDIT_TASK_CATEGORY = 'UPDATE_AUDIT_TASK_CATEGORY';

//
export const loadAuditTaskCategory = (
  page = 1,
  search = '',
  sort,
  direction
) => {
  return async (dispatch) => {
    try {
      let url = `${URLConstants.AUDIT_TASK_CATEGORIES_URL}?limit=10&page=${page}&sort=${sort}&direction=${direction}`;

      if (search !== undefined && search !== '') {
        url = `${url}&search=${search}`;
      }

      url = `${URLConstants.AUDIT_TASK_CATEGORIES_URL}`;

      console.log('loadAuditTaskCategories url =', url);

      const resData = await fetchGET(url);

      console.log('loadAuditTaskCategoriesUrl --->', resData);

      dispatch({
        type: GET_AUDIT_TASK_CATEGORIES,
        payload: resData.data,
      });

      dispatch({
        type: GET_AUDIT_TASK_CATEGORIES_PAGINATION,
        payload: resData.pagination,
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
};

export const addAuditTaskCategories = (auditTaskCategory) => {
  return async (dispatch) => {
    try {
      const url = URLConstants.AUDIT_TASK_CATEGORIES_URL;

      console.log('addAuditTaskCategories url =', url);

      const resData = await fetchPOST(url, auditTaskCategory);

      console.log('addAuditTakCategories --->', resData);

      dispatch({
        type: POST_AUDIT_TASK_CATEGORIES,
        payload: resData.data,
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
};

export const getAuditTaskCategories = (id) => {
  return async (dispatch) => {
    try {
      const url = `${URLConstants.GET_AUDIT_TASK_CATEGORY_URL}/${id}.json`;

      console.log('getAuditTaskCategory url =', url);

      const resData = await fetchGET(url);

      console.log('getAuditTaskCategory --->', resData);

      dispatch({
        type: GET_AUDIT_TASK_CATEGORY,
        payload: resData.data,
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
};

export const updateAuditTaskCategories = (auditTaskCategory) => {
  return async (dispatch) => {
    try {
      const url = `${URLConstants.GET_AUDIT_TASK_CATEGORY_URL}/${auditTaskCategory.id}.json`;

      console.log('updateauditTakCategory url =', url);

      const resData = await fetchPUT(url, auditTaskCategory);

      console.log('updateAuditTaskCategory--->', resData);

      dispatch({
        type: UPDATE_AUDIT_TASK_CATEGORY,
        payload: resData.data,
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
};
