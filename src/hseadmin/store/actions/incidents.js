import { fetchGET, fetchPOST, fetchPUT } from '../../utils/NetworkUtils';
import URLConstants from '../../constants/URLConstants';

export const GET_INCIDENTS = 'GET_INCIDENTS';
export const GET_INCIDENTS_PAGINATION = 'GET_INCIDENTS_PAGINATION';
export const POST_INCIDENTS = 'POST_INCIDENTS';
export const GET_INCIDENT = 'GET_INCIDENT';
export const UPDATE_INCIDENT = 'UPDATE_INCIDENT';
// export const RESET_COMPANY = 'RESET_COMPANY';

export const loadIncidents = (
  page = 1,
  search = '',
  sort,
  direction,
  limit = 10
) => {
  return async (dispatch) => {
    try {
      let url = `${URLConstants.INCIDENTS_URL}?limit=${limit}&page=${page}&sort=${sort}&direction=${direction}`;

      if (search !== undefined && search !== '') {
        url = `${url}&search=${search}`;
      }
      const resData = await fetchGET(url);

      // console.log('loadAnswers --->', resData);

      dispatch({
        type: GET_INCIDENTS,
        payload: resData.data,
      });

      dispatch({
        type: GET_INCIDENTS_PAGINATION,
        payload: resData.pagination,
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
};

export const addIncidents = (incident) => {
  return async (dispatch) => {
    try {
      const url = URLConstants.INCIDENTS_URL;

      console.log('addIncidents url =', url);

      const resData = await fetchPOST(url, incident);

      console.log('addIncidents --->', resData);

      dispatch({
        type: POST_INCIDENTS,
        payload: resData.data,
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
};

export const getIncident = (id) => {
  return async (dispatch) => {
    try {
      const url = `${URLConstants.GET_INCIDENT_URL}/${id}.json`;

      console.log('getIncident url =', url);

      const resData = await fetchGET(url);

      console.log('getIncident --->', resData);

      dispatch({
        type: GET_INCIDENTS,
        payload: resData.data,
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
};

export const updateIncident = (incident) => {
  return async (dispatch) => {
    try {
      const url = `${URLConstants.GET_ANSWER_URL}/${incident.id}.json`;

      console.log('updateIncident url =', url);

      const resData = await fetchPUT(url, incident);
      console.log('updateIncident --->', resData);

      dispatch({
        type: UPDATE_INCIDENT,
        payload: resData.data,
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
};
