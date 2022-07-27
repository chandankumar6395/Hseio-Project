/* eslint-disable default-param-last */
import {
  GET_JOB_SITE_CREWS,
  GET_JOB_SITE_CREWS_PAGINATION,
  POST_JOB_SITE_CREWS,
  UPDATE_JOB_SITE_CREW,
  GET_JOB_SITE_CREW,
} from '../actions/jobSiteCrews';

const initialState = {
  jobSiteCrews: [], // we will save token here.
  jobSiteCrew: null,
  page: 1,
  pagination: null,
  updateJobSiteCrew: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_JOB_SITE_CREWS:
      console.log('I am here in job_site_crews --->');
      return {
        ...state,
        jobSiteCrews: action.payload,
      };

    case GET_JOB_SITE_CREWS_PAGINATION:
      console.log('I am here in pagination --->');
      return {
        ...state,
        pagination: action.payload,
      };

    case POST_JOB_SITE_CREWS:
      return {
        ...state,
        jobSiteCrew: action.payload,
      };

    // default:
    //   return state;

    case UPDATE_JOB_SITE_CREW:
      return {
        ...state,
        editJobSiteCrew: action.payload,
      };
    case GET_JOB_SITE_CREW:
      console.log('I am here in job_site_crew --->');
      return {
        ...state,
        jobSiteCrew: action.payload,
      };
    default:
      return state;
  }
};
