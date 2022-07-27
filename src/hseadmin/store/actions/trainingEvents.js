/* eslint-disable default-param-last */
import { fetchGET, fetchPOST, fetchPUT } from '../../utils/NetworkUtils';
import URLConstants from '../../constants/URLConstants';

export const GET_TRAINING_EVENTS = 'GET_TRAINING_EVENTS ';
export const GET_TRAINING_EVENTS_PAGINATION = 'GET_TRAINING_EVENTS_PAGINATION';
export const POST_TRAINING_EVENTS = 'POST_TRAINING_EVENTS ';
export const GET_TRAINING_EVENT = 'GET_TRAINING_EVENT';
export const UPDATE_TRAINING_EVENT = 'UPDATE_TRAINING_EVENT';

//
export const loadTrainingEvent = (
  page = 1,
  search = '',
  sort,
  direction
  // companyId = -1
) => {
  return async (dispatch) => {
    try {
      let url = `${URLConstants.TRAINING_EVENTS_URL}?limit=10&page=${page}&sort=${sort}&direction=${direction}`;

      if (search !== undefined && search !== '') {
        url = `${url}&search=${search}`;
      }

      // if (companyId !== -1) {
      //   url = `${url}&company_id=${companyId}`;
      // }

      console.log('loadTrainingEvents url =', url);

      const resData = await fetchGET(url);

      console.log('loadTrainingEvents --->', resData);

      dispatch({
        type: GET_TRAINING_EVENTS,
        payload: resData.data,
      });

      dispatch({
        type: GET_TRAINING_EVENTS_PAGINATION,
        payload: resData.pagination,
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
};

export const addTrainingEvents = (trainingEvent) => {
  return async (dispatch) => {
    try {
      const url = URLConstants.TRAINING_EVENTS_URL;

      console.log('addTrainingEvents url =', url);

      const resData = await fetchPOST(url, trainingEvent);

      console.log('addTrainingEvents --->', resData);

      dispatch({
        type: POST_TRAINING_EVENTS,
        payload: resData.data,
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
};

export const getTrainingEvent = (id) => {
  return async (dispatch) => {
    try {
      const url = `${URLConstants.GET_TRAINING_EVENT_URL}/${id}.json`;

      console.log('getTrainingEvent url =', url);

      const resData = await fetchGET(url);

      console.log('getTrainingEvent --->', resData);

      dispatch({
        type: GET_TRAINING_EVENT,
        payload: resData.data,
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
};

export const updateTrainingEvent = (trainingEvent) => {
  return async (dispatch) => {
    try {
      const url = `${URLConstants.GET_TRAINING_EVENT_URL}/${trainingEvent.id}.json`;

      console.log('updateTrainingEvent url =', url);

      const resData = await fetchPUT(url, trainingEvent);

      console.log('updateTrainingEvent --->', resData);

      dispatch({
        type: UPDATE_TRAINING_EVENT,
        payload: resData.data,
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
};
