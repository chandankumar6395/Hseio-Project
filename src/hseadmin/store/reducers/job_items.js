import {
  GET_JOB_ITEMS,
  GET_JOB_ITEMS_PAGINATION,
  POST_JOB_ITEMS,
  GET_JOB_ITEM,
  UPDATE_JOB_ITEM,
} from '../actions/job-items';

const initialState = {
  jobItems: [], // we will save token here.
  jobItem: null,
  page: 1,
  pagination: null,
  updateJobItem: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_JOB_ITEMS:
      console.log('I am here in jobItems --->');
      return {
        ...state,
        jobItems: action.payload,
      };

    case GET_JOB_ITEMS_PAGINATION:
      console.log('I am here in pagnation --->');
      return {
        ...state,
        pagination: action.payload,
      };

    case POST_JOB_ITEMS:
      return {
        ...state,
        jobItem: action.payload,
      };
    case GET_JOB_ITEM:
      return {
        ...state,
        jobItem: action.payload,
      };
    case UPDATE_JOB_ITEM:
      return {
        ...state,
        editJobItem: action.payload,
      };

    default:
      return state;
  }
};
