/* eslint-disable default-param-last */
import { fetchGET, fetchPOST, fetchPUT } from '../../utils/NetworkUtils';
import URLConstants from '../../constants/URLConstants';

export const GET_JOB_SITE_CREWS = 'GET_JOB_SITE_CREWS';
export const GET_JOB_SITE_CREWS_PAGINATION = 'GET_JOB_SITE_CREWS_PAGINATION';
export const POST_JOB_SITE_CREWS = 'POST_JOB_SITE_CREWS ';
export const GET_JOB_SITE_CREW = 'GET_JOB_SITE_CREW';
export const UPDATE_JOB_SITE_CREW = 'UPDATE_JOB_SITE_CREW';

//
export const loadJobSiteCrew = (
  page = 1,
  search = '',
  sort,
  direction,
  limit = 10
) => {
  return async (dispatch) => {
    try {
      let url = `${URLConstants.JOB_SITE_CREWS_URL}?limit=${limit}&page=${page}&sort=${sort}&direction=${direction}`;

      if (search !== undefined && search !== '') {
        url = `${url}&search=${search}`;
      }
      url = `${URLConstants.JOB_SITE_CREWS_URL}`;
      // if (companyId !== undefined && companyId !== '') {
      //   url = `${url}&company_id=${companyId}`;
      // }
      //
      // if (divisionId !== undefined && divisionId !== '') {
      //   url = `${url}&division_id=${divisionId}`;
      // }
      //
      // if (jobSiteId !== undefined && jobSiteId !== '') {
      //   url = `${url}&jobSite_id=${jobSiteId}`;
      // }

      console.log('loadJobSiteCrews url =', url);

      const resData = await fetchGET(url);

      console.log('loadJobSiteCrews --->', resData);

      dispatch({
        type: GET_JOB_SITE_CREWS,
        payload: resData.data,
      });

      dispatch({
        type: GET_JOB_SITE_CREWS_PAGINATION,
        payload: resData.pagination,
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
};

export const addJobSiteCrews = (jobSiteCrew) => {
  return async (dispatch) => {
    try {
      const url = URLConstants.JOB_SITE_CREWS_URL;

      console.log('addJobSiteCrews url =', url);

      const resData = await fetchPOST(url, jobSiteCrew);

      console.log('addJobSiteCrews --->', resData);

      dispatch({
        type: POST_JOB_SITE_CREWS,
        payload: resData.data,
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
};

export const getJobSiteCrew = (id) => {
  return async (dispatch) => {
    try {
      const url = `${URLConstants.GET_JOB_SITE_CREW_URL}/${id}.json`;

      console.log('getJobSiteCrew url =', url);

      const resData = await fetchGET(url);

      console.log('getJobSiteCrew --->', resData);

      dispatch({
        type: GET_JOB_SITE_CREW,
        payload: resData.data,
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
};

export const updateJobSiteCrew = (jobSiteCrew) => {
  return async (dispatch) => {
    try {
      const url = `${URLConstants.GET_JOB_SITE_CREW_URL}/${jobSiteCrew.id}.json`;

      console.log('updateJobSiteCrew url =', url);

      const resData = await fetchPUT(url, jobSiteCrew);

      console.log('updateJobSiteCrew --->', resData);

      dispatch({
        type: UPDATE_JOB_SITE_CREW,
        payload: resData.data,
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
};
