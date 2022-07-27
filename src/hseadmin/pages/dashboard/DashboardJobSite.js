import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import ReactWeather, { useWeatherBit } from 'react-open-weather';
import { Helmet } from 'react-helmet-async';
import { Grid, Link, Typography } from '@mui/material';
import { NavLink } from 'react-router-dom';

import SmallBox from '../../components/SmallBox';
import { CustomBreadcrumbs, CustomDivider } from '../../utils/MUIStyle';
import { KEY_COMPANY_ID, KEY_TYPE_ID } from '../../constants/Constants';
import URLConstants from '../../constants/URLConstants';
import { fetchGET } from '../../utils/NetworkUtils';

const DashboardJobSite = () => {
  console.log('DashboardJobSite');
  const localCompanyId = localStorage.getItem(KEY_COMPANY_ID);
  const localDivisionId = useSelector((state) => state.auth.selectedDivision);
  const localJobSiteId = useSelector((state) => state.auth.selectedJobSite);

  const [latitude, setLatitude] = useState('32.779167');
  const [longitude, setLongitude] = useState('-96.808891');
  const [locationEnabled, setLocationEnabled] = useState(false);
  const { data, isLoading, errorMessage } = useWeatherBit({
    key: '3c5bc5aa68a94e4baf90ad87cc2ddcb6',
    lat: latitude,
    lon: longitude,
    lang: 'en',
    unit: 'imperial', // values are (metric, standard, imperial)
  });

  const getLocation = () => {
    if (!navigator.geolocation) {
      console.log('ashish', 'Geolocation is not supported by your browser');
      // setStatus('Geolocation is not supported by your browser');
    } else {
      console.log('ashish', 'Locating');
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // setStatus(null);
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
          setLocationEnabled(true);
        },
        (positionError) => {
          console.log('ashish', 'Error', positionError);
          setLocationEnabled(false);
          // setStatus('Unable to retrieve your location');
        }
      );
    }
  };

  const [dashboard, setDashboard] = useState(null);
  useEffect(() => {
    getLocation();
    fetchDashboardData();
  }, []);

  useEffect(() => {
    console.log(`data is${JSON.stringify(data)}`);
    console.log('latitude', latitude);
    console.log('longitude', longitude);
  }, [data, latitude, longitude]);

  const fetchDashboardData = async () => {
    try {
      const typeId = localStorage.getItem(KEY_TYPE_ID);
      let url = `${URLConstants.GET_DASHBOARD_DATA_URL}.json?type_id=${typeId}`;

      if (localCompanyId !== null) url = `${url}&company_id=${localCompanyId}`;
      if (localDivisionId !== -1) url = `${url}&division_id=${localDivisionId}`;
      if (localJobSiteId !== -1) url = `${url}&job_site_id=${localJobSiteId}`;

      const resData = await fetchGET(url);

      if (resData.data.error_code !== undefined) {
        throw new Error(resData.data.error_message);
      }
      setDashboard(resData.data);
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <>
      <Helmet title="Dashboard" />

      <Grid justifyContent="space-between" container spacing={10}>
        <Grid item>
          <Typography variant="h3" gutterBottom display="inline">
            Project Dashboard
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
            <div className="col-lg-3 col-6">
              <SmallBox
                type="info"
                icon="ion-stats-bars"
                count="Coming Soon"
                title="TRIR"
                navigateTo="/"
                subTitle="(Last 12 Months)"
                showlink="off"
              />
            </div>
            <div className="col-lg-3 col-6">
              <SmallBox
                type="success"
                icon="ion-stats-bars"
                count="Coming Soon"
                title="DART"
                navigateTo="/"
                subTitle="(Last 12 Months)"
                showlink="off"
              />
            </div>
            <div className="col-lg-3 col-6">
              <SmallBox
                type="danger"
                icon="ion-stats-bars"
                count="Coming Soon"
                // count={dashboard !== null ? dashboard.inspection_count : 0}
                title="Inspections Completed"
                navigateTo="/private/inspections"
                subTitle="(Last 30 Days, MTD, etc.)"
                showlink="off"
              />
            </div>
            {/* <div className="col-lg-3 col-6"> */}
            {/*  <SmallBox */}
            {/*    type="info" */}
            {/*    icon="ion-stats-bars" */}
            {/*    count={10} */}
            {/*    title="Upcoming Trainings" */}
            {/*    navigateTo="/" */}
            {/*    subTitle="" */}
            {/*  /> */}
            {/* </div> */}
            {/* <div className="col-lg-3 col-6"> */}
            {/*  <SmallBox */}
            {/*    type="success" */}
            {/*    icon="ion-stats-bars" */}
            {/*    count={0} */}
            {/*    title="Actions Items" */}
            {/*    navigateTo="/" */}
            {/*    subTitle="" */}
            {/*  /> */}
            {/* </div> */}
            <div className="col-lg-3 col-6">
              <SmallBox
                type="warning"
                icon="ion-stats-bars"
                count={dashboard !== null ? dashboard.job_site_audit_count : 0}
                title="Perform Job Site Audit"
                navigateTo="/private/job-site-audit-reports/1"
                showlink="off"
              />
            </div>
            <div className="col-lg-3 col-6">
              <SmallBox
                type="info"
                icon="ion-stats-bars"
                count={dashboard !== null ? dashboard.equipment_count : 0}
                title="Perform Equipment Audit"
                navigateTo="/private/equipment-audit-reports/2"
                showlink="off"
              />
            </div>
            <div className="col-lg-3 col-6">
              <SmallBox
                type="warning"
                icon="ion-stats-bars"
                count={dashboard !== null ? dashboard.incident_count : 0}
                title="Create An Incidents"
                navigateTo="/private/incidents/add"
                showlink="off"
              />
            </div>
          </div>
          {locationEnabled && (
            <>
              <Grid justifyContent="space-between" container spacing={10}>
                <Grid item>
                  <Typography variant="h3" gutterBottom display="inline">
                    Weather Report
                  </Typography>

                  <CustomBreadcrumbs aria-label="Breadcrumb" mt={2}>
                    {/* <Link component={NavLink} to="/private/dashboard"> */}
                    {/*  Dashboard */}
                    {/* </Link> */}
                  </CustomBreadcrumbs>
                </Grid>
              </Grid>
              <div className="row">
                <div className="col-lg-12 col-12">
                  <ReactWeather
                    isLoading={isLoading}
                    errorMessage={errorMessage}
                    data={data}
                    lang="en"
                    locationLabel={data !== null ? data.location : 'Loading...'}
                    unitsLabels={{ temperature: 'ºF', windSpeed: 'mph' }}
                    showForecast
                  />
                </div>
              </div>
            </>
          )}
        </Grid>
      </Grid>
    </>
  );
};

export default DashboardJobSite;
