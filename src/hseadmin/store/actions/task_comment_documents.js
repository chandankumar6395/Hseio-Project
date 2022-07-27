import { fetchGET, fetchPOST, fetchPUT } from '../../utils/NetworkUtils';
import URLConstants from '../../constants/URLConstants';

export const GET_TASK_COMMENT_DOCUMENTS = 'GET_TASK_COMMENT_DOCUMENTS';
export const GET_TASK_COMMENT_DOCUMENTS_PAGINATION =
  'GET_TASK_COMMENT_DOCUMENTS_PAGINATION';
export const POST_TASK_COMMENT_DOCUMENTS = 'POST_TASK_COMMENT_DOCUMENTS';
export const GET_TASK_COMMENT_DOCUMENT = 'GET_TASK_COMMENT_DOCUMENT';
export const UPDATE_TASK_COMMENT_DOCUMENT = 'UPDATE_TASK_COMMENT_DOCUMENT';

//
export const loadTaskCommentDocuments = (
  page = 1,
  search = '',
  sort,
  direction
) => {
  return async (dispatch) => {
    try {
      let url = `${URLConstants.TASK_COMMENT_DOCUMENTS_URL}?limit=10&page=${page}&sort=${sort}&direction=${direction}`;

      if (search !== undefined && search !== '') {
        url = `${url}&search=${search}`;
      }

      console.log('loadTaskCommentDocuments url =', url);

      const resData = await fetchGET(url);

      console.log('loadTaskCommentDocuments --->', resData);

      dispatch({
        type: GET_TASK_COMMENT_DOCUMENTS,
        payload: resData.data,
      });

      dispatch({
        type: GET_TASK_COMMENT_DOCUMENTS_PAGINATION,
        payload: resData.pagination,
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
};

export const addTaskCommentDocuments = (taskCommentDocument) => {
  return async (dispatch) => {
    try {
      const url = URLConstants.TASK_COMMENT_DOCUMENTS_URL;

      console.log('addTaskCommentDocuments url =', url);

      const resData = await fetchPOST(url, taskCommentDocument);

      console.log('addTaskCommentDocuments --->', resData);

      dispatch({
        type: POST_TASK_COMMENT_DOCUMENTS,
        payload: resData.data,
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
};

export const getTaskCommentDocument = (id) => {
  return async (dispatch) => {
    try {
      const url = `${URLConstants.GET_TASK_COMMENT_DOCUMENT_URL}/${id}.json`;

      console.log('getTaskCommentDocument url =', url);

      const resData = await fetchGET(url);

      console.log('getTaskCommentDocument --->', resData);

      dispatch({
        type: GET_TASK_COMMENT_DOCUMENT,
        payload: resData.data,
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
};

export const updateTaskCommentDocument = (taskCommentDocument) => {
  return async (dispatch) => {
    try {
      const url = `${URLConstants.GET_TASK_COMMENT_DOCUMENT_URL}/${taskCommentDocument.id}.json`;

      console.log('updateTaskCommentDocument url =', url);

      const resData = await fetchPUT(url, taskCommentDocument);

      console.log('updateTaskCommentDocument --->', resData);

      dispatch({
        type: UPDATE_TASK_COMMENT_DOCUMENT,
        payload: resData.data,
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
};
