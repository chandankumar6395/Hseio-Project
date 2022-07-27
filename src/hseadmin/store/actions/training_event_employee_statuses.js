import { fetchGET, fetchPOST, fetchPUT } from '../../utils/NetworkUtils';
import URLConstants from '../../constants/URLConstants';

export const GET_TRAINING_EVENT_EMPLOYEE_STATUSES =
  'GET_TRAINING_EVENT_EMPLOYEE_STATUSES ';
export const GET_TRAINING_EVENT_EMPLOYEE_STATUSES_PAGINATION =
  'GET_TRAINING_EVENT_EMPLOYEE_STATUSES_PAGINATION';
export const POST_TRAINING_EVENT_EMPLOYEE_STATUSES =
  'POST_TRAINING_EVENT_EMPLOYEE_STATUSES ';
export const GET_TRAINING_EVENT_EMPLOYEE_STATUS =
  'GET_TRAINING_EVENT_EMPLOYEE_STATUS';
export const UPDATE_TRAINING_EVENT_EMPLOYEE_STATUS =
  'UPDATE_TRAINING_EVENT_EMPLOYEE_STATUS';

//
export const loadTrainingEventEmployeeStatuses = (
  page = 1,
  search = '',
  sort,
  direction
) => {
  return async (dispatch) => {
    try {
      let url = `${URLConstants.TRAINING_EVENT_EMPLOYEE_STATUSES_URL}?limit=10&page=${page}&sort=${sort}&direction=${direction}`;

      if (search !== undefined && search !== '') {
        url = `${url}&search=${search}`;
      }

      console.log('loadTrainingEventEmployeeStatus url =', url);

      const resData = await fetchGET(url);

      console.log('loadTrainingEventEmployeeStatus --->', resData);

      dispatch({
        type: GET_TRAINING_EVENT_EMPLOYEE_STATUSES,
        payload: resData.data,
      });

      dispatch({
        type: GET_TRAINING_EVENT_EMPLOYEE_STATUSES_PAGINATION,
        payload: resData.pagination,
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
};

export const addTrainingEventEmployeeStatuses = (
  trainingEventEmployeeStatus
) => {
  return async (dispatch) => {
    try {
      const url = URLConstants.TRAINING_EVENT_EMPLOYEE_STATUSES_URL;

      console.log('addTrainingEventEmployeeStatus url =', url);

      const resData = await fetchPOST(url, trainingEventEmployeeStatus);

      console.log('addTrainingEventEmployeeStatus --->', resData);

      dispatch({
        type: POST_TRAINING_EVENT_EMPLOYEE_STATUSES,
        payload: resData.data,
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
};

export const getTrainingEventEmployeeStatus = (id) => {
  return async (dispatch) => {
    try {
      const url = `${URLConstants.GET_TRAINING_EVENT_EMPLOYEE_URL}/${id}.json`;

      console.log('getTrainingEventEmployeeStatus url =', url);

      const resData = await fetchGET(url);

      console.log('getTrainingEventEmployeeStatus--->', resData);

      dispatch({
        type: GET_TRAINING_EVENT_EMPLOYEE_STATUS,
        payload: resData.data,
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
};

export const updateTrainingEventEmployeeStatus = (
  trainingEventEmployeeStatus
) => {
  return async (dispatch) => {
    try {
      const url = `${URLConstants.GET_TRAINING_EVENT_EMPLOYEE_STATUS_URL}/${trainingEventEmployeeStatus.id}.json`;

      console.log('updateTrainingEventEmployeeStatus url =', url);

      const resData = await fetchPUT(url, trainingEventEmployeeStatus);

      console.log('updateTrainingEventEmployeeStatus --->', resData);

      dispatch({
        type: UPDATE_TRAINING_EVENT_EMPLOYEE_STATUS,
        payload: resData.data,
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
};
