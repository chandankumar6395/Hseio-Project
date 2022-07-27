import {
  GET_TRAINING_EVENT_EMPLOYEES,
  GET_TRAINING_EVENT_EMPLOYEES_PAGINATION,
  GET_TRAINING_EVENT_EMPLOYEE,
  POST_TRAINING_EVENT_EMPLOYEES,
  UPDATE_TRAINING_EVENT_EMPLOYEE,
  RESET_TRAINING_EVENT_EMPLOYEE,
} from '../actions/training_event_employees';

const initialState = {
  trainingEventEmployees: [], // we will save token here.
  trainingEventEmployee: null,
  page: 1,
  pagination: null,
  updateTrainingEventEmployee: null,
};
// eslint-disable-next-line default-param-last
export default (state = initialState, action) => {
  switch (action.type) {
    case GET_TRAINING_EVENT_EMPLOYEES:
      console.log('I am here in trainingEventEmployees --->');
      return {
        ...state,
        trainingEventEmployees: action.payload,
      };
    case GET_TRAINING_EVENT_EMPLOYEES_PAGINATION:
      console.log('I am here in pagination --->');
      return {
        ...state,
        pagination: action.payload,
      };

    case POST_TRAINING_EVENT_EMPLOYEES:
      return {
        ...state,
        trainingEventEmployee: action.payload,
      };
    case GET_TRAINING_EVENT_EMPLOYEE:
      return {
        ...state,
        trainingEventEmployee: action.payload,
      };
    case UPDATE_TRAINING_EVENT_EMPLOYEE:
      return {
        ...state,
        editTrainingEventEmployee: action.payload,
      };
    case RESET_TRAINING_EVENT_EMPLOYEE:
      return {
        ...state,
        trainingEventEmployee: null,
      };

    default:
      return state;
  }
};
