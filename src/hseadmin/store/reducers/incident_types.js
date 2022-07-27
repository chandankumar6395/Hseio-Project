import {
  // eslint-disable-next-line import/named
  GET_INCIDENT_TYPES,
  GET_INCIDENT_TYPES_PAGINATION,
  POST_INCIDENT_TYPES,
  GET_INCIDENT_TYPE,
  UPDATE_INCIDENT_TYPE,
} from '../actions/incident_type';

const initialState = {
  incidentTypes: [], // we will save token here.
  incidentType: null,
  page: 1,
  pagination: null,
  updateIncidentType: null,
};
// eslint-disable-next-line default-param-last
export default (state = initialState, action) => {
  switch (action.type) {
    case GET_INCIDENT_TYPES:
      console.log('I am here in equipment --->');
      return {
        ...state,
        incidentTypes: action.payload,
      };

    case GET_INCIDENT_TYPES_PAGINATION:
      console.log('I am here in pagnation --->');
      return {
        ...state,
        pagination: action.payload,
      };

    case POST_INCIDENT_TYPES:
      return {
        ...state,
        incidentType: action.payload,
      };
    case GET_INCIDENT_TYPE:
      return {
        ...state,
        incidentType: action.payload,
      };
    case UPDATE_INCIDENT_TYPE:
      return {
        ...state,
        editIncidentType: action.payload,
      };

    default:
      return state;
  }
};
