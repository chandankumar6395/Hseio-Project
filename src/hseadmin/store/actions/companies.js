/* eslint-disable default-param-last */
import { fetchGET, fetchPOST, fetchPUT } from '../../utils/NetworkUtils';
import URLConstants from '../../constants/URLConstants';

export const GET_COMPANIES = 'GET_COMPANIES';
export const GET_COMPANIES_PAGINATION = 'GET_COMPANIES_PAGINATION';
export const POST_COMPANIES = 'POST_COMPANIES';
export const GET_COMPANY = 'GET_COMPANY';
export const UPDATE_COMPANY = 'UPDATE_COMPANY';
export const RESET_COMPANY = 'RESET_COMPANY';

//
export const loadCompanies = (
  page = 1,
  search = '',
  sort,
  direction,
  limit = 5
) => {
  return async (dispatch) => {
    dispatch({
      type: RESET_COMPANY,
      payload: null,
    });
    try {
      let url = `${URLConstants.COMPANIES_URL}?limit=${limit}&page=${page}&sort=${sort}&direction=${direction}`;
      if (search !== undefined && search !== '') {
        url = `${url}&search=${search}`;
      }

      const resData = await fetchGET(url);

      console.log('loadCompanies --->', resData);

      dispatch({
        type: GET_COMPANIES,
        payload: resData.data,
      });

      dispatch({
        type: GET_COMPANIES_PAGINATION,
        payload: resData.pagination,
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
};

export const addCompanies = (company) => {
  return async (dispatch) => {
    try {
      const url = URLConstants.COMPANIES_URL;

      console.log('addCompanies url =', url);

      const resData = await fetchPOST(url, company);

      console.log('addCompanies --->', resData);

      dispatch({
        type: POST_COMPANIES,
        payload: resData.data,
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
};
export const getCompany = (id) => {
  return async (dispatch) => {
    try {
      const url = `${URLConstants.GET_COMPANY_URL}/${id}.json`;

      console.log('getCompany url =', url);

      const resData = await fetchGET(url);

      console.log('getCompany --->', resData);

      dispatch({
        type: GET_COMPANY,
        payload: resData.data,
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
};

export const updateCompany = (company) => {
  return async (dispatch) => {
    try {
      const url = `${URLConstants.GET_COMPANY_URL}/${company.id}.json`;

      console.log('updateCompany url =', url);

      const resData = await fetchPUT(url, company);
      console.log('updateCompany --->', resData);

      dispatch({
        type: UPDATE_COMPANY,
        payload: resData.data,
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
};

export const resetCompany = () => {
  return async (dispatch) => {
    dispatch({
      type: RESET_COMPANY,
      payload: null,
    });
  };
};
