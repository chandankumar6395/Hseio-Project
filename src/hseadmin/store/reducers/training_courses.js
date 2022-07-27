import {
  ADD_TRAINING_COURSE,
  DELETE_TRAINING_COURSE,
  EDIT_TRAINING_COURSE,
  TRAINING_COURSE_LIST,
  TRAINING_COURSE_LIST_PAGINATION,
  GET_TRAINING_COURSE,
  UPDATE_TRAINING_COURSE,
} from '../actions/training_courses';

const initialState = {
  training_courses: [], // we will save token here.
  training_course: null,
  page: 1,
  pagination: null,
  updateTraining_Course: null,
};
// eslint-disable-next-line default-param-last
export default (state = initialState, action) => {
  switch (action.type) {
    case TRAINING_COURSE_LIST:
      return {
        ...state,
        training_courses: action.payload,
      };

    case TRAINING_COURSE_LIST_PAGINATION:
      console.log('I am here in pagnation --->');

      return {
        ...state,
        pagination: action.payload,
      };

    case ADD_TRAINING_COURSE:
      return {
        ...state,
        training_course: action.payload,
      };

    case EDIT_TRAINING_COURSE:
      return {
        ...state,
        training_course: action.payload,
      };

    case DELETE_TRAINING_COURSE:
      return {
        ...state,
        training_course: action.payload,
      };

    case GET_TRAINING_COURSE:
      return {
        ...state,
        training_course: action.payload,
      };

    case UPDATE_TRAINING_COURSE:
      return {
        ...state,
        editTraining_course: action.payload,
      };

    default:
      return state;
  }
};
