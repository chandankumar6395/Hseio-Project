import {
  GET_INCIDENTS,
  GET_INCIDENTS_PAGINATION,
  POST_INCIDENTS,
  UPDATE_INCIDENT,
  GET_INCIDENT,
} from '../actions/incidents';

const initialState = {
  incidents: [], // we will save token here.
  incident: null,
  page: 1,
  pagination: null,
  updateIncident: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_INCIDENTS:
      console.log('I am here in incident --->');
      return {
        ...state,
        incidents: action.payload,
      };

    case GET_INCIDENTS_PAGINATION:
      console.log('I am here in pagination --->');
      return {
        ...state,
        pagination: action.payload,
      };

    case POST_INCIDENTS:
      return {
        ...state,
        incident: action.payload,
      };

    // default:
    //   return state;

    case GET_INCIDENT:
      return {
        ...state,
        incident: action.payload,
      };
    case UPDATE_INCIDENT:
      return {
        ...state,
        editIncident: action.payload,
      };
    default:
      return state;
  }
};
