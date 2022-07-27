/* eslint-disable default-param-last */
import { fetchGET } from '../../utils/NetworkUtils';
import URLConstants from '../../constants/URLConstants';

export const GET_EMPLOYEE_DOCUMENTS = 'GET_EMPLOYEE_DOCUMENTS';
// export const POST_CERTIFICATES = 'POST_CERTIFICATES';
export const GET_EMPLOYEE_DOCUMENTS_PAGINATION =
  'GET_EMPLOYEE_DOCUMENTS_PAGINATION';
export const GET_EMPLOYEE_DOCUMENT = 'GET_EMPLOYEE_DOCUMENT';
// export const UPDATE_CERTIFICATE = 'UPDATE_CERTICATE';

export const loadEmployeeDocuments = (
  page = 1,
  search = '',
  sort,
  direction,
  employeeId = -1,
  documentId = -1
) => {
  return async (dispatch) => {
    try {
      let url = `${URLConstants.GET_DOCUMENTS_URL}?limit=10&page=${page}&sort=${sort}&direction=${direction}`;

      if (search !== undefined && search !== '') {
        url = `${url}&search=${search}`;
      }

      if (employeeId !== -1) {
        url = `${url}&employee_id=${employeeId}`;
      }

      if (documentId !== -1) {
        url = `${url}&document_id=${documentId}`;
      }
      // if (employee_document_id !== -1) {
      //   url = `${url}&employee_document_id=${employee_document_id}`;
      // }

      console.log('loadEmployee_Documents url =', url);

      const resData = await fetchGET(url);

      console.log('loadEmployee_Documents --->', resData);

      dispatch({
        type: GET_EMPLOYEE_DOCUMENTS,
        payload: resData.data,
      });

      dispatch({
        type: GET_EMPLOYEE_DOCUMENTS_PAGINATION,
        payload: resData.pagination,
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
};

export const getEmployeeDocuments = (id) => {
  return async (dispatch) => {
    try {
      const url = `${URLConstants.GET_DOCUMENTS_URL}/${id}.json`;

      console.log('getEmployee_Document url =', url);

      const resData = await fetchGET(url);
      console.log('getEmployee_Document --->', resData);

      dispatch({
        type: GET_EMPLOYEE_DOCUMENTS,
        payload: resData.data,
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
};

// export const updateCertificate = (certificate) => {
//   return async (dispatch) => {
//     try {
//       const url = `${URLConstants.GET_CERTIFICATE_URL}/${certificate.id}.json`;
//
//       console.log('updateCertificate url =', url);
//
//       const resData = await fetchPUT(url, certificate);
//
//       console.log('updateCertificate --->', resData);
//
//       dispatch({
//         type: UPDATE_CERTIFICATE,
//         payload: resData.data
//       });
//     } catch (error) {
//       console.log(error);
//       throw error;
//     }
//   };
// };
