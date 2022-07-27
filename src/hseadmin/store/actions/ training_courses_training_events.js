/* eslint-disable default-param-last */
import { fetchGET, fetchPOST, fetchPUT } from '../../utils/NetworkUtils';
import URLConstants from '../../constants/URLConstants';

export const GET_TRAINING_COURSES_TRAINING_EVENTS =
  'GET_TRAINING_COURSES_TRAINING_EVENTS ';
export const GET_TRAINING_COURSES_TRAINING_EVENTS_PAGINATION =
  'GET_TRAINING_COURSES_TRAINING_EVENTS_PAGINATION';
export const POST_TRAINING_COURSES_TRAINING_EVENTS =
  'POST_TRAINING_COURSES_TRAINING_EVENTS';
export const GET_TRAINING_COURSES_TRAINING_EVENT =
  'GET_TRAINING_COURSES_TRAINING_EVENT';
export const UPDATE_TRAINING_COURSES_TRAINING_EVENT =
  'UPDATE_TRAINING_COURSES_TRAINING_EVENT';

export const loadTrainingCoursesTrainingEvent = (
  page = 1,
  search = '',
  sort,
  direction
) => {
  return async (dispatch) => {
    try {
      let url = `${URLConstants.TRAINING_COURSES_TRAINING_EVENTS_URL}?limit=10&page=${page}&sort=${sort}&direction=${direction}`;

      if (search !== undefined && search !== '') {
        url = `${url}&search=${search}`;
      }

      url = `${URLConstants.TRAINING_COURSES_TRAINING_EVENTS_URL}`;

      console.log('loadTrainingCoursesTrainingEvents url =', url);

      const resData = await fetchGET(url);

      console.log('loadTrainingCoursesTrainingEventsUrl --->', resData);

      dispatch({
        type: GET_TRAINING_COURSES_TRAINING_EVENTS,
        payload: resData.data,
      });

      dispatch({
        type: GET_TRAINING_COURSES_TRAINING_EVENTS_PAGINATION,
        payload: resData.pagination,
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
};

export const addTrainingCoursesTrainingEvents = (
  trainingCoursesTrainingEvent
) => {
  return async (dispatch) => {
    try {
      const url = URLConstants.TRAINING_COURSES_TRAINING_EVENTS_URL;

      console.log('addTrainingCoursesTrainingEvents url =', url);

      const resData = await fetchPOST(url, trainingCoursesTrainingEvent);

      console.log('addTrainingCoursesTrainingEvents --->', resData);

      dispatch({
        type: POST_TRAINING_COURSES_TRAINING_EVENTS,
        payload: resData.data,
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
};

export const getTrainingCoursesTrainingEvents = (id) => {
  return async (dispatch) => {
    try {
      const url = `${URLConstants.GET_TRAINING_COURSES_TRAINING_EVENTS_URL}/${id}.json`;

      console.log('getTrainingCoursesTrainingEvent url =', url);

      const resData = await fetchGET(url);

      console.log('getTrainingCoursesTrainingEvent --->', resData);

      dispatch({
        type: GET_TRAINING_COURSES_TRAINING_EVENT,
        payload: resData.data,
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
};

export const updateTrainingCoursesTrainingEvent = (
  trainingCoursesTrainingEvent
) => {
  return async (dispatch) => {
    try {
      const url = `${URLConstants.GET_TRAINING_COURSES_TRAINING_EVENT_URL}/${trainingCoursesTrainingEvent.id}.json`;

      console.log('updateTrainingCoursesTrainingEvent url =', url);

      const resData = await fetchPUT(url, trainingCoursesTrainingEvent);

      console.log('updateTrainingCoursesTrainingEvent--->', resData);

      dispatch({
        type: UPDATE_TRAINING_COURSES_TRAINING_EVENT,
        payload: resData.data,
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
};
