/* eslint-disable default-param-last */
import {
  ADD_BANNER,
  BANNER_LIST,
  BANNER_LIST_PAGINATION,
  DELETE_BANNER,
  EDIT_BANNER,
  RESET_BANNER,
} from '../actions/banners';

const initialState = {
  banners: [], // we will save token here.
  banner: null,
  page: 1,
  pagination: null,
  updateBanner: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case BANNER_LIST:
      return {
        ...state,
        banners: action.payload,
      };

    case BANNER_LIST_PAGINATION:
      console.log('I am here in pagnation --->');

      return {
        ...state,
        pagination: action.payload,
      };

    case ADD_BANNER:
      return {
        ...state,
        banner: action.payload,
      };

    case EDIT_BANNER:
      return {
        ...state,
        updateBanner: action.payload,
      };

    case DELETE_BANNER:
      return {
        ...state,
        banner: action.payload,
      };

    case RESET_BANNER:
      return {
        ...state,
        logo: null,
      };
    default:
      return state;
  }
};
