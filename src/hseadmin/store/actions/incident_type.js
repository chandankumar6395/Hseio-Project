import { fetchGET, fetchPOST, fetchPUT } from '../../utils/NetworkUtils';
import URLConstants from '../../constants/URLConstants';

export const GET_INCIDENT_TYPES = 'GET_INCIDENT_TYPES';
export const GET_INCIDENT_TYPES_PAGINATION = 'GET_INCIDENT_TYPES_PAGINATION';
export const POST_INCIDENT_TYPES = 'POST_INCIDENT_TYPES';
export const GET_INCIDENT_TYPE = 'GET_INCIDENT_TYPE';
export const UPDATE_INCIDENT_TYPE = 'UPDATE_INCIDENT_TYPE';

//
export const loadIncidentTypes = (page = 1, search = '', sort, direction) => {
  return async (dispatch) => {
    try {
      let url = `${URLConstants.INCIDENT_TYPES_URL}?limit=10&page=${page}&sort=${sort}&direction=${direction}`;

      if (search !== undefined && search !== '') {
        url = `${url}&search=${search}`;
      }

      console.log('incidentTypes url =', url);

      const resData = await fetchGET(url);

      console.log('incidentTypes --->', resData);

      dispatch({
        type: GET_INCIDENT_TYPES,
        payload: resData.data,
      });

      dispatch({
        type: GET_INCIDENT_TYPES_PAGINATION,
        payload: resData.pagination,
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
};

export const addIncidentType = (task) => {
  return async (dispatch) => {
    try {
      const url = URLConstants.INCIDENT_TYPES_URL;

      console.log('addIncidentTypes url =', url);

      const resData = await fetchPOST(url, task);

      console.log('addIncidentTypes --->', resData);

      dispatch({
        type: POST_INCIDENT_TYPES,
        payload: resData.data,
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
};

export const getIncidentType = (id) => {
  return async (dispatch) => {
    try {
      const url = `${URLConstants.GET_INCIDENT_TYPE_URL}/${id}.json`;

      console.log('getIncidentTypes url =', url);

      const resData = await fetchGET(url);

      console.log('getIncidentTypes --->', resData);

      dispatch({
        type: GET_INCIDENT_TYPE,
        payload: resData.data,
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
};

export const updateIncidentType = (task) => {
  return async (dispatch) => {
    try {
      const url = `${URLConstants.GET_INCIDENT_TYPE_URL}/${task.id}.json`;

      console.log('updateIncidentTypes url =', url);

      const resData = await fetchPUT(url, task);

      console.log('updateIncidentTypes --->', resData);

      dispatch({
        type: UPDATE_INCIDENT_TYPE,
        payload: resData.data,
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
};
