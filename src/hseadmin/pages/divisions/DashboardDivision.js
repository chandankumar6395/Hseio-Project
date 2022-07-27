import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import URLConstants from '../../constants/URLConstants';
import { fetchGET } from '../../utils/NetworkUtils';
import SmallBox from '../../components/SmallBox';

const DashboardDivision = (props) => {
  const { companyId, divisionId } = props;

  const [dashboard, setDashboard] = useState(null);
  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const url = `${URLConstants.GET_DASHBOARD_DATA_URL}/division.json?company_id=${companyId}&division_id=${divisionId}`;
      const response = await fetchGET(url);
      setDashboard(response.data);
    } catch (error) {
      toast(error.message || 'Failed');
    }
  };
  return (
    <div className="container-fluid">
      {/* =========================================================== */}
      {/* Small Box (Stat card) */}
      {/* <p>Dashboard Division</p> */}

      {/* <h5 className="mb-2 mt-4">Dashboard</h5> */}
      <div className="row" style={{ marginTop: '10px' }}>
        {/* Clients */}
        <div className="col-lg-3 col-6">
          <SmallBox
            type="danger"
            icon="ion-stats-bars"
            count={dashboard !== null ? dashboard.client_count : 0}
            title="Clients"
            navigateTo="/private/clients"
          />
        </div>
        {/* Job Sites */}
        <div className="col-lg-3 col-6">
          <SmallBox
            type="info"
            icon="ion-stats-bars"
            count={dashboard !== null ? dashboard.job_site_count : 0}
            title="Projects"
            navigateTo="/private/job-sites"
          />
        </div>
        {/* Employees */}
        <div className="col-lg-3 col-6">
          <SmallBox
            type="success"
            icon="ion-stats-bars"
            count={dashboard !== null ? dashboard.employee_count : 0}
            title="Employees"
            navigateTo="/private/employees"
          />
        </div>
        {/* Certificates */}
        <div className="col-lg-3 col-6">
          <SmallBox
            type="warning"
            icon="ion-stats-bars"
            count={dashboard !== null ? dashboard.certificate_count : 0}
            title="Certificates"
            navigateTo="/private/certificates"
          />
        </div>
      </div>
    </div>
  );
};

export default DashboardDivision;
