import { fetchGET } from '../../utils/NetworkUtils';
import { KEY_TOKEN } from '../../constants/Constants';
import URLConstants from '../../constants/URLConstants';

export const THUMBNAILS_LIST = 'THUMBNAILS_LIST';
export const THUMBNAILS_LIST_PAGINATION = 'THUMBNAILS_LIST_PAGINATION';
export const ADD_THUMBNAIL = 'ADD_THUMBNAIL';
export const EDIT_THUMBNAIL = 'EDIT_THUMBNAIL';
export const DELETE_THUMBNAIL = 'DELETE_THUMBNAILS';

//
export const loadThumbnailList = (page = 1, search = '') => {
  return async (dispatch) => {
    try {
      let url = `${URLConstants.THUMBNAILS_URL}?limit=10&page=${page}`;

      if (search !== undefined && search !== '') {
        url = `${url}&search=${search}`;
      }

      console.log('loadThumbnailList url =', url);

      const resData = await fetchGET(url);

      console.log('loadThumbnailList --->', resData);

      dispatch({
        type: THUMBNAILS_LIST,
        payload: resData.data,
      });

      dispatch({
        type: THUMBNAILS_LIST_PAGINATION,
        payload: resData.pagination,
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
};

export const addThumbnail = (thumbnail) => {
  return async (dispatch) => {
    try {
      const url = `${URLConstants.THUMBNAILS_URL}/upload.json`;

      console.log('addThumbnail url =', url);

      const token = localStorage.getItem(KEY_TOKEN);

      // const body = JSON.stringify(photo);
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: thumbnail,
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

      console.log('addType --->', resData);

      dispatch({
        type: ADD_THUMBNAIL,
        payload: resData.data,
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
};
