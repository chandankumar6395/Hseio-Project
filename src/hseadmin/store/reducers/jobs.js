import {
  GET_JOBS,
  GET_JOBS_PAGINATION,
  POST_JOBS,
  GET_JOB,
  UPDATE_JOB,
} from '../actions/jobs';

const initialState = {
  jobs: [], // we will save token here.
  job: null,
  page: 1,
  pagination: null,
  updateJob: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_JOBS:
      console.log('I am here in job --->');
      return {
        ...state,
        jobs: action.payload,
      };

    case GET_JOBS_PAGINATION:
      console.log('I am here in pagnation --->');
      return {
        ...state,
        pagination: action.payload,
      };

    case POST_JOBS:
      return {
        ...state,
        job: action.payload,
      };
    case GET_JOB:
      return {
        ...state,
        job: action.payload,
      };
    case UPDATE_JOB:
      return {
        ...state,
        editJob: action.payload,
      };

    default:
      return state;
  }
};
