/* eslint-disable default-param-last */
import {
  GET_AUDIT_TYPES,
  GET_AUDIT_TYPES_PAGINATION,
  POST_AUDIT_TYPES,
  GET_AUDIT_TYPE,
  UPDATE_AUDIT_TYPE,
} from '../actions/audit_types';

const initialState = {
  auditTypes: [], // we will save token here.
  auditType: null,
  page: 1,
  pagination: null,
  updateAuditType: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_AUDIT_TYPES:
      console.log('I am here in auditType --->');
      return {
        ...state,
        auditTypes: action.payload,
      };

    case GET_AUDIT_TYPES_PAGINATION:
      console.log('I am here in pagnation --->');

      return {
        ...state,
        pagination: action.payload,
      };

    case POST_AUDIT_TYPES:
      return {
        ...state,
        auditType: action.payload,
      };

    case GET_AUDIT_TYPE:
      return {
        ...state,
        auditType: action.payload,
      };
    case UPDATE_AUDIT_TYPE:
      return {
        ...state,
        editAuditType: action.payload,
      };

    default:
      return state;
  }
};
