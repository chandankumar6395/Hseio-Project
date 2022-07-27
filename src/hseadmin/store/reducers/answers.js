import {
  GET_ANSWERS,
  GET_ANSWERS_PAGINATION,
  POST_ANSWERS,
  UPDATE_ANSWER,
  GET_ANSWER,
} from '../actions/answers';

const initialState = {
  answers: [], // we will save token here.
  answer: null,
  page: 1,
  pagination: null,
  updateDivision: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_ANSWERS:
      console.log('I am here in answers --->');
      return {
        ...state,
        answers: action.payload,
      };

    case GET_ANSWERS_PAGINATION:
      console.log('I am here in pagination --->');
      return {
        ...state,
        pagination: action.payload,
      };

    case POST_ANSWERS:
      return {
        ...state,
        answer: action.payload,
      };

    // default:
    //   return state;

    case GET_ANSWER:
      return {
        ...state,
        answer: action.payload,
      };
    case UPDATE_ANSWER:
      return {
        ...state,
        editAnswer: action.payload,
      };
    default:
      return state;
  }
};
