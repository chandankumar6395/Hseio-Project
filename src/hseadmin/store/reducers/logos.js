import {
  ADD_LOGO,
  DELETE_LOGO,
  EDIT_LOGO,
  LOGO_LIST,
  LOGO_LIST_PAGINATION,
  RESET_LOGO,
} from '../actions/logos';

const initialState = {
  logos: [], // we will save token here.
  logo: null,
  page: 1,
  pagination: null,
};

// eslint-disable-next-line default-param-last
export default (state = initialState, action) => {
  switch (action.type) {
    case LOGO_LIST:
      return {
        ...state,
        logos: action.payload,
      };

    case LOGO_LIST_PAGINATION:
      // console.log('I am here in pagnation --->');

      return {
        ...state,
        pagination: action.payload,
      };

    case ADD_LOGO:
      return {
        ...state,
        logo: action.payload,
      };

    case EDIT_LOGO:
      return {
        ...state,
        logo: action.payload,
      };

    case DELETE_LOGO:
      return {
        ...state,
        logo: action.payload,
      };

    case RESET_LOGO:
      return {
        ...state,
        logo: null,
      };

    default:
      return state;
  }
};
