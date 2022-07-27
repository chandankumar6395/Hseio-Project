/* eslint-disable default-param-last */
import { fetchGET, fetchPOST, fetchPUT } from '../../utils/NetworkUtils';
import URLConstants from '../../constants/URLConstants';

export const GET_CERTIFICATES = 'GET_CERTIFICATES';
export const POST_CERTIFICATES = 'POST_CERTIFICATES';
export const GET_CERTIFICATES_PAGINATION = 'GET_CERTIFICATES_PAGINATION';
export const GET_CERTIFICATE = 'GET_CERTIFICATE';
export const UPDATE_CERTIFICATE = 'UPDATE_CERTICATE';

//
export const loadCertificates = (
  page = 1,
  search = '',
  sort,
  direction,
  expired,
  startDate,
  endDate,
  employeeId = -1
) => {
  return async (dispatch) => {
    try {
      let url = `${URLConstants.CERTIFICATES_URL}?limit=10&page=${page}&sort=${sort}&direction=${direction}`;

      if (search !== undefined && search !== '') {
        url = `${url}&search=${search}`;
      }

      if (employeeId !== -1) {
        url = `${url}&employee_id=${employeeId}`;
      }

      if (expired === true) {
        url = `${url}&expired=${expired}&start_date=${startDate}&end_date=${endDate}&`;
      }

      console.log('loadCertificates url =', url);

      const resData = await fetchGET(url);

      console.log('loadCertificates --->', resData);

      dispatch({
        type: GET_CERTIFICATES,
        payload: resData.data,
      });

      dispatch({
        type: GET_CERTIFICATES_PAGINATION,
        payload: resData.pagination,
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
};

export const addCertificates = (certificate) => {
  return async (dispatch) => {
    try {
      const url = URLConstants.CERTIFICATES_URL;

      console.log('addCertificates url =', url);

      const resData = await fetchPOST(url, certificate);
      console.log('addCertificates --->', resData);

      dispatch({
        type: POST_CERTIFICATES,
        payload: resData.data,
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
};

export const getCertificate = (id) => {
  return async (dispatch) => {
    try {
      const url = `${URLConstants.GET_CERTIFICATE_URL}/${id}.json`;

      console.log('getCertificate url =', url);

      const resData = await fetchGET(url);
      console.log('getCertificate --->', resData);

      dispatch({
        type: GET_CERTIFICATE,
        payload: resData.data,
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
};

export const updateCertificate = (certificate) => {
  return async (dispatch) => {
    try {
      const url = `${URLConstants.GET_CERTIFICATE_URL}/${certificate.id}.json`;

      console.log('updateCertificate url =', url);

      const resData = await fetchPUT(url, certificate);

      console.log('updateCertificate --->', resData);

      dispatch({
        type: UPDATE_CERTIFICATE,
        payload: resData.data,
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
};
