import { fetchGET, fetchPOST, fetchPUT } from '../../utils/NetworkUtils';
import URLConstants from '../../constants/URLConstants';

export const GET_EQUIPMENT_TYPES = 'GET_EQUIPMENT_TYPES';
export const GET_EQUIPMENT_TYPES_PAGINATION = 'GET_EQUIPMENT_TYPES_PAGINATION';
export const POST_EQUIPMENT_TYPES = 'POST_EQUIPMENT_TYPES';
export const GET_EQUIPMENT_TYPE = 'GET_EQUIPMENT_TYPE';
export const UPDATE_EQUIPMENT_TYPE = 'UPDATE_EQUIPMENT_TYPE';

//
export const loadEquipmentTypes = (page = 1, search = '', sort, direction) => {
  return async (dispatch) => {
    try {
      let url = `${URLConstants.EQUIPMENT_TYPES_URL}?limit=10&page=${page}&sort=${sort}&direction=${direction}`;

      if (search !== undefined && search !== '') {
        url = `${url}&search=${search}`;
      }

      console.log('equipmentTypes url =', url);

      const resData = await fetchGET(url);

      console.log('equipmentTypes --->', resData);

      dispatch({
        type: GET_EQUIPMENT_TYPES,
        payload: resData.data,
      });

      dispatch({
        type: GET_EQUIPMENT_TYPES_PAGINATION,
        payload: resData.pagination,
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
};

export const addEquipmentTypes = (task) => {
  return async (dispatch) => {
    try {
      const url = URLConstants.EQUIPMENT_TYPES_URL;

      console.log('addEquipmentTypes url =', url);

      const resData = await fetchPOST(url, task);

      console.log('addEquipmentTypes --->', resData);

      dispatch({
        type: POST_EQUIPMENT_TYPES,
        payload: resData.data,
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
};

export const getEquipmentType = (id) => {
  return async (dispatch) => {
    try {
      const url = `${URLConstants.GET_EQUIPMENT_TYPE_URL}/${id}.json`;

      console.log('getEquipmentType url =', url);

      const resData = await fetchGET(url);

      console.log('getEquipmentType --->', resData);

      dispatch({
        type: GET_EQUIPMENT_TYPE,
        payload: resData.data,
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
};

export const updateEquipmentType = (task) => {
  return async (dispatch) => {
    try {
      const url = `${URLConstants.GET_EQUIPMENT_TYPE_URL}/${task.id}.json`;

      console.log('updateEquipmentType url =', url);

      const resData = await fetchPUT(url, task);

      console.log('updateEquipmentType --->', resData);

      dispatch({
        type: UPDATE_EQUIPMENT_TYPE,
        payload: resData.data,
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
};
