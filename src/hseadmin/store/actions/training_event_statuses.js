import { fetchGET, fetchPOST, fetchPUT } from '../../utils/NetworkUtils';
import URLConstants from '../../constants/URLConstants';

export const GET_TRAINING_EVENT_STATUSES = 'GET_TRAINING_EVENT_STATUSES ';
export const GET_TRAINING_EVENT_STATUSES_PAGINATION =
  'GET_TRAINING_EVENT_STATUSES_PAGINATION';
export const POST_TRAINING_EVENT_STATUSES = 'POST_TRAINING_EVENT_STATUSES ';
export const GET_TRAINING_EVENT_STATUS = 'GET_TRAINING_EVENT_STATUS';
export const UPDATE_TRAINING_EVENT_STATUS = 'UPDATE_TRAINING_EVENT_STATUS';

//
export const loadTrainingEventStatus = (
  page = 1,
  search = '',
  sort,
  direction
) => {
  return async (dispatch) => {
    try {
      let url = `${URLConstants.TRAINING_EVENT_STATUSES_URL}?limit=10&page=${page}&sort=${sort}&direction=${direction}`;

      if (search !== undefined && search !== '') {
        url = `${url}&search=${search}`;
      }

      console.log('loadTrainingEventStatus url =', url);

      const resData = await fetchGET(url);

      console.log('loadTrainingEventStaus --->', resData);

      dispatch({
        type: GET_TRAINING_EVENT_STATUSES,
        payload: resData.data,
      });

      dispatch({
        type: GET_TRAINING_EVENT_STATUSES_PAGINATION,
        payload: resData.pagination,
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
};

export const addTrainingEventStatuses = (trainingEventStatus) => {
  return async (dispatch) => {
    try {
      const url = URLConstants.TRAINING_EVENT_STATUSES_URL;

      console.log('addTrainingEventStatus url =', url);

      const resData = await fetchPOST(url, trainingEventStatus);

      console.log('addTrainingEventStatus --->', resData);

      dispatch({
        type: POST_TRAINING_EVENT_STATUSES,
        payload: resData.data,
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
};

export const getTrainingEventStatus = (id) => {
  return async (dispatch) => {
    try {
      const url = `${URLConstants.GET_TRAINING_EVENT_STATUS_URL}/${id}.json`;

      console.log('getTrainingEventStatus url =', url);

      const resData = await fetchGET(url);

      console.log('getTrainingEventStatus --->', resData);

      dispatch({
        type: GET_TRAINING_EVENT_STATUS,
        payload: resData.data,
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
};

export const updateTrainingEventStatus = (trainingEventStatus) => {
  return async (dispatch) => {
    try {
      const url = `${URLConstants.GET_TRAINING_EVENT_STATUS_URL}/${trainingEventStatus.id}.json`;

      console.log('updateTrainingEventStatus url =', url);

      const resData = await fetchPUT(url, trainingEventStatus);

      console.log('updateTrainingEventStatus --->', resData);

      dispatch({
        type: UPDATE_TRAINING_EVENT_STATUS,
        payload: resData.data,
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
};
