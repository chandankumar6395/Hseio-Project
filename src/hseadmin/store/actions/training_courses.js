import { fetchGET, fetchPOST, fetchPUT } from '../../utils/NetworkUtils';
import URLConstants from '../../constants/URLConstants';

export const TRAINING_COURSE_LIST = 'TRAINING_COURSE_LIST';
export const TRAINING_COURSE_LIST_PAGINATION =
  'TRAINING_COURSE_LIST_PAGINATION';
export const ADD_TRAINING_COURSE = 'ADD_TRAINING_COURSE';
export const EDIT_TRAINING_COURSE = 'EDIT_TRAINING_COURSE';
export const DELETE_TRAINING_COURSE = 'DELETE_TRAINING_COURSE';
export const GET_TRAINING_COURSE = 'GET_TRAINING_COURSE';
export const UPDATE_TRAINING_COURSE = 'UPDATE_TRAINING_COURSE';

//
export const loadTrainingCourseList = (
  page = 1,
  search = '',
  sort,
  direction,
  limit = 10
) => {
  return async (dispatch) => {
    try {
      let url = `${URLConstants.TRAINING_COURSES_URL}?limit=${limit}&page=${page}&sort=${sort}&direction=${direction}`;

      if (search !== undefined && search !== '') {
        url = `${url}&search=${search}`;
      }

      console.log('loadTrainingCourseList url =', url);

      const resData = await fetchGET(url);

      console.log('loadTypes --->', resData);

      dispatch({
        type: TRAINING_COURSE_LIST,
        payload: resData.data,
      });

      dispatch({
        type: TRAINING_COURSE_LIST_PAGINATION,
        payload: resData.pagination,
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
};

export const addTrainingCourse = (trainingCourse) => {
  return async (dispatch) => {
    try {
      const url = `${URLConstants.TRAINING_COURSES_URL}.json`;

      console.log('addTraining url =', url);

      const resData = await fetchPOST(url, trainingCourse);
      console.log('addTrainingCourse --->', resData);

      dispatch({
        type: ADD_TRAINING_COURSE,
        payload: resData.data,
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
};

export const getTrainingCourse = (id) => {
  return async (dispatch) => {
    try {
      const url = `${URLConstants.GET_TRAINING_COURSE_URL}/${id}.json`;

      console.log('getTrainingCourse url =', url);

      const resData = await fetchGET(url);

      console.log('getTrainingCourse --->', resData);

      dispatch({
        type: GET_TRAINING_COURSE,
        payload: resData.data,
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
};

export const updateTrainingCourse = (trainingCourse) => {
  return async (dispatch) => {
    try {
      const url = `${URLConstants.GET_TRAINING_COURSE_URL}/${trainingCourse.id}.json`;

      console.log('updateTrainingCourse url =', url);

      const resData = await fetchPUT(url, trainingCourse);

      console.log('updateTrainingCourse --->', resData);

      dispatch({
        type: GET_TRAINING_COURSE,
        payload: resData.data,
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
};
