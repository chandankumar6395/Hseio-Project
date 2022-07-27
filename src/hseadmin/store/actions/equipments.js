import { fetchGET, fetchPOST, fetchPUT } from '../../utils/NetworkUtils';
import URLConstants from '../../constants/URLConstants';

export const GET_EQUIPMENTS = 'GET_EQUIPMENTS';
export const GET_EQUIPMENTS_PAGINATION = 'GET_EQUIPMENTS_PAGINATION';
export const POST_EQUIPMENTS = 'POST_EQUIPMENTS';
export const GET_EQUIPMENT = 'GET_EQUIPMENT';
export const UPDATE_EQUIPMENT = 'UPDATE_EQUIPMENT';

//
export const loadEquipments = (page = 1, search = '', sort, direction) => {
  return async (dispatch) => {
    try {
      let url = `${URLConstants.EQUIPMENTS_URL}?limit=10&page=${page}&sort=${sort}&direction=${direction}`;

      if (search !== undefined && search !== '') {
        url = `${url}&search=${search}`;
      }

      console.log('equipments url =', url);

      const resData = await fetchGET(url);

      console.log('equipments --->', resData);

      dispatch({
        type: GET_EQUIPMENTS,
        payload: resData.data,
      });

      dispatch({
        type: GET_EQUIPMENTS_PAGINATION,
        payload: resData.pagination,
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
};

export const addEquipments = (task) => {
  return async (dispatch) => {
    try {
      const url = URLConstants.EQUIPMENTS_URL;

      console.log('addEquipments url =', url);

      const resData = await fetchPOST(url, task);

      console.log('addEquipments --->', resData);

      dispatch({
        type: POST_EQUIPMENTS,
        payload: resData.data,
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
};

export const getEquipment = (id) => {
  return async (dispatch) => {
    try {
      const url = `${URLConstants.GET_EQUIPMENT_URL}/${id}.json`;

      console.log('getEquipment url =', url);

      const resData = await fetchGET(url);

      console.log('getEquipment --->', resData);

      dispatch({
        type: GET_EQUIPMENT,
        payload: resData.data,
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
};

export const updateEquipment = (task) => {
  return async (dispatch) => {
    try {
      const url = `${URLConstants.GET_EQUIPMENT_URL}/${task.id}.json`;

      console.log('updateEquipment url =', url);

      const resData = await fetchPUT(url, task);

      console.log('updateEquipment --->', resData);

      dispatch({
        type: UPDATE_EQUIPMENT,
        payload: resData.data,
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
};
