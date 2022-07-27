/* eslint-disable default-param-last */
import {
  GET_INDUSTRIES,
  GET_INDUSTRIES_PAGINATION,
  GET_INDUSTRY,
  POST_INDUSTRIES,
  UPDATE_INDUSTRY,
} from '../actions/industries';

const initialState = {
  industries: [], // we will save token here.
  industry: null,
  page: 1,
  pagination: null,
  updateIndustry: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_INDUSTRIES:
      console.log('I am here in industries --->');
      return {
        ...state,
        industries: action.payload,
      };

    case GET_INDUSTRIES_PAGINATION:
      console.log('I am here in pagnation --->');
      return {
        ...state,
        pagination: action.payload,
      };

    case POST_INDUSTRIES:
      return {
        ...state,
        industry: action.payload,
      };

    case GET_INDUSTRY:
      return {
        ...state,
        industry: action.payload,
      };
    case UPDATE_INDUSTRY:
      return {
        ...state,
        updateIndustry: action.payload,
      };
    default:
      return state;
  }
};
