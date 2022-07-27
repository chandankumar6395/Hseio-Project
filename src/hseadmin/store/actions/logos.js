import { fetchGET } from '../../utils/NetworkUtils';
import { KEY_TOKEN } from '../../constants/Constants';
import URLConstants from '../../constants/URLConstants';

export const LOGO_LIST = 'LOGO_LIST';
export const LOGO_LIST_PAGINATION = 'LOGO_LIST_PAGINATION';
export const ADD_LOGO = 'ADD_LOGO';
export const EDIT_LOGO = 'EDIT_LOGO';
export const DELETE_LOGO = 'DELETE_LOGO';
export const RESET_LOGO = 'RESET_LOGO';

//
export const loadLogoList = (page = 1, search = '') => {
  return async (dispatch) => {
    try {
      let url = `${URLConstants.LOGOS_URL}?limit=10&page=${page}`;

      if (search !== undefined && search !== '') {
        url = `${url}&search=${search}`;
      }

      console.log('loadLogoList url =', url);

      const resData = await fetchGET(url);

      console.log('loadTypes --->', resData);

      dispatch({
        type: LOGO_LIST,
        payload: resData.data,
      });

      dispatch({
        type: LOGO_LIST_PAGINATION,
        payload: resData.pagination,
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
};

export const addLogo = (logo) => {
  return async (dispatch) => {
    try {
      const url = `${URLConstants.LOGOS_URL}/upload.json`;

      console.log('addLogo url =', url);

      const token = localStorage.getItem(KEY_TOKEN);

      // const body = JSON.stringify(logo);
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: logo,
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
        type: ADD_LOGO,
        payload: resData.data,
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
};

export const resetLogo = () => {
  return async (dispatch) => {
    dispatch({
      type: RESET_LOGO,
      payload: null,
    });
  };
};
