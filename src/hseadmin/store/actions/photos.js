import { fetchGET } from '../../utils/NetworkUtils';
import { KEY_TOKEN } from '../../constants/Constants';
import URLConstants from '../../constants/URLConstants';

export const PHOTO_LIST = 'PHOTO_LIST';
export const PHOTO_LIST_PAGINATION = 'PHOTO_LIST_PAGINATION';
export const ADD_PHOTO = 'ADD_PHOTO';
export const EDIT_PHOTO = 'EDIT_PHOTO';
export const DELETE_PHOTO = 'DELETE_PHOTO';

//
export const loadPhotoList = (page = 1, search = '') => {
  return async (dispatch) => {
    try {
      let url = `${URLConstants.PHOTOS_URL}?limit=10&page=${page}`;

      if (search !== undefined && search !== '') {
        url = `${url}&search=${search}`;
      }

      console.log('loadPhotoList url =', url);

      const resData = await fetchGET(url);

      console.log('loadPhotoList --->', resData);

      dispatch({
        type: PHOTO_LIST,
        payload: resData.data,
      });

      dispatch({
        type: PHOTO_LIST_PAGINATION,
        payload: resData.pagination,
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
};

export const addPhoto = (photo) => {
  return async (dispatch) => {
    try {
      const url = `${URLConstants.PHOTOS_URL}/upload.json`;

      console.log('addPhoto url =', url);

      const token = localStorage.getItem(KEY_TOKEN);

      // const body = JSON.stringify(photo);
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: photo,
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
        type: ADD_PHOTO,
        payload: resData.data,
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
};
