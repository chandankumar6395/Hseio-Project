/* eslint-disable default-param-last */
import {
  GET_EMPLOYEE_DOCUMENTS,
  GET_EMPLOYEE_DOCUMENTS_PAGINATION,
  // eslint-disable-next-line import/named
  GET_EMPLOYEE_DOCUMENT,
  // POST_CERTIFICATES,
  // UPDATE_CERTIFICATE
} from '../actions/employee_documents';

const initialState = {
  employeeDocuments: [], // we will save token here.
  employeeDocument: null,
  page: 1,
  pagination: null,
  // updateCertificate: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_EMPLOYEE_DOCUMENTS:
      console.log('I am here in employeeDocuments --->');
      return {
        ...state,
        employeeDocuments: action.payload,
      };

    case GET_EMPLOYEE_DOCUMENTS_PAGINATION:
      console.log('I am here in employee_documents --->');
      return {
        ...state,
        pagination: action.payload,
      };

    // default:
    //   return state;

    case GET_EMPLOYEE_DOCUMENT:
      return {
        ...state,
        employeeDocuments: action.payload,
      };
    // case UPDATE_CERTIFICATE:
    //   return {
    //     ...state,
    //     updateCertificate: action.payload
    //   };
    default:
      return state;
  }
};
