import {
  GET_TRAINING_EVENTS,
  GET_TRAINING_EVENTS_PAGINATION,
  POST_TRAINING_EVENTS,
  UPDATE_TRAINING_EVENT,
  GET_TRAINING_EVENT,
} from '../actions/trainingEvents';

const initialState = {
  trainingEvents: [], // we will save token here.
  trainingEvent: null,
  page: 1,
  pagination: null,
  updateTrainingEvent: null,
};
// eslint-disable-next-line default-param-last
export default (state = initialState, action) => {
  switch (action.type) {
    case GET_TRAINING_EVENTS:
      console.log('I am here in training_event --->');
      return {
        ...state,
        trainingEvents: action.payload,
      };

    case GET_TRAINING_EVENTS_PAGINATION:
      console.log('I am here in pagination --->');
      return {
        ...state,
        pagination: action.payload,
      };

    case POST_TRAINING_EVENTS:
      return {
        ...state,
        trainingEvent: action.payload,
      };

    // default:
    //   return state;

    case UPDATE_TRAINING_EVENT:
      return {
        ...state,
        editTrainingEvent: action.payload,
      };
    case GET_TRAINING_EVENT:
      console.log('I am here in training_event --->');
      return {
        ...state,
        trainingEvent: action.payload,
      };
    default:
      return state;
  }
};
