/* eslint-disable default-param-last */
import {
  GET_CERTIFICATES,
  GET_CERTIFICATES_PAGINATION,
  GET_CERTIFICATE,
  POST_CERTIFICATES,
  UPDATE_CERTIFICATE,
} from '../actions/certificates';

const initialState = {
  certificates: [], // we will save token here.
  certificate: null,
  page: 1,
  pagination: null,
  updateCertificate: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_CERTIFICATES:
      console.log('I am here in certificates --->');
      return {
        ...state,
        certificates: action.payload,
      };

    case GET_CERTIFICATES_PAGINATION:
      console.log('I am here in pagnation --->');
      return {
        ...state,
        pagination: action.payload,
      };

    case POST_CERTIFICATES:
      return {
        ...state,
        certificate: action.payload,
      };

    // default:
    //   return state;

    case GET_CERTIFICATE:
      return {
        ...state,
        certificate: action.payload,
      };
    case UPDATE_CERTIFICATE:
      return {
        ...state,
        updateCertificate: action.payload,
      };
    default:
      return state;
  }
};
