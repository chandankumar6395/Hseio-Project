/* eslint-disable default-param-last */
import { GET_DASHBOARD_DATA } from '../actions/dashboad';

const initialState = {
  dashboard: null, // we will save token here.
  address: null,
  page: 1,
  pagination: null,
  updateAddress: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_DASHBOARD_DATA:
      return {
        ...state,
        dashboard: action.payload,
      };
    default:
      return state;
  }
};
