/* eslint-disable default-param-last */
import { fetchGET } from '../../utils/NetworkUtils';
import { KEY_TYPE_ID } from '../../constants/Constants';
import URLConstants from '../../constants/URLConstants';

export const GET_DASHBOARD_DATA = 'GET_DASHBOARD_DATA';

export const loadDashboardData = (
  companyId = -1,
  divisionId = -1,
  jobSiteId = -1
) => {
  return async (dispatch) => {
    try {
      const typeId = localStorage.getItem(KEY_TYPE_ID);
      let url = `${URLConstants.GET_DASHBOARD_DATA_URL}.json?type_id=${typeId}`;

      if (companyId !== -1) url = `${url}&company_id=${companyId}`;
      if (divisionId !== -1) url = `${url}&division_id=${divisionId}`;
      if (jobSiteId !== -1) url = `${url}&job_site_id=${jobSiteId}`;

      const resData = await fetchGET(url);

      if (resData.data.error_code !== undefined) {
        throw new Error(resData.data.error_message);
      }
      console.log('GET URL', url);
      console.log('Company ID', companyId);
      console.log('loadAddresses --->', resData);

      dispatch({
        type: GET_DASHBOARD_DATA,
        payload: resData.data,
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
};
