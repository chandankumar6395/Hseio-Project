/* eslint-disable default-param-last */
import { fetchGET, fetchPOST, fetchPUT } from '../../utils/NetworkUtils';
import URLConstants from '../../constants/URLConstants';

export const GET_JOB_SITE_CREW_MEMBERS = 'GET_JOB_SITE_CREW_MEMBERS ';
export const GET_JOB_SITE_CREW_MEMBERS_PAGINATION =
  'GET_JOB_SITE_CREW_MEMBERS_PAGINATION';
export const POST_JOB_SITE_CREW_MEMBERS = 'POST_JOB_SITE_CREW_MEMBERS';
export const GET_JOB_SITE_CREW_MEMBER = 'GET_JOB_SITE_CREW_MEMBER';
export const UPDATE_JOB_SITE_CREW_MEMBER = 'UPDATE_JOB_SITE_CREW_MEMBER';

//
export const loadJobSiteCrewMembers = (
  page = 1,
  search = '',
  sort,
  direction
) => {
  return async (dispatch) => {
    try {
      let url = `${URLConstants.JOB_SITE_CREW_MEMBERS_URL}?limit=10&page=${page}&sort=${sort}&direction=${direction}`;

      if (search !== undefined && search !== '') {
        url = `${url}&search=${search}`;
      }

      url = `${URLConstants.JOB_SITE_CREW_MEMBERS_URL}`;

      console.log('loadJobSiteCrewMemberUrl url =', url);

      const resData = await fetchGET(url);

      console.log('loadJobSiteCrewMemberUrl --->', resData);

      dispatch({
        type: GET_JOB_SITE_CREW_MEMBERS,
        payload: resData.data,
      });

      dispatch({
        type: GET_JOB_SITE_CREW_MEMBERS_PAGINATION,
        payload: resData.pagination,
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
};

export const addJobSiteCrewMembers = (jobSiteCrewMember) => {
  return async (dispatch) => {
    try {
      const url = URLConstants.JOB_SITE_CREW_MEMBERS_URL;

      console.log('addJobSiteCrewMember url =', url);

      const resData = await fetchPOST(url, jobSiteCrewMember);

      console.log('addJobSiteCrewMember --->', resData);

      dispatch({
        type: POST_JOB_SITE_CREW_MEMBERS,
        payload: resData.data,
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
};

export const getJobSiteCrewMember = (id) => {
  return async (dispatch) => {
    try {
      const url = `${URLConstants.GET_JOB_SITE_CREW_MEMBER_URL}/${id}.json`;

      console.log('getJobSiteCrewMember url =', url);

      const resData = await fetchGET(url);

      console.log('getJobSiteCrewMember --->', resData);

      dispatch({
        type: GET_JOB_SITE_CREW_MEMBER,
        payload: resData.data,
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
};

export const updateJobSiteCrewMember = (jobSiteCrewMember) => {
  return async (dispatch) => {
    try {
      const url = `${URLConstants.GET_JOB_SITE_CREW_MEMBER_URL}/${jobSiteCrewMember.id}.json`;

      console.log('updateJobSite url =', url);

      const resData = await fetchPUT(url, jobSiteCrewMember);

      console.log('updateJobSiteCrewMember --->', resData);

      dispatch({
        type: UPDATE_JOB_SITE_CREW_MEMBER,
        payload: resData.data,
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
};
