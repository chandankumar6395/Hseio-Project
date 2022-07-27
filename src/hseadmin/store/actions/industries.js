import { fetchGET, fetchPOST, fetchPUT } from '../../utils/NetworkUtils';
import URLConstants from '../../constants/URLConstants';

export const GET_INDUSTRIES = 'GET_INDUSTRIES';
export const GET_INDUSTRIES_PAGINATION = 'GET_INDUSTRIES_PAGINATION';
export const POST_INDUSTRIES = 'POST_INDUSTRIES';
export const GET_INDUSTRY = 'GET_INDUSTRY';
export const UPDATE_INDUSTRY = 'UPDATE_INDUSTRY';

export const loadIndustries = (page = 1, search = '', sort, direction) => {
  return async (dispatch) => {
    try {
      let url = `${URLConstants.INDUSTRIES_URL}?limit=10&page=${page}&sort=${sort}&direction=${direction}`;

      if (search !== undefined && search !== '') {
        url = `${url}&search=${search}`;
      }

      console.log('loadIndustries url =', url);

      const resData = await fetchGET(url);
      console.log('loadIndustries --->', resData);

      dispatch({
        type: GET_INDUSTRIES,
        payload: resData.data,
      });

      dispatch({
        type: GET_INDUSTRIES_PAGINATION,
        payload: resData.pagination,
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
};

export const addIndustries = (industry) => {
  return async (dispatch) => {
    try {
      const url = URLConstants.INDUSTRIES_URL;

      console.log('addIndustries url =', url);

      const resData = await fetchPOST(url, industry);

      console.log('addIndustries --->', resData);

      dispatch({
        type: POST_INDUSTRIES,
        payload: resData.data,
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
};

export const getIndustry = (id) => {
  return async (dispatch) => {
    try {
      const url = `${URLConstants.GET_INDUSTRY_URL}/${id}.json`;

      console.log('getIndustry url =', url);

      const resData = await fetchGET(url);
      console.log('getIndustry --->', resData);

      dispatch({
        type: GET_INDUSTRY,
        payload: resData.data,
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
};

export const updateIndustry = (industry) => {
  return async (dispatch) => {
    try {
      const url = `${URLConstants.GET_INDUSTRY_URL}/${industry.id}.json`;

      console.log('updateIndustry url =', url);

      const resData = await fetchPUT(url, industry);

      console.log('updateIndustry --->', resData);

      dispatch({
        type: UPDATE_INDUSTRY,
        payload: resData.data,
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
};
