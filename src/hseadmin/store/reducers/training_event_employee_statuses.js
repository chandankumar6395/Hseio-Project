import {
  GET_TRAINING_EVENT_EMPLOYEE_STATUSES,
  // eslint-disable-next-line import/named
  GET_TRAINING_EVENT_EMPLOYEE_STATUSES_PAGINATION,
  POST_TRAINING_EVENT_EMPLOYEE_STATUSES,
  UPDATE_TRAINING_EVENT_EMPLOYEE_STATUS,
  GET_TRAINING_EVENT_EMPLOYEE_STATUS,
} from '../actions/training_event_employee_statuses';

const initialState = {
  trainingEventEmployeeStatuses: [], // we will save token here.
  trainingEventEmployeeStatus: null,
  page: 1,
  pagination: null,
  updateTrainingEventEmployeeStatus: null,
};
// eslint-disable-next-line default-param-last
export default (state = initialState, action) => {
  switch (action.type) {
    case GET_TRAINING_EVENT_EMPLOYEE_STATUSES:
      console.log('I am here in training_event_employee_status --->');
      return {
        ...state,
        trainingEventEmployeeStatuses: action.payload,
      };

    case GET_TRAINING_EVENT_EMPLOYEE_STATUSES_PAGINATION:
      console.log('I am here in pagination --->');
      return {
        ...state,
        pagination: action.payload,
      };

    case POST_TRAINING_EVENT_EMPLOYEE_STATUSES:
      return {
        ...state,
        trainingEventEmployeeStatus: action.payload,
      };

    // default:
    //   return state;

    case UPDATE_TRAINING_EVENT_EMPLOYEE_STATUS:
      return {
        ...state,
        editTrainingEventEmployeeStatus: action.payload,
      };
    case GET_TRAINING_EVENT_EMPLOYEE_STATUS:
      console.log('I am here in training_event_employee_status --->');
      return {
        ...state,
        trainingEventEmployeeStatus: action.payload,
      };
    default:
      return state;
  }
};
