/* eslint-disable default-param-last */
import { fetchGET, fetchPOST, fetchPUT } from '../../utils/NetworkUtils';
import URLConstants from '../../constants/URLConstants';

export const GET_ANSWERS = 'GET_CANSWERS';
export const GET_ANSWERS_PAGINATION = 'GET_ANSWERS_PAGINATION';
export const POST_ANSWERS = 'POST_ANSWERS';
export const GET_ANSWER = 'GET_ANSWER';
export const UPDATE_ANSWER = 'UPDATE_ANSWER';
// export const RESET_COMPANY = 'RESET_COMPANY';

//
export const loadAnswers = (
  page = 1,
  search = '',
  sort,
  direction,
  limit = 10
) => {
  return async (dispatch) => {
    try {
      let url = `${URLConstants.ANSWERS_URL}?limit=${limit}&page=${page}&sort=${sort}&direction=${direction}`;

      if (search !== undefined && search !== '') {
        url = `${url}&search=${search}`;
      }
      const resData = await fetchGET(url);

      // console.log('loadAnswers --->', resData);

      dispatch({
        type: GET_ANSWERS,
        payload: resData.data,
      });

      dispatch({
        type: GET_ANSWERS_PAGINATION,
        payload: resData.pagination,
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
};

export const addAnswers = (answer) => {
  return async (dispatch) => {
    try {
      const url = URLConstants.ANSWERS_URL;

      console.log('addDivisions url =', url);

      const resData = await fetchPOST(url, answer);

      console.log('addAnswers --->', resData);

      dispatch({
        type: POST_ANSWERS,
        payload: resData.data,
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
};

export const getAnswer = (id) => {
  return async (dispatch) => {
    try {
      const url = `${URLConstants.GET_ANSWER_URL}/${id}.json`;

      console.log('getAnswer url =', url);

      const resData = await fetchGET(url);

      console.log('getAnswer --->', resData);

      dispatch({
        type: GET_ANSWER,
        payload: resData.data,
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
};

export const updateAnswer = (answer) => {
  return async (dispatch) => {
    try {
      const url = `${URLConstants.GET_ANSWER_URL}/${answer.id}.json`;

      console.log('updateAnswer url =', url);

      const resData = await fetchPUT(url, answer);
      console.log('updateAnswer --->', resData);

      dispatch({
        type: UPDATE_ANSWER,
        payload: resData.data,
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
};
