/* eslint-disable default-param-last */
import {
  GET_JOB_SITES,
  GET_JOB_SITES_PAGINATION,
  POST_JOB_SITES,
  GET_JOB_SITE,
  UPDATE_JOB_SITE,
} from '../actions/jobSites';

const initialState = {
  jobSites: [], // we will save token here.
  jobSite: null,
  page: 1,
  pagination: null,
  updateJobSite: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_JOB_SITES:
      console.log('I am here in jobSite --->');
      return {
        ...state,
        jobSites: action.payload,
      };

    case GET_JOB_SITES_PAGINATION:
      console.log('I am here in pagnation --->');
      return {
        ...state,
        pagination: action.payload,
      };

    case POST_JOB_SITES:
      return {
        ...state,
        jobSite: action.payload,
      };
    case GET_JOB_SITE:
      return {
        ...state,
        jobSite: action.payload,
      };
    case UPDATE_JOB_SITE:
      return {
        ...state,
        editJobSite: action.payload,
      };

    default:
      return state;
  }
};
