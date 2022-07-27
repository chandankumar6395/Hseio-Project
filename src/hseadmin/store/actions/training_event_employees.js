import { fetchGET, fetchPOST, fetchPUT } from '../../utils/NetworkUtils';
import URLConstants from '../../constants/URLConstants';

export const GET_TRAINING_EVENT_EMPLOYEES = 'GET_TRAINING_EVENT_EMPLOYEES';
export const GET_TRAINING_EVENT_EMPLOYEES_PAGINATION =
  'GET_TRAINING_EVENT_EMPLOYEES_PAGINATION';
export const POST_TRAINING_EVENT_EMPLOYEES = 'POST_TRAINING_EVENT_EMPLOYEES';
export const GET_TRAINING_EVENT_EMPLOYEE = 'GET_TRAINING_EVENT_EMPLOYEE';
export const UPDATE_TRAINING_EVENT_EMPLOYEE = 'UPDATE_TRAINING_EVENT_EMPLOYEE';
export const RESET_TRAINING_EVENT_EMPLOYEE = 'RESET_TRAINING_EVENT_EMPLOYEE';

//
export const loadTrainingEventEmployees = (
  page = 1,
  search = '',
  sort,
  direction,
  limit = 10
) => {
  return async (dispatch) => {
    dispatch({
      type: RESET_TRAINING_EVENT_EMPLOYEE,
      payload: null,
    });
    try {
      let url = `${URLConstants.TRAINING_EVENT_EMPLOYEES_URL}?limit=${limit}&page=${page}&sort=${sort}&direction=${direction}`;
      if (search !== undefined && search !== '') {
        url = `${url}&search=${search}`;
      }

      console.log('loadTrainingEventEmployees url =', url);

      const resData = await fetchGET(url);

      console.log('loadTrainingEventEmployees --->', resData);

      dispatch({
        type: GET_TRAINING_EVENT_EMPLOYEES,
        payload: resData.data,
      });

      dispatch({
        type: GET_TRAINING_EVENT_EMPLOYEES_PAGINATION,
        payload: resData.pagination,
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
};

export const addTrainingEventEmployees = (trainingEventEmployee) => {
  return async (dispatch) => {
    try {
      const url = URLConstants.TRAINING_EVENT_EMPLOYEES_URL;

      console.log('addTrainingEventEmployees url =', url);

      const resData = await fetchPOST(url, trainingEventEmployee);

      console.log('addTrainingEventEmployees --->', resData);

      dispatch({
        type: POST_TRAINING_EVENT_EMPLOYEES,
        payload: resData.data,
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
};
export const getTrainingEventEmployees = (id) => {
  return async (dispatch) => {
    try {
      const url = `${URLConstants.GET_TRAINING_EVENT_EMPLOYEE_URL}/${id}.json`;

      console.log('getTrainingEventEmployee url =', url);

      const resData = await fetchGET(url);

      console.log('getTrainingEventEmployee --->', resData);

      dispatch({
        type: GET_TRAINING_EVENT_EMPLOYEE,
        payload: resData.data,
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
};

export const updateTrainingEventEmployee = (trainingEventEmployee) => {
  return async (dispatch) => {
    try {
      const url = `${URLConstants.GET_TRAINING_EVENT_EMPLOYEE_URL}/${trainingEventEmployee.id}.json`;

      console.log('updateTrainingEventEmployee url =', url);

      const resData = await fetchPUT(url, trainingEventEmployee);
      console.log('updateTrainingEventEmployee --->', resData);

      dispatch({
        type: UPDATE_TRAINING_EVENT_EMPLOYEE,
        payload: resData.data,
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
};

export const resetTrainingEventEmployee = () => {
  return async (dispatch) => {
    dispatch({
      type: RESET_TRAINING_EVENT_EMPLOYEE,
      payload: null,
    });
  };
};
