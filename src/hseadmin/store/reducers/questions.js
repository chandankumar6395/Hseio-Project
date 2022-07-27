/* eslint-disable default-param-last */
import {
  GET_QUESTIONS,
  GET_QUESTIONS_PAGINATION,
  POST_QUESTIONS,
  GET_QUESTION,
  UPDATE_QUESTION,
} from '../actions/questions';

const initialState = {
  questions: [], // we will save token here.
  question: null,
  page: 1,
  pagination: null,
  updateQuestion: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_QUESTIONS:
      console.log('I am here in questions --->');
      return {
        ...state,
        questions: action.payload,
      };

    case GET_QUESTIONS_PAGINATION:
      console.log('I am here in pagnation --->');
      return {
        ...state,
        pagination: action.payload,
      };

    case POST_QUESTIONS:
      return {
        ...state,
        question: action.payload,
      };
    case GET_QUESTION:
      return {
        ...state,
        question: action.payload,
      };
    case UPDATE_QUESTION:
      return {
        ...state,
        editQuestion: action.payload,
      };

    default:
      return state;
  }
};
