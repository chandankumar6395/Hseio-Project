/* eslint-disable default-param-last */
import {
  AUTHENTICATE,
  LOGOUT,
  SET_DIVISIONS,
  SET_JOB_SITES,
  SET_SELECTED_DIVISION_ID,
  SET_SELECTED_JOB_SITE_ID,
} from '../actions/auth';

const initialState = {
  token: null, // we will save token here.
  divisions: [],
  jobSites: [],
  selectedJobSite: -1,
  selectedDivision: -1,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case AUTHENTICATE:
      return {
        ...state,
        token: action.payload,
      };
    case LOGOUT:
      return {
        ...state,
        token: null,
      };
    case SET_JOB_SITES:
      return {
        ...state,
        jobSites: action.payload,
      };

    case SET_DIVISIONS:
      return {
        ...state,
        divisions: action.payload,
      };

    case SET_SELECTED_DIVISION_ID:
      return {
        ...state,
        selectedDivision: action.payload,
      };

    case SET_SELECTED_JOB_SITE_ID:
      return {
        ...state,
        selectedJobSite: action.payload,
      };

    default:
      return state;
  }
};
