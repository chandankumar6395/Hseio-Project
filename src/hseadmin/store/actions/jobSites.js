import { fetchGET, fetchPOST, fetchPUT } from '../../utils/NetworkUtils';
import URLConstants from '../../constants/URLConstants';

export const GET_JOB_SITES = 'GET_JOB_SITES ';
export const GET_JOB_SITES_PAGINATION = 'GET_JOB_SITES_PAGINATION';
export const POST_JOB_SITES = 'POST_JOB_SITES ';
export const GET_JOB_SITE = 'GET_JOB_SITE';
export const UPDATE_JOB_SITE = 'UPDATE_JOB_SITE';

//
export const loadJobSites = (
  page = 1,
  search = '',
  sort,
  direction,
  companyId = -1,
  divisionId = -1
) => {
  return async (dispatch) => {
    try {
      let url = `${URLConstants.JOB_SITES_URL}?limit=10&page=${page}&sort=${sort}&direction=${direction}`;

      if (search !== undefined && search !== '') {
        url = `${url}&search=${search}`;
      }

      if (companyId !== -1) {
        url = `${url}&company_id=${companyId}`;
      }
      if (divisionId !== -1) {
        url = `${url}&division_id=${divisionId}`;
      }

      console.log('loadJobSites url =', url);

      const resData = await fetchGET(url);

      console.log('loadJobSites --->', resData);

      dispatch({
        type: GET_JOB_SITES,
        payload: resData.data,
      });

      dispatch({
        type: GET_JOB_SITES_PAGINATION,
        payload: resData.pagination,
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
};

export const addJobSites = (jobSite) => {
  return async (dispatch) => {
    try {
      const url = URLConstants.JOB_SITES_URL;

      console.log('addJobSites url =', url);

      const resData = await fetchPOST(url, jobSite);

      console.log('addJobSites --->', resData);

      dispatch({
        type: POST_JOB_SITES,
        payload: resData.data,
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
};

export const getJobSite = (id) => {
  return async (dispatch) => {
    try {
      const url = `${URLConstants.GET_JOB_SITE_URL}/${id}.json`;

      console.log('getJobSite url =', url);

      const resData = await fetchGET(url);

      console.log('getJobSite --->', resData);

      dispatch({
        type: GET_JOB_SITE,
        payload: resData.data,
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
};

export const updateJobSite = (jobSite) => {
  return async (dispatch) => {
    try {
      const url = `${URLConstants.GET_JOB_SITE_URL}/${jobSite.id}.json`;

      console.log('updateJobSite url =', url);

      const resData = await fetchPUT(url, jobSite);

      console.log('updateJobSite --->', resData);

      dispatch({
        type: UPDATE_JOB_SITE,
        payload: resData.data,
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
};
