import { fetchGET, fetchPOST, fetchPUT } from '../../utils/NetworkUtils';
import URLConstants from '../../constants/URLConstants';

export const GET_QUESTIONS = 'GET_QUESTIONS ';
export const GET_QUESTIONS_PAGINATION = 'GET_QUESTIONS_PAGINATION';
export const POST_QUESTIONS = 'POST_QUESTIONS ';
export const GET_QUESTION = 'GET_QUESTION';
export const UPDATE_QUESTION = 'UPDATE_QUESTION';

//
export const loadQuestions = (page = 1, search = '', sort, direction) => {
  return async (dispatch) => {
    try {
      let url = `${URLConstants.QUESTIONS_URL}?limit=10&page=${page}&sort=${sort}&direction=${direction}`;

      if (search !== undefined && search !== '') {
        url = `${url}&search=${search}`;
      }

      console.log('questions url =', url);

      const resData = await fetchGET(url);

      console.log('questions --->', resData);

      dispatch({
        type: GET_QUESTIONS,
        payload: resData.data,
      });

      dispatch({
        type: GET_QUESTIONS_PAGINATION,
        payload: resData.pagination,
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
};

export const addQuestions = (question) => {
  return async (dispatch) => {
    try {
      const url = URLConstants.QUESTIONS_URL;

      console.log('addQuestions url =', url);

      const resData = await fetchPOST(url, question);

      console.log('addQuestions --->', resData);

      dispatch({
        type: POST_QUESTIONS,
        payload: resData.data,
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
};

export const getQuestion = (id) => {
  return async (dispatch) => {
    try {
      const url = `${URLConstants.GET_QUESTION_URL}/${id}.json`;

      console.log('getQuestion url =', url);

      const resData = await fetchGET(url);

      console.log('getQuestion --->', resData);

      dispatch({
        type: GET_QUESTION,
        payload: resData.data,
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
};

export const updateQuestion = (question) => {
  return async (dispatch) => {
    try {
      const url = `${URLConstants.GET_QUESTION_URL}/${question.id}.json`;

      console.log('updateQuestion url =', url);

      const resData = await fetchPUT(url, question);

      console.log('updateJobSite --->', resData);

      dispatch({
        type: UPDATE_QUESTION,
        payload: resData.data,
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
};
