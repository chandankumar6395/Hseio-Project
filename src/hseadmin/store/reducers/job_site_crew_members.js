/* eslint-disable default-param-last */
import {
  GET_JOB_SITE_CREW_MEMBER,
  GET_JOB_SITE_CREW_MEMBERS,
  POST_JOB_SITE_CREW_MEMBERS,
  UPDATE_JOB_SITE_CREW_MEMBER,
  GET_JOB_SITE_CREW_MEMBERS_PAGINATION,
} from '../actions/job_site_crew_members';

const initialState = {
  jobSiteCrewMembers: [], // we will save token here.
  jobSiteCrewMember: null,
  page: 1,
  pagination: null,
  updateJobSiteCrewMember: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_JOB_SITE_CREW_MEMBERS:
      console.log('I am here in jobSiteCrewMember --->');
      return {
        ...state,
        jobSiteCrewMembers: action.payload,
      };

    case GET_JOB_SITE_CREW_MEMBERS_PAGINATION:
      console.log('I am here in pagnation --->');
      return {
        ...state,
        pagination: action.payload,
      };

    case POST_JOB_SITE_CREW_MEMBERS:
      return {
        ...state,
        jobSiteCrewMember: action.payload,
      };
    case GET_JOB_SITE_CREW_MEMBER:
      return {
        ...state,
        jobSiteCrewMember: action.payload,
      };
    case UPDATE_JOB_SITE_CREW_MEMBER:
      return {
        ...state,
        editJobSiteCrewMember: action.payload,
      };

    default:
      return state;
  }
};
