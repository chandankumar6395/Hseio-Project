import { fetchGET, fetchPOST, fetchPUT } from '../../utils/NetworkUtils';
import URLConstants from '../../constants/URLConstants';

export const GET_INJURY_CLASSES = 'GET_INJURY_CLASSES';
export const GET_INJURY_CLASSES_PAGINATION = 'GET_INJURY_CLASSES_PAGINATION';
export const POST_INJURY_CLASSES = 'POST_INJURY_CLASSES';
export const GET_INJURY_CLASS = 'GET_INJURY_CLASS';
export const UPDATE_INJURY_CLASS = 'UPDATE_INJURY_CLASS';
// export const RESET_COMPANY = 'RESET_COMPANY';

export const loadInjuryClass = (
  page = 1,
  search = '',
  sort,
  direction,
  limit = 10
) => {
  return async (dispatch) => {
    try {
      let url = `${URLConstants.INJURY_CLASSES_URL}?limit=${limit}&page=${page}&sort=${sort}&direction=${direction}`;

      if (search !== undefined && search !== '') {
        url = `${url}&search=${search}`;
      }
      const resData = await fetchGET(url);

      // console.log('loadAnswers --->', resData);

      dispatch({
        type: GET_INJURY_CLASSES,
        payload: resData.data,
      });

      dispatch({
        type: GET_INJURY_CLASSES_PAGINATION,
        payload: resData.pagination,
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
};

export const addInjuryClasses = (injuryClass) => {
  return async (dispatch) => {
    try {
      const url = URLConstants.INJURY_CLASSES_URL;

      console.log('addInjuryClasses url =', url);

      const resData = await fetchPOST(url, injuryClass);

      console.log('addInjuryClasses --->', resData);

      dispatch({
        type: POST_INJURY_CLASSES,
        payload: resData.data,
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
};

export const getInjuryClass = (id) => {
  return async (dispatch) => {
    try {
      const url = `${URLConstants.GET_INJURY_CLASS_URL}/${id}.json`;

      console.log('getInjuryClass url =', url);

      const resData = await fetchGET(url);

      console.log('getInjuryClass --->', resData);

      dispatch({
        type: GET_INJURY_CLASS,
        payload: resData.data,
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
};

export const updateInjuryClass = (injuryClass) => {
  return async (dispatch) => {
    try {
      const url = `${URLConstants.GET_INJURY_CLASS_URL}/${injuryClass.id}.json`;

      console.log('updateInjuryClass url =', url);

      const resData = await fetchPUT(url, injuryClass);
      console.log('updateInjuryClass --->', resData);

      dispatch({
        type: UPDATE_INJURY_CLASS,
        payload: resData.data,
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
};
