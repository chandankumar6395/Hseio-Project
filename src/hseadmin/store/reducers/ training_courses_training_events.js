import {
  GET_TRAINING_COURSES_TRAINING_EVENTS,
  // eslint-disable-next-line import/named
  GET_TRAINING_COURSES_TRAINING_EVENTS_PAGINATION,
  POST_TRAINING_COURSES_TRAINING_EVENTS,
  GET_TRAINING_COURSES_TRAINING_EVENT,
  UPDATE_TRAINING_COURSES_TRAINING_EVENT,
} from '../actions/ training_courses_training_events';

const initialState = {
  trainingCoursesTrainingEvents: [], // we will save token here.
  trainingCoursesTrainingEvent: null,
  page: 1,
  pagination: null,
  updateTrainingCoursesTrainingEvent: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_TRAINING_COURSES_TRAINING_EVENTS:
      console.log('I am here in trainingCoursesTrainingEvents --->');
      return {
        ...state,
        trainingCoursesTrainingEvents: action.payload,
      };

    case GET_TRAINING_COURSES_TRAINING_EVENTS_PAGINATION:
      console.log('I am here in pagnation --->');
      return {
        ...state,
        pagination: action.payload,
      };

    case POST_TRAINING_COURSES_TRAINING_EVENTS:
      return {
        ...state,
        trainingCoursesTrainingEvent: action.payload,
      };
    case GET_TRAINING_COURSES_TRAINING_EVENT:
      return {
        ...state,
        trainingCoursesTrainingEvent: action.payload,
      };
    case UPDATE_TRAINING_COURSES_TRAINING_EVENT:
      return {
        ...state,
        trainingCoursesTrainingEvent: action.payload,
      };

    default:
      return state;
  }
};
