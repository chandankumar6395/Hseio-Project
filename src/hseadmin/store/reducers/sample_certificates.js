/* eslint-disable default-param-last */
import {
  GET_SAMPLE_CERTIFICATES,
  GET_SAMPLE_CERTIFICATES_PAGINATION,
  GET_SAMPLE_CERTIFICATE,
  POST_SAMPLE_CERTIFICATES,
  UPDATE_SAMPLE_CERTIFICATE,
} from '../actions/sample_certificates';

const initialState = {
  samplecertificates: [], // we will save token here.
  samplecertificate: null,
  page: 1,
  pagination: null,
  updateSampleCertificate: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_SAMPLE_CERTIFICATES:
      console.log('I am here in certificates --->');
      return {
        ...state,
        samplecertificates: action.payload,
      };
    case GET_SAMPLE_CERTIFICATES_PAGINATION:
      console.log('I am here in pagnation --->');
      return {
        ...state,
        pagination: action.payload,
      };
    case POST_SAMPLE_CERTIFICATES:
      return {
        ...state,
        samplecertificate: action.payload,
      };
    // default:
    // return state;
    case GET_SAMPLE_CERTIFICATE:
      return {
        ...state,
        samplecertificate: action.payload,
      };
    case UPDATE_SAMPLE_CERTIFICATE:
      return {
        ...state,
        updateSampleCertificate: action.payload,
      };
    default:
      return state;
  }
};
