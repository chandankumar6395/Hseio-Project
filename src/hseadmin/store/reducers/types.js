/* eslint-disable default-param-last */
import {
  GET_TYPES,
  GET_TYPES_PAGINATION,
  POST_TYPES,
  GET_TYPE,
  UPDATE_TYPE,
} from '../actions/types';

const initialState = {
  types: [], // we will save token here.
  type: null,
  page: 1,
  pagination: null,
  updateType: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_TYPES:
      console.log('I am here in types --->');
      return {
        ...state,
        types: action.payload,
      };

    case GET_TYPES_PAGINATION:
      console.log('I am here in pagnation --->');

      return {
        ...state,
        pagination: action.payload,
      };

    case POST_TYPES:
      return {
        ...state,
        type: action.payload,
      };

    case GET_TYPE:
      return {
        ...state,
        type: action.payload,
      };
    case UPDATE_TYPE:
      return {
        ...state,
        editType: action.payload,
      };

    default:
      return state;
  }
};
