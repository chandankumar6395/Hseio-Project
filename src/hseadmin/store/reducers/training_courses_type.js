import {
  ADD_TRAINING_COURSE_TYPE,
  DELETE_TRAINING_COURSE_TYPE,
  EDIT_TRAINING_COURSE_TYPE,
  TRAINING_COURSE_TYPE_LIST,
  TRAINING_COURSE_TYPE_LIST_PAGINATION,
  UPDATE_TRAINING_COURSE_TYPE,
  GET_TRAINING_COURSE_TYPE,
} from '../actions/training_courses_type';

const initialState = {
  training_course_types: [], // we will save token here.
  training_course_type: null,
  page: 1,
  pagination: null,
};
// eslint-disable-next-line default-param-last
export default (state = initialState, action) => {
  switch (action.type) {
    case TRAINING_COURSE_TYPE_LIST:
      return {
        ...state,
        training_course_types: action.payload,
      };

    case TRAINING_COURSE_TYPE_LIST_PAGINATION:
      console.log('I am here in pagnation --->');

      return {
        ...state,
        pagination: action.payload,
      };

    case ADD_TRAINING_COURSE_TYPE:
      return {
        ...state,
        training_course_type: action.payload,
      };

    case EDIT_TRAINING_COURSE_TYPE:
      return {
        ...state,
        training_course_type: action.payload,
      };

    case DELETE_TRAINING_COURSE_TYPE:
      return {
        ...state,
        training_course_type: action.payload,
      };

    case GET_TRAINING_COURSE_TYPE:
      return {
        ...state,
        training_course_type: action.payload,
      };

    case UPDATE_TRAINING_COURSE_TYPE:
      return {
        ...state,
        editTraining_course_type: action.payload,
      };

    default:
      return state;
  }
};
