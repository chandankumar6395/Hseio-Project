import { fetchGET, fetchPOST, fetchPUT } from '../../utils/NetworkUtils';
import URLConstants from '../../constants/URLConstants';

export const GET_INCIDENT_INJURIES = 'GET_INCIDENT_INJURIES';
export const GET_INCIDENT_INJURIES_PAGINATION =
  'GET_INCIDENT_INJURIES_PAGINATION';
export const POST_INCIDENT_INJURIES = 'POST_INCIDENT_INJURIES';
export const GET_INCIDENT_INJURIE = 'GET_INCIDENT_INJURIE';
export const UPDATE_INCIDENT_INJURIE = 'UPDATE_INCIDENT_INJURIE';
// export const RESET_COMPANY = 'RESET_COMPANY';

export const loadIncidentInjuries = (
  page = 1,
  search = '',
  sort,
  direction,
  limit = 10
) => {
  return async (dispatch) => {
    try {
      let url = `${URLConstants.INCIDENTS_INJURIES_URL}?limit=${limit}&page=${page}&sort=${sort}&direction=${direction}`;

      if (search !== undefined && search !== '') {
        url = `${url}&search=${search}`;
      }
      const resData = await fetchGET(url);

      // console.log('loadAnswers --->', resData);

      dispatch({
        type: GET_INCIDENT_INJURIES,
        payload: resData.data,
      });

      dispatch({
        type: GET_INCIDENT_INJURIES_PAGINATION,
        payload: resData.pagination,
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
};

export const addIncidentInjuries = (incidentInjuries) => {
  return async (dispatch) => {
    try {
      const url = URLConstants.INCIDENTS_INJURIES_URL;

      console.log('addIncidentInjuries url =', url);

      const resData = await fetchPOST(url, incidentInjuries);

      console.log('addIncidentInjuries --->', resData);

      dispatch({
        type: POST_INCIDENT_INJURIES,
        payload: resData.data,
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
};

export const getIncidentInjuries = (id) => {
  return async (dispatch) => {
    try {
      const url = `${URLConstants.GET_INCIDENTS_INJURIES_URL}/${id}.json`;

      console.log('getIncidentInjuries url =', url);

      const resData = await fetchGET(url);

      console.log('getIncidentInjuries --->', resData);

      dispatch({
        type: GET_INCIDENT_INJURIE,
        payload: resData.data,
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
};

export const updateIncidentInjuries = (incident) => {
  return async (dispatch) => {
    try {
      const url = `${URLConstants.GET_INCIDENTS_INJURIES_URL}/${incident.id}.json`;

      console.log('updateIncidentInjuries url =', url);

      const resData = await fetchPUT(url, incident);
      console.log('updateIncidentInjuries --->', resData);

      dispatch({
        type: UPDATE_INCIDENT_INJURIE,
        payload: resData.data,
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
};
