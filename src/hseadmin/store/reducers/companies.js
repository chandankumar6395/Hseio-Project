import {
  GET_COMPANIES,
  GET_COMPANIES_PAGINATION,
  GET_COMPANY,
  POST_COMPANIES,
  UPDATE_COMPANY,
  RESET_COMPANY,
} from '../actions/companies';

const initialState = {
  companies: [], // we will save token here.
  company: null,
  page: 1,
  pagination: null,
  updateCompany: null,
};

// eslint-disable-next-line default-param-last
export default (state = initialState, action) => {
  switch (action.type) {
    case GET_COMPANIES:
      console.log('I am here in companies --->');
      return {
        ...state,
        companies: action.payload,
      };
    case GET_COMPANIES_PAGINATION:
      console.log('I am here in pagnation --->');
      return {
        ...state,
        pagination: action.payload,
      };

    case POST_COMPANIES:
      return {
        ...state,
        company: action.payload,
      };
    case GET_COMPANY:
      return {
        ...state,
        company: action.payload,
      };
    case UPDATE_COMPANY:
      return {
        ...state,
        editCompany: action.payload,
      };
    case RESET_COMPANY:
      return {
        ...state,
        company: null,
      };

    default:
      return state;
  }
};
