/* eslint-disable default-param-last */
import { fetchGET } from '../../utils/NetworkUtils';
import { KEY_TOKEN } from '../../constants/Constants';
import URLConstants from '../../constants/URLConstants';

export const DOCUMENT_LIST = 'DOCUMENT_LIST';
export const DOCUMENT_LIST_PAGINATION = 'DOCUMENT_LIST_PAGINATION';
export const ADD_DOCUMENT = 'ADD_DOCUMENT';
export const EDIT_DOCUMENT = 'EDIT_DOCUMENT';
export const DELETE_DOCUMENT = 'DELETE_DOCUMENT';

//
export const loadDocumentList = (
  page = 1,
  search = '',
  sort,
  direction,
  columnName,
  value
) => {
  return async (dispatch) => {
    try {
      let url = `${URLConstants.DOCUMENTS_URL}?limit=10&page=${page}&${columnName}=${value}`;

      if (search !== undefined && search !== '') {
        url = `${url}&search=${search}`;
      }

      console.log('loadDocumentList url =', url);

      const resData = await fetchGET(url);

      console.log('loadDocumentList --->', resData);

      dispatch({
        type: DOCUMENT_LIST,
        payload: resData.data,
      });

      dispatch({
        type: DOCUMENT_LIST_PAGINATION,
        payload: resData.pagination,
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
};

export const uploadDocumentFile = (document) => {
  return async (dispatch) => {
    try {
      const url = `${URLConstants.DOCUMENTS_URL}/upload.json`;

      console.log('addDocument url =', url);

      const token = localStorage.getItem(KEY_TOKEN);

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: document,
      });

      if (!response.ok) {
        if (response.status === 500) {
          throw new Error('Internal Server Error');
        }

        if (response.status === 401) {
          throw new Error('Unauthorized Access');
        }
      }

      const resData = await response.json();

      if (resData.data.error_code !== undefined) {
        throw new Error(resData.data.error_message);
      }

      console.log('addDocument --->', resData);

      dispatch({
        type: ADD_DOCUMENT,
        payload: resData.data,
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
};
