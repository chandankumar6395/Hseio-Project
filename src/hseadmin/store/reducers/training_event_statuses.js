import {
  GET_TRAINING_EVENT_STATUSES,
  // eslint-disable-next-line import/named
  GET_TRAINING_EVENT_STATUSES_PAGINATION,
  POST_TRAINING_EVENT_STATUSES,
  UPDATE_TRAINING_EVENT_STATUS,
  GET_TRAINING_EVENT_STATUS,
} from '../actions/training_event_statuses';

const initialState = {
  trainingEventStatuses: [], // we will save token here.
  trainingEventStatus: null,
  page: 1,
  pagination: null,
  updateTrainingEventStatus: null,
};

// eslint-disable-next-line default-param-last
export default (state = initialState, action) => {
  switch (action.type) {
    case GET_TRAINING_EVENT_STATUSES:
      console.log('I am here in training_event_status --->');
      return {
        ...state,
        trainingEventStatuses: action.payload,
      };

    case GET_TRAINING_EVENT_STATUSES_PAGINATION:
      console.log('I am here in pagination --->');
      return {
        ...state,
        pagination: action.payload,
      };

    case POST_TRAINING_EVENT_STATUSES:
      return {
        ...state,
        trainingEventStatuses: action.payload,
      };
    case UPDATE_TRAINING_EVENT_STATUS:
      return {
        ...state,
        editTrainingEventStatus: action.payload,
      };
    case GET_TRAINING_EVENT_STATUS:
      console.log('I am here in training_event_status --->');
      return {
        ...state,
        trainingEventStatus: action.payload,
      };
    default:
      return state;
  }
};
