import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
// import {loadDashboardData} from '../../store/actions/dashboad';
import ReactWeather, { useWeatherBit } from 'react-open-weather';
import { toast } from 'react-toastify';
import { Helmet } from 'react-helmet-async';
import { Grid, Link, Typography } from '@mui/material';
import { NavLink } from 'react-router-dom';
import URLConstants from '../../constants/URLConstants';
import { fetchGET } from '../../utils/NetworkUtils';
import SmallBox from '../../components/SmallBox';
import { CustomBreadcrumbs, CustomDivider } from '../../utils/MUIStyle';
// import { KEY_COMPANY_ID } from "../../constants/Constants";

const DashboardDivision = () => {
  const selectedDivision = useSelector((state) => state.auth.selectedDivision);

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
  useEffect(() => {}, []);

  useEffect(() => {
    getLocation();
    console.log(`DashboardDivision useEffect${selectedDivision}`);
    if (selectedDivision !== -1) {
      fetchDashboardData();
    }
  }, [selectedDivision]);

  useEffect(() => {
    // console.log(`data is${JSON.stringify(data)}`);
  }, [data, latitude, longitude]);

  const fetchDashboardData = async () => {
    // await dispatch(loadDashboardData());
    // const localCompanyId = localStorage.getItem(KEY_COMPANY_ID);
    try {
      const url = `${URLConstants.GET_DASHBOARD_DATA_URL}/division.json?division_id=${selectedDivision}`;
      const response = await fetchGET(url);
      setDashboard(response.data);
    } catch (error) {
      toast(error.message || 'Failed');
    }
  };
  return (
    <>
      <Helmet title="Dashboard" />

      <Grid justifyContent="space-between" container spacing={10}>
        <Grid item>
          <Typography variant="h3" gutterBottom display="inline">
            Division Dashboard
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
                type="success"
                icon="ion-stats-bars"
                count={dashboard !== null ? dashboard.employee_count : 0}
                title="Employees"
                navigateTo="/private/employees"
                showlink="off"
              />
            </div>
            <div className="col-lg-3 col-6">
              <SmallBox
                type="danger"
                icon="ion-stats-bars"
                count={dashboard !== null ? dashboard.client_count : 0}
                title="Clients"
                navigateTo="/private/clients"
                showlink="off"
              />
            </div>
            <div className="col-lg-3 col-6">
              <SmallBox
                type="info"
                icon="ion-stats-bars"
                count={dashboard !== null ? dashboard.job_site_count : 0}
                title="Projects"
                navigateTo="/private/job-sites"
                showlink="off"
              />
            </div>
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
                type="info"
                icon="ion-stats-bars"
                count={dashboard !== null ? dashboard.incident_count : 0}
                title="Create An Incident"
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

export default DashboardDivision;
