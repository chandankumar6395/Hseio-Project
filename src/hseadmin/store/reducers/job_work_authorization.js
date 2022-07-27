import {
  GET_JOB_WORK_AUTHORIZATIONS,
  GET_JOB_WORK_AUTHORIZATIONS_PAGINATION,
  POST_JOB_WORK_AUTHORIZATIONS,
  UPDATE_JOB_WORK_AUTHORIZATION,
  GET_JOB_WORK_AUTHORIZATION,
} from '../actions/job_work_authorization';

const initialState = {
  jobWorkAuthorizations: [], // we will save token here.
  jobWorkAuthorization: null,
  page: 1,
  pagination: null,
  updateJobWorkAuthorization: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_JOB_WORK_AUTHORIZATIONS:
      console.log('I am here in jobWorkAuthorization --->');
      return {
        ...state,
        jobWorkAuthorizations: action.payload,
      };

    case GET_JOB_WORK_AUTHORIZATIONS_PAGINATION:
      console.log('I am here in pagination --->');
      return {
        ...state,
        pagination: action.payload,
      };

    case POST_JOB_WORK_AUTHORIZATIONS:
      return {
        ...state,
        jobWorkAuthorization: action.payload,
      };

    // default:
    //   return state;

    case GET_JOB_WORK_AUTHORIZATION:
      return {
        ...state,
        jobWorkAuthorization: action.payload,
      };
    case UPDATE_JOB_WORK_AUTHORIZATION:
      return {
        ...state,
        editJobWorkAuthorization: action.payload,
      };
    default:
      return state;
  }
};
