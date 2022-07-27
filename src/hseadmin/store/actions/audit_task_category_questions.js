/* eslint-disable default-param-last */
import { fetchGET, fetchPOST, fetchPUT } from '../../utils/NetworkUtils';
import URLConstants from '../../constants/URLConstants';

export const GET_AUDIT_TASK_CATEGORY_QUESTIONS =
  'GET_AUDIT_TASK_CATEGORY_QUESTIONS ';
export const GET_AUDIT_TASK_CATEGORY_QUESTIONS_PAGINATION =
  'GET_AUDIT_TASK_CATEGORY_QUESTIONS_PAGINATION';
export const POST_AUDIT_TASK_CATEGORY_QUESTIONS =
  'POST_AUDIT_TASK_CATEGORY_QUESTIONS';
export const GET_AUDIT_TASK_CATEGORY_QUESTION =
  'GET_AUDIT_TASK_CATEGORY_QUESTION';
export const UPDATE_AUDIT_TASK_CATEGORY_QUESTION =
  'UPDATE_AUDIT_TASK_CATEGORY_QUESTION';

//
export const loadAuditTaskCategoryQuestions = (
  page = 1,
  search = '',
  sort,
  direction
) => {
  return async (dispatch) => {
    try {
      let url = `${URLConstants.AUDIT_TASK_CATEGORY_QUESTIONS_URL}?limit=10&page=${page}&sort=${sort}&direction=${direction}`;

      if (search !== undefined && search !== '') {
        url = `${url}&search=${search}`;
      }

      url = `${URLConstants.AUDIT_TASK_CATEGORY_QUESTIONS_URL}`;

      console.log('loadAuditTaskCategoryQuestions url =', url);

      const resData = await fetchGET(url);

      console.log('loadAuditTaskCategoryQuestionsUrl --->', resData);

      dispatch({
        type: GET_AUDIT_TASK_CATEGORY_QUESTIONS,
        payload: resData.data,
      });

      dispatch({
        type: GET_AUDIT_TASK_CATEGORY_QUESTIONS_PAGINATION,
        payload: resData.pagination,
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
};

export const addAuditTaskCategoryQuestions = (auditTaskCategoryQuestion) => {
  return async (dispatch) => {
    try {
      const url = URLConstants.AUDIT_TASK_CATEGORY_QUESTIONS_URL;

      console.log('addauditTakCategoryQuestion url =', url);

      const resData = await fetchPOST(url, auditTaskCategoryQuestion);

      console.log('addauditTakCategoryQuestion --->', resData);

      dispatch({
        type: POST_AUDIT_TASK_CATEGORY_QUESTIONS,
        payload: resData.data,
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
};

export const getAuditTaskCategoryQuestions = (id) => {
  return async (dispatch) => {
    try {
      const url = `${URLConstants.GET_AUDIT_TASK_CATEGORY_QUESTION_URL}/${id}.json`;

      console.log('getauditTakCategoryQuestion url =', url);

      const resData = await fetchGET(url);

      console.log('getauditTakCategoryQuestion --->', resData);

      dispatch({
        type: GET_AUDIT_TASK_CATEGORY_QUESTION,
        payload: resData.data,
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
};

export const updateAuditTaskCategoryQuestions = (auditTaskCategoryQuestion) => {
  return async (dispatch) => {
    try {
      const url = `${URLConstants.GET_AUDIT_TASK_CATEGORY_QUESTION_URL}/${auditTaskCategoryQuestion.id}.json`;

      console.log('updateauditTakCategoryQuestion url =', url);

      const resData = await fetchPUT(url, auditTaskCategoryQuestion);

      console.log('updateAuditTaskCategoryQuestion --->', resData);

      dispatch({
        type: UPDATE_AUDIT_TASK_CATEGORY_QUESTION,
        payload: resData.data,
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
};
