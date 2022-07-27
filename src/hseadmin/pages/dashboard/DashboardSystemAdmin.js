import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useWeatherBit } from 'react-open-weather';
import { Helmet } from 'react-helmet-async';
import { Grid, Link, Typography } from '@mui/material';
import { NavLink } from 'react-router-dom';
import { CustomBreadcrumbs, CustomDivider } from '../../utils/MUIStyle';
import SmallBox from '../../components/SmallBox';
import { loadDashboardData } from '../../store/actions/dashboad';

const DashboardSystemAdmin = () => {
  const { data } = useWeatherBit({
    key: '1b89ebfcfeb34ce3b3683aeb7ac7ba88',
    lat: '32.779167',
    lon: '-96.808891',
    lang: 'en',
    unit: 'metric', // values are (metric, standard, imperial)
  });
  const dispatch = useDispatch();
  const dashboard = useSelector((state) => {
    return state.dashboardReducer.dashboard;
  });
  useEffect(() => {
    fetchDashboardData();
  }, []);

  useEffect(() => {
    // console.log(`data is${JSON.stringify(data)}`);
  }, [data]);

  const fetchDashboardData = async () => {
    await dispatch(loadDashboardData());
  };
  return (
    <>
      <Helmet title="Dashboard" />

      <Grid justifyContent="space-between" container spacing={10}>
        <Grid item>
          <Typography variant="h3" gutterBottom display="inline">
            System Dashboard
          </Typography>

          <CustomBreadcrumbs aria-label="Breadcrumb" mt={2}>
            <Link component={NavLink} to="/private/dashboard">
              Dashboard
            </Link>
          </CustomBreadcrumbs>
        </Grid>
      </Grid>

      <CustomDivider my={6} />
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <div className="row" style={{ marginTop: '10px' }}>
            {/* Companies */}
            <div className="col-lg-3 col-6">
              <SmallBox
                type="info"
                icon="ion-stats-bars"
                count={dashboard !== null ? dashboard.company_count : 0}
                title="Companies"
                navigateTo="/private/companies"
              />
            </div>
            {/* Locations */}
            <div className="col-lg-3 col-6">
              <SmallBox
                type="success"
                icon="ion-stats-bars"
                count={dashboard !== null ? dashboard.division_count : 0}
                title="Divisions"
                navigateTo="/private/divisions"
              />
            </div>
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
            {/* Projects */}
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
        </Grid>
      </Grid>
    </>
  );
};

export default DashboardSystemAdmin;
