import { fetchGET, fetchPOST, fetchPUT } from '../../utils/NetworkUtils';
import URLConstants from '../../constants/URLConstants';

export const GET_REQUIRED_CDL_ENDORSEMENTS = 'GET_REQUIRED_CDL_ENDORSEMENTS';
export const GET_REQUIRED_CDL_ENDORSEMENTS_PAGINATION =
  'GET_REQUIRED_CDL_ENDORSEMENTS_PAGINATION';
export const POST_REQUIRED_CDL_ENDORSEMENTS = 'POST_REQUIRED_CDL_ENDORSEMENTS';
export const GET_REQUIRED_CDL_ENDORSEMENT = 'GET_REQUIRED_CDL_ENDORSEMENT';
export const UPDATE_REQUIRED_CDL_ENDORSEMENT =
  'UPDATE_REQUIRED_CDL_ENDORSEMENT';

export const loadRequiredCdlEndorsement = (
  page = 1,
  search = '',
  sort,
  direction
) => {
  return async (dispatch) => {
    try {
      let url = `${URLConstants.REQUIRED_CDL_ENDORSEMENTS_URL}?limit=10&page=${page}&sort=${sort}&direction=${direction}`;

      if (search !== undefined && search !== '') {
        url = `${url}&search=${search}`;
      }

      console.log('loadRequiredCdlEndorsement url =', url);

      const resData = await fetchGET(url);

      console.log('loadRequiredCdlEndorsement --->', resData);

      dispatch({
        type: GET_REQUIRED_CDL_ENDORSEMENTS,
        payload: resData.data,
      });

      dispatch({
        type: GET_REQUIRED_CDL_ENDORSEMENTS_PAGINATION,
        payload: resData.pagination,
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
};

export const addRequiredCdlEndorsement = (taskUser) => {
  return async (dispatch) => {
    try {
      const url = URLConstants.REQUIRED_CDL_ENDORSEMENTS_URL;

      console.log('addRequiredCdlEndorsement url =', url);

      const resData = await fetchPOST(url, taskUser);

      console.log('addRequiredCdlEndorsement --->', resData);

      dispatch({
        type: POST_REQUIRED_CDL_ENDORSEMENTS,
        payload: resData.data,
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
};

export const getRequiredCdlEndorsement = (id) => {
  return async (dispatch) => {
    try {
      const url = `${URLConstants.GET_REQUIRED_CDL_ENDORSEMENT_URL}/${id}.json`;

      console.log('getRequiredCdlEndorsement url =', url);

      const resData = await fetchGET(url);

      console.log('getRequiredCdlEndorsement --->', resData);

      dispatch({
        type: GET_REQUIRED_CDL_ENDORSEMENT,
        payload: resData.data,
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
};

export const updateRequiredCdlEndorsement = (taskUser) => {
  return async (dispatch) => {
    try {
      const url = `${URLConstants.GET_REQUIRED_CDL_ENDORSEMENT_URL}/${taskUser.id}.json`;

      console.log('updateRequiredCdlEndorsement url =', url);

      const resData = await fetchPUT(url, taskUser);

      console.log('updateRequiredCdlEndorsement --->', resData);

      dispatch({
        type: UPDATE_REQUIRED_CDL_ENDORSEMENT,
        payload: resData.data,
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
};
