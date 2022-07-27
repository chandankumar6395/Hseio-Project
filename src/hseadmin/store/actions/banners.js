/* eslint-disable default-param-last */
import { fetchGET } from '../../utils/NetworkUtils';
import { KEY_TOKEN } from '../../constants/Constants';
import URLConstants from '../../constants/URLConstants';

export const BANNER_LIST = 'BANNER_LIST';
export const BANNER_LIST_PAGINATION = 'BANNER_LIST_PAGINATION';
export const ADD_BANNER = 'ADD_BANNER';
export const EDIT_BANNER = 'EDIT_BANNER';
export const DELETE_BANNER = 'DELETE_BANNER';
export const RESET_BANNER = 'RESET_BANNER';

//
export const loadBannerList = (page = 1, search = '') => {
  return async (dispatch) => {
    try {
      let url = `${URLConstants.BANNERS_URL}?limit=10&page=${page}`;

      if (search !== undefined && search !== '') {
        url = `${url}&search=${search}`;
      }
      const resData = await fetchGET(url);

      console.log('loadTypes --->', resData);

      dispatch({
        type: BANNER_LIST,
        payload: resData.data,
      });

      dispatch({
        type: BANNER_LIST_PAGINATION,
        payload: resData.pagination,
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
};

export const addBanner = (banner) => {
  return async (dispatch) => {
    try {
      const url = `${URLConstants.BANNERS_URL}/upload.json`;

      console.log('addBanner url =', url);

      const token = localStorage.getItem(KEY_TOKEN);

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: banner,
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

      console.log('addBanner --->', resData);

      dispatch({
        type: ADD_BANNER,
        payload: resData.data,
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
};

export const resetBanner = () => {
  return async (dispatch) => {
    dispatch({
      type: RESET_BANNER,
      payload: null,
    });
  };
};
