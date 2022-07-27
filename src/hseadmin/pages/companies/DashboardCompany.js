import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import URLConstants from '../../constants/URLConstants';
import { fetchGET } from '../../utils/NetworkUtils';
import SmallBox from '../../components/SmallBox';

const DashboardCompany = (props) => {
  const { companyId } = props;
  const [dashboard, setDashboard] = useState(null);
  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const url = `${URLConstants.GET_DASHBOARD_DATA_URL}/company.json?company_id=${companyId}`;
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
      {/* <p>Dashboard Company</p> */}

      {/* <h5 className="mb-2 mt-4">Dashboard</h5> */}
      <div className="row" style={{ marginTop: '10px' }}>
        {/* /!* Companies *!/ */}
        {/* <div className="col-lg-3 col-6"> */}
        {/*  <SmallBox */}
        {/*      type="info" */}
        {/*      icon="ion-stats-bars" */}
        {/*      count={dashboard !== null ? dashboard.company_count : 0} */}
        {/*      title="Companies" */}
        {/*      navigateTo="/companies" */}
        {/*  /> */}
        {/* </div> */}
        {/* Locations */}
        <div className="col-lg-3 col-6">
          <SmallBox
            type="success"
            icon="ion-stats-bars"
            count={dashboard !== null ? dashboard.division_count : 0}
            title="Divisions"
            // navigateTo="/private/divisions"
            navigateTo="#"
            showlink="off"
          />
        </div>
        {/* Clients */}
        <div className="col-lg-3 col-6">
          <SmallBox
            type="danger"
            icon="ion-stats-bars"
            count={dashboard !== null ? dashboard.client_count : 0}
            title="Clients"
            // navigateTo="/private/clients"
            navigateTo="#"
            showlink="off"
          />
        </div>
        {/* Job Sites */}
        <div className="col-lg-3 col-6">
          <SmallBox
            type="info"
            icon="ion-stats-bars"
            count={dashboard !== null ? dashboard.job_site_count : 0}
            title="Projects"
            // navigateTo="/private/job-sites"
            navigateTo="#"
            showlink="off"
          />
        </div>
        {/* Employees */}
        <div className="col-lg-3 col-6">
          <SmallBox
            type="success"
            icon="ion-stats-bars"
            count={dashboard !== null ? dashboard.employee_count : 0}
            title="Employees"
            // navigateTo="/private/employees"
            navigateTo="#"
            showlink="off"
          />
        </div>
        {/* Certificates */}
        <div className="col-lg-3 col-6">
          <SmallBox
            type="warning"
            icon="ion-stats-bars"
            count={dashboard !== null ? dashboard.certificate_count : 0}
            title="Certificates"
            // navigateTo="/private/certificates"
            navigateTo="#"
            showlink="off"
          />
        </div>
      </div>
    </div>
  );
};

export default DashboardCompany;
