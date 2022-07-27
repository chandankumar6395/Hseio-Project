/* eslint-disable default-param-last */
import {
  GET_DIVISIONS,
  GET_DIVISIONS_PAGINATION,
  POST_DIVISIONS,
  UPDATE_DIVISION,
  GET_DIVISION,
} from '../actions/divisions';

const initialState = {
  divisions: [], // we will save token here.
  division: null,
  page: 1,
  pagination: null,
  updateDivision: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_DIVISIONS:
      console.log('I am here in divisions --->');
      return {
        ...state,
        divisions: action.payload,
      };

    case GET_DIVISIONS_PAGINATION:
      console.log('I am here in pagination --->');
      return {
        ...state,
        pagination: action.payload,
      };

    case POST_DIVISIONS:
      return {
        ...state,
        division: action.payload,
      };

    // default:
    //   return state;

    case GET_DIVISION:
      return {
        ...state,
        division: action.payload,
      };
    case UPDATE_DIVISION:
      return {
        ...state,
        editDivision: action.payload,
      };
    default:
      return state;
  }
};
