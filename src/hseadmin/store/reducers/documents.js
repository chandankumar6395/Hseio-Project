/* eslint-disable default-param-last */
import {
  ADD_DOCUMENT,
  DELETE_DOCUMENT,
  DOCUMENT_LIST,
  DOCUMENT_LIST_PAGINATION,
  EDIT_DOCUMENT,
} from '../actions/documents';

const initialState = {
  documents: [], // we will save token here.
  document: null,
  page: 1,
  pagination: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case DOCUMENT_LIST:
      return {
        ...state,
        documents: action.payload,
      };

    case DOCUMENT_LIST_PAGINATION:
      console.log('I am here in pagnation --->');

      return {
        ...state,
        pagination: action.payload,
      };

    case ADD_DOCUMENT:
      return {
        ...state,
        document: action.payload,
      };

    case EDIT_DOCUMENT:
      return {
        ...state,
        document: action.payload,
      };

    case DELETE_DOCUMENT:
      return {
        ...state,
        document: action.payload,
      };

    default:
      return state;
  }
};
