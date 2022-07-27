import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ReactWeather, { useWeatherBit } from 'react-open-weather';
import { Grid, Typography } from '@mui/material';
import { loadDashboardData } from '../../store/actions/dashboad';
import SmallBox from '../../components/SmallBox';
import { CustomBreadcrumbs } from '../../utils/MUIStyle';

const DashboardJobSite = () => {
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

  const dispatch = useDispatch();
  const dashboard = useSelector((state) => {
    return state.dashboardReducer.dashboard;
  });
  useEffect(() => {
    fetchDashboardData();
    getLocation();
  }, []);

  useEffect(() => {
    // console.log(`data is${JSON.stringify(data)}`);
  }, [data, latitude, longitude]);

  const fetchDashboardData = async () => {
    await dispatch(loadDashboardData());
  };
  return (
    <div className="container-fluid">
      {/* =========================================================== */}
      {/* Small Box (Stat card) */}
      {/* <p>Dashboard Job Site</p> */}

      {/* <h5 className="mb-2 mt-4">Dashboard</h5> */}
      <div className="row" style={{ marginTop: '10px' }}>
        <div className="col-lg-3 col-6">
          <SmallBox
            type="info"
            icon="ion-stats-bars"
            count={0}
            title="TRIR"
            navigateTo="/"
            subTitle="(Last 12 Months)"
          />
        </div>
        <div className="col-lg-3 col-6">
          <SmallBox
            type="success"
            icon="ion-stats-bars"
            count={0}
            title="DART"
            navigateTo="/"
            subTitle="(Last 12 Months)"
          />
        </div>
        <div className="col-lg-3 col-6">
          <SmallBox
            type="warning"
            icon="ion-stats-bars"
            count={0}
            title="Incidents"
            navigateTo="/"
            subTitle="(Last 30 Days)"
          />
        </div>
        <div className="col-lg-3 col-6">
          <SmallBox
            type="danger"
            icon="ion-stats-bars"
            count={dashboard !== null ? dashboard.client_count : 0}
            title="Inceptions Completed"
            navigateTo="/"
            subTitle="(Last 30 Days, MTD, etc.)"
          />
        </div>
        <div className="col-lg-3 col-6">
          <SmallBox
            type="info"
            icon="ion-stats-bars"
            count={10}
            title="Upcoming Trainings"
            navigateTo="/"
            subTitle=""
          />
        </div>
        <div className="col-lg-3 col-6">
          <SmallBox
            type="success"
            icon="ion-stats-bars"
            count={0}
            title="Actions Items"
            navigateTo="/"
            subTitle=""
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
    </div>
  );
};

export default DashboardJobSite;
