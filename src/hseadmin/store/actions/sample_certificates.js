import { fetchGET, fetchPOST, fetchPUT } from '../../utils/NetworkUtils';
import URLConstants from '../../constants/URLConstants';

export const GET_SAMPLE_CERTIFICATES = 'GET_SAMPLE_CERTIFICATES';
export const POST_SAMPLE_CERTIFICATES = 'POST_SAMPLE_CERTIFICATES';
export const GET_SAMPLE_CERTIFICATES_PAGINATION =
  'GET_SAMPLE_CERTIFICATES_PAGINATION';
export const GET_SAMPLE_CERTIFICATE = 'GET_SAMPLE_CERTIFICATE';
export const UPDATE_SAMPLE_CERTIFICATE = 'UPDATE_SAMPLE_CERTICATE';

//
export const loadSampleCertificates = (
  page = 1,
  search = '',
  sort,
  direction,
  expired,
  startDate,
  endDate,
  companyId = -1
) => {
  return async (dispatch) => {
    try {
      let url = `${URLConstants.SAMPLE_CERTIFICATES_URL}?limit=10&page=${page}&sort=${sort}&direction=${direction}`;

      if (search !== undefined && search !== '') {
        url = `${url}&search=${search}`;
      }

      if (companyId !== -1) {
        url = `${url}&id=${companyId}`;
      }

      //   if (expired === true) {
      //     url = `${url}&expired=${expired}&start_date=${startDate}&end_date=${endDate}&`;
      //   }

      console.log('loadsampleCertificates url =', url);

      const resData = await fetchGET(url);

      console.log('loadsampleCertificates --->', resData);

      dispatch({
        type: GET_SAMPLE_CERTIFICATES,
        payload: resData.data,
      });

      dispatch({
        type: GET_SAMPLE_CERTIFICATES_PAGINATION,
        payload: resData.pagination,
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
};

export const addSampleCertificates = (samplecertificate) => {
  return async (dispatch) => {
    try {
      const url = URLConstants.SAMPLE_CERTIFICATES_URL;

      console.log('addCertificates url =', url);

      const resData = await fetchPOST(url, samplecertificate);
      console.log('addSampleCertificates --->', resData);

      dispatch({
        type: POST_SAMPLE_CERTIFICATES,
        payload: resData.data,
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
};

export const getSampleCertificate = (id) => {
  return async (dispatch) => {
    try {
      const url = `${URLConstants.GET_SAMPLE_CERTIFICATES_URL}/${id}.json}`;

      console.log('getSampleCertificate url =', url);

      const resData = await fetchGET(url);
      console.log('getSampleCertificate --->', resData);

      dispatch({
        type: GET_SAMPLE_CERTIFICATE,
        payload: resData.data,
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
};

export const updateSampleCertificate = (samplecertificate) => {
  return async (dispatch) => {
    try {
      // const url = `http://localhost:8765/api/sample-certificates/${samplecertificate.id}.json`;
      const url = `${URLConstants.GET_SAMPLE_CERTIFICATES_URL}/${samplecertificate.id}.json}`;
      console.log('updateSampleCertificate url =', url);

      const resData = await fetchPUT(url, samplecertificate);

      console.log('updateSampleCertificate --->', resData);

      dispatch({
        type: UPDATE_SAMPLE_CERTIFICATE,
        payload: resData.data,
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
};
