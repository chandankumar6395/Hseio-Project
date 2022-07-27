import { fetchGET, fetchPOST, fetchPUT } from '../../utils/NetworkUtils';
import URLConstants from '../../constants/URLConstants';

export const TRAINING_COURSE_TYPE_LIST = 'TRAINING_COURSE_TYPE_LIST';
export const TRAINING_COURSE_TYPE_LIST_PAGINATION =
  'TRAINING_COURSE_TYPE_LIST_PAGINATION';
export const ADD_TRAINING_COURSE_TYPE = 'ADD_TRAINING_COURSE_TYPE';
export const GET_TRAINING_COURSE_TYPE = 'GET_TRAINING_COURSE_TYPE';
export const UPDATE_TRAINING_COURSE_TYPE = 'UPDATE_TRAINING_COURSE_TYPE';
export const DELETE_TRAINING_COURSE_TYPE = 'DELETE_TRAINING_COURSE_TYPE';
export const EDIT_TRAINING_COURSE_TYPE = 'EDIT_TRAINING_COURSE_TYPE';
//
export const loadTrainingCourseTypeList = (
  page = 1,
  search = '',
  sort,
  direction
) => {
  return async (dispatch) => {
    try {
      let url = `${URLConstants.TRAINING_COURSE_TYPES_URL}?limit=10&page=${page}&sort=${sort}&direction=${direction}`;

      if (search !== undefined && search !== '') {
        url = `${url}&search=${search}`;
      }

      console.log('loadTrainingCourseTypeList url =', url);

      const resData = await fetchGET(url);

      console.log('loadTrainingCourseType --->', resData);

      dispatch({
        type: TRAINING_COURSE_TYPE_LIST,
        payload: resData.data,
      });

      dispatch({
        type: TRAINING_COURSE_TYPE_LIST_PAGINATION,
        payload: resData.pagination,
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
};

export const addTrainingCourseType = (trainingCourseType) => {
  return async (dispatch) => {
    try {
      const url = `${URLConstants.TRAINING_COURSE_TYPES_URL}.json`;

      // console.log('addTrainingCourseTypes url =', url);

      const resData = await fetchPOST(url, trainingCourseType);

      console.log('addTrainingCourseType --->', resData);

      dispatch({
        type: ADD_TRAINING_COURSE_TYPE,
        payload: resData.data,
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
};

export const getTrainingCourseType = (id) => {
  return async (dispatch) => {
    try {
      const url = `${URLConstants.GET_TRAINING_COURSE_TYPE_URL}/${id}.json`;

      console.log('getTrainingCourseType url =', url);

      const resData = await fetchGET(url);

      console.log('getTrainingCourseType--->', resData);

      dispatch({
        type: GET_TRAINING_COURSE_TYPE,
        payload: resData.data,
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
};

export const updateTrainingCourseType = (trainingCourseType) => {
  return async (dispatch) => {
    try {
      const url = `${URLConstants.GET_TRAINING_COURSE_TYPE_URL}/${trainingCourseType.id}.json`;

      console.log('updateTrainingCourseType url =', url);

      const resData = await fetchPUT(url, trainingCourseType);

      console.log('updateTrainingCourseType --->', resData);

      dispatch({
        type: UPDATE_TRAINING_COURSE_TYPE,
        payload: resData.data,
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
};
