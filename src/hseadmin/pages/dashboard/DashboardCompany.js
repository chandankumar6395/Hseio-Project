import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Helmet } from 'react-helmet-async';
import {
  Card as MuiCard,
  CardContent,
  Grid as MuiGrid,
  Typography,
} from '@mui/material';
import { NavLink } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import ReactWeather, { useWeatherBit } from 'react-open-weather';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBuilding } from '@fortawesome/free-regular-svg-icons';
import styled from '@emotion/styled';
import { spacing } from '@mui/system';
import { loadDashboardData } from '../../store/actions/dashboad';
import SmallBox from '../../components/SmallBox';
import { CustomBreadcrumbs } from '../../utils/MUIStyle';
// import CustomTopSection from '../../components/CustomTopSection';
// import CustomCompanyProfile from '../../components/CustomCompanyProfile';
import { getCompany } from '../../store/actions/companies';
import { KEY_COMPANY_ID } from '../../constants/Constants';
import CustomPhoneNumberView from '../../components/CustomPhoneNumberView';
// import CustomPhoneNumberView from '../../components/CustomPhoneNumberView';
const Spacer = styled.div(spacing);

// const Typography = styled(MuiTypography)(spacing);

const Grid = styled(MuiGrid)(spacing);

const Card = styled(MuiCard)(spacing);
const DashboardCompany = () => {
  const localCompanyId = localStorage.getItem(KEY_COMPANY_ID);
  const dispatch = useDispatch();
  const dashboard = useSelector((state) => {
    return state.dashboardReducer.dashboard;
  });
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
  const company = useSelector((state) => state.company.company);
  useEffect(() => {
    fetchDashboardData();
    getLocation();
  }, []);

  useEffect(() => {
    console.log(`data is${JSON.stringify(data)}`);
    console.log('latitude', latitude);
    console.log('longitude', longitude);
  }, [data, latitude, longitude]);

  const fetchDashboardData = async () => {
    await dispatch(loadDashboardData());
    await dispatch(getCompany(localCompanyId));
  };
  return (
    <>
      <Helmet title="Dashboard" />

      {/* <Grid justifyContent="space-between" container spacing={10}> */}
      {/*  <Grid item> */}
      {/*    <Typography variant="h3" gutterBottom display="inline"> */}
      {/*      Company Dashboard */}
      {/*    </Typography> */}

      {/*    <CustomBreadcrumbs aria-label="Breadcrumb" mt={2}> */}
      {/*      <Link component={NavLink} to="/private/dashboard"> */}
      {/*        Dashboard */}
      {/*      </Link> */}
      {/*    </CustomBreadcrumbs> */}
      {/*  </Grid> */}
      {/* </Grid> */}

      {/* <CustomDivider my={6} /> */}
      <div className="row gutters-sm">
        {company && (
          <div className="col-md-12 mb-3">
            <div className="card">
              <div className="card-body">
                <div className="d-flex flex-column text-center">
                  <div>
                    {company.primary_logo !== null ? (
                      <img
                        width={150}
                        // className="img-circle elevation-2"
                        src={company.primary_logo.url}
                        alt="User Avatar"
                        style={{}}
                      />
                    ) : (
                      // <i className="fas fa-building fa-4x" />
                      <FontAwesomeIcon icon={faBuilding} size="4x" />
                    )}
                    <div className="mt-3">
                      <h4>{company.name}</h4>
                      {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                      <a href={`https://${company.website_url}`}>
                        {company.website_url}
                      </a>
                      {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                      <a className="text-muted font-size-sm">
                        {company.email_address}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* <div className="card mt-3"> */}
            {/*  <ul className="list-group list-group-flush"> */}
            {/*    /!* <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap"> *!/ */}
            {/*    /!*  <h6 className="mb-0"> *!/ */}
            {/*    /!*    <svg *!/ */}
            {/*    /!*      xmlns="http://www.w3.org/2000/svg" *!/ */}
            {/*    /!*      width="24" *!/ */}
            {/*    /!*      height="24" *!/ */}
            {/*    /!*      viewBox="0 0 24 24" *!/ */}
            {/*    /!*      fill="none" *!/ */}
            {/*    /!*      stroke="currentColor" *!/ */}
            {/*    /!*      strokeWidth="2" *!/ */}
            {/*    /!*      strokeLinecap="round" *!/ */}
            {/*    /!*      strokeLinejoin="round" *!/ */}
            {/*    /!*      className="feather feather-globe mr-2 icon-inline" *!/ */}
            {/*    /!*    > *!/ */}
            {/*    /!*      <circle cx="12" cy="12" r="10" /> *!/ */}
            {/*    /!*      <line x1="2" y1="12" x2="22" y2="12" /> *!/ */}
            {/*    /!*      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" /> *!/ */}
            {/*    /!*    </svg> *!/ */}
            {/*    /!*    Website *!/ */}
            {/*    /!*  </h6> *!/ */}
            {/*    /!*  <span className="text-secondary">{company.website_url}</span> *!/ */}
            {/*    /!* </li> *!/ */}
            {/*    /!* <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap"> *!/ */}
            {/*    /!*  <h6 className="mb-0"> *!/ */}
            {/*    /!*    <svg *!/ */}
            {/*    /!*      xmlns="http://www.w3.org/2000/svg" *!/ */}
            {/*    /!*      width="24" *!/ */}
            {/*    /!*      height="24" *!/ */}
            {/*    /!*      viewBox="0 0 24 24" *!/ */}
            {/*    /!*      fill="none" *!/ */}
            {/*    /!*      stroke="currentColor" *!/ */}
            {/*    /!*      strokeWidth="2" *!/ */}
            {/*    /!*      strokeLinecap="round" *!/ */}
            {/*    /!*      strokeLinejoin="round" *!/ */}
            {/*    /!*      className="feather feather-github mr-2 icon-inline" *!/ */}
            {/*    /!*    > *!/ */}
            {/*    /!*      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" /> *!/ */}
            {/*    /!*    </svg> *!/ */}
            {/*    /!*    About Us *!/ */}
            {/*    /!*  </h6> *!/ */}
            {/*    /!*  <span className="text-secondary">{item.about_us_url}</span> *!/ */}
            {/*    /!* </li> *!/ */}
            {/*    /!* <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap"> *!/ */}
            {/*    /!*  <h6 className="mb-0"> *!/ */}
            {/*    /!*    <svg *!/ */}
            {/*    /!*      xmlns="http://www.w3.org/2000/svg" *!/ */}
            {/*    /!*      width="24" *!/ */}
            {/*    /!*      height="24" *!/ */}
            {/*    /!*      viewBox="0 0 24 24" *!/ */}
            {/*    /!*      fill="none" *!/ */}
            {/*    /!*      stroke="currentColor" *!/ */}
            {/*    /!*      strokeWidth="2" *!/ */}
            {/*    /!*      strokeLinecap="round" *!/ */}
            {/*    /!*      strokeLinejoin="round" *!/ */}
            {/*    /!*      className="feather feather-globe mr-2 icon-inline" *!/ */}
            {/*    /!*    > *!/ */}
            {/*    /!*      <circle cx="12" cy="12" r="10" /> *!/ */}
            {/*    /!*      <line x1="2" y1="12" x2="22" y2="12" /> *!/ */}
            {/*    /!*      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" /> *!/ */}
            {/*    /!*    </svg> *!/ */}
            {/*    /!*    Privacy Policy *!/ */}
            {/*    /!*  </h6> *!/ */}
            {/*    /!*  <span className="text-secondary"> *!/ */}
            {/*    /!*    {item.privacy_policy_url} *!/ */}
            {/*    /!*  </span> *!/ */}
            {/*    /!* </li> *!/ */}
            {/*    /!* <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap"> *!/ */}
            {/*    /!*  <h6 className="mb-0"> *!/ */}
            {/*    /!*    <svg *!/ */}
            {/*    /!*      xmlns="http://www.w3.org/2000/svg" *!/ */}
            {/*    /!*      width="24" *!/ */}
            {/*    /!*      height="24" *!/ */}
            {/*    /!*      viewBox="0 0 24 24" *!/ */}
            {/*    /!*      fill="none" *!/ */}
            {/*    /!*      stroke="currentColor" *!/ */}
            {/*    /!*      strokeWidth="2" *!/ */}
            {/*    /!*      strokeLinecap="round" *!/ */}
            {/*    /!*      strokeLinejoin="round" *!/ */}
            {/*    /!*      className="feather feather-globe mr-2 icon-inline" *!/ */}
            {/*    /!*    > *!/ */}
            {/*    /!*      <circle cx="12" cy="12" r="10" /> *!/ */}
            {/*    /!*      <line x1="2" y1="12" x2="22" y2="12" /> *!/ */}
            {/*    /!*      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" /> *!/ */}
            {/*    /!*    </svg> *!/ */}
            {/*    /!*    Terms & Conditions *!/ */}
            {/*    /!*  </h6> *!/ */}
            {/*    /!*  <span className="text-secondary"> *!/ */}
            {/*    /!*    {item.terms_and_condition_url} *!/ */}
            {/*    /!*  </span> *!/ */}
            {/*    /!* </li> *!/ */}
            {/*  </ul> */}
            {/* </div> */}
          </div>
        )}
      </div>
      {locationEnabled && (
        <>
          <Grid justifyContent="space-between" container spacing={10}>
            <Grid item>
              {/* <Typography variant="h3" gutterBottom display="inline"> */}
              {/*  Weather Report */}
              {/* </Typography> */}

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
      <Grid container spacing={10}>
        <Grid item xs={12}>
          <div className="row" style={{ marginTop: '30px' }}>
            {/* <div className="col-lg-3 col-6"> */}
            {/*  <SmallBox */}
            {/*    type="success" */}
            {/*    icon="ion-stats-bars" */}
            {/*    count={dashboard !== null ? dashboard.employee_count : 0} */}
            {/*    title="Employees" */}
            {/*    navigateTo="/private/employees" */}
            {/*  /> */}
            {/* </div> */}
            {/* <div className="col-lg-3 col-6"> */}
            {/*  <SmallBox */}
            {/*    type="warning" */}
            {/*    icon="ion-stats-bars" */}
            {/*    count={dashboard !== null ? dashboard.certificate_count : 0} */}
            {/*    title="Certificates" */}
            {/*    navigateTo="/private/certificates" */}
            {/*  /> */}
            {/* </div> */}
            {/* <div className="col-lg-3 col-6"> */}
            {/*  <SmallBox */}
            {/*    type="danger" */}
            {/*    icon="ion-stats-bars" */}
            {/*    count={dashboard !== null ? dashboard.client_count : 0} */}
            {/*    title="Clients" */}
            {/*    navigateTo="/private/clients" */}
            {/*  /> */}
            {/* </div> */}
            {/* <div className="col-lg-3 col-6"> */}
            {/*  <SmallBox */}
            {/*    type="info" */}
            {/*    icon="ion-stats-bars" */}
            {/*    count={dashboard !== null ? dashboard.job_site_count : 0} */}
            {/*    title="Projects" */}
            {/*    navigateTo="/private/job-sites" */}
            {/*  /> */}
            {/* </div> */}
            <div className="col-lg-3 col-6">
              <SmallBox
                type="danger"
                icon="ion-stats-bars"
                count={dashboard !== null ? dashboard.job_site_audit_count : 0}
                title="Perform Job Site Audit"
                navigateTo="/private/job-site-audit-reports/1"
              />
            </div>
            <div className="col-lg-3 col-6">
              <SmallBox
                type="warning"
                icon="ion-stats-bars"
                count={dashboard !== null ? dashboard.equipment_count : 0}
                title="Perform Equipment Audit"
                navigateTo="/private/equipment-audit-reports/2"
              />
            </div>
            <div className="col-lg-3 col-6">
              <SmallBox
                type="info"
                icon="ion-stats-bars"
                count={dashboard !== null ? dashboard.incident_count : 0}
                title="Create An Incident"
                navigateTo="/private/incidents/add"
              />
            </div>
          </div>
        </Grid>
      </Grid>

      {company !== undefined && company !== null && (
        <div>
          <section className="content-header">
            <div className="container-fluid">
              <div className="row mb-1 mt-0">
                <div className="col-sm-6">
                  <h1>{}</h1>
                </div>
                <div className="col-sm-6">
                  <ol className="breadcrumb float-sm-right">
                    <li className="breadcrumb-item active">
                      <NavLink to={`/private/companies/edit/${company.id}`}>
                        <Button
                          className="btn-sm"
                          variant="primary"
                          type="button"
                          style={{ float: 'right' }}
                        >
                          Edit
                        </Button>
                      </NavLink>
                    </li>
                  </ol>
                </div>
              </div>
            </div>
          </section>
          <div className="container-fluid">
            <div className="main-body">
              <div className="row gutters-sm">
                <div className="col-md-12">
                  <div className="card mb-3">
                    <div className="card-body">
                      {/* <div className="row"> */}
                      {/*  <div className="col-sm-3"> */}
                      {/*    <h6 className="mb-0">Description</h6> */}
                      {/*  </div> */}
                      {/*  <div className="col-sm-9 text-secondary"> */}
                      {/*    {company.long_desc} */}
                      {/*  </div> */}
                      {/* </div> */}
                      <hr />
                      {/* <div className="row"> */}
                      {/*  <div className="col-sm-3"> */}
                      {/*    <h6 className="mb-0">Office</h6> */}
                      {/*  </div> */}
                      {/*  <div className="col-sm-9 text-secondary"> */}
                      {/*    <a href={`tel://${item.landline}`}> */}
                      {/*      <CustomPhoneNumberView value={item.landline} /> */}
                      {/*    </a> */}
                      {/*  </div> */}
                      {/* </div> */}
                      {/* <hr /> */}
                      <div className="row">
                        <div className="col-sm-3">
                          <h6 className="mb-0">Main Phone</h6>
                        </div>
                        <div className="col-sm-9 text-secondary">
                          <a href={`tel://${company.landline}`}>
                            <CustomPhoneNumberView value={company.landline} />
                          </a>
                        </div>
                      </div>
                      <hr />
                      <div className="row">
                        <div className="col-sm-3">
                          <h6 className="mb-0">Main Fax</h6>
                        </div>
                        <div className="col-sm-9 text-secondary">
                          <a href={`tel://${company.fax}`}>
                            <CustomPhoneNumberView value={company.fax} />
                          </a>
                        </div>
                      </div>
                      <hr />
                      {/* Address Details */}

                      {company.primary_address && (
                        <>
                          <div className="row">
                            <div className="col-sm-3">
                              <h6 className="mb-0">Address 1</h6>
                            </div>
                            <div className="col-sm-9 text-secondary">
                              <div className="col-sm-9 text-secondary">
                                {company.primary_address.address1}
                              </div>
                            </div>
                          </div>
                          <hr />
                          <div className="row">
                            <div className="col-sm-3">
                              <h6 className="mb-0">Address 2</h6>
                            </div>
                            <div className="col-sm-9 text-secondary">
                              <div className="col-sm-9 text-secondary">
                                {company.primary_address.address2}
                              </div>
                            </div>
                          </div>
                          <hr />
                          <div className="row">
                            <div className="col-sm-3">
                              <h6 className="mb-0">State</h6>
                            </div>
                            <div className="col-sm-9 text-secondary">
                              <div className="col-sm-9 text-secondary">
                                {company.primary_address.state
                                  ? company.primary_address.state.name
                                  : ''}
                              </div>
                            </div>
                          </div>
                          <hr />
                          <div className="row">
                            <div className="col-sm-3">
                              <h6 className="mb-0">City</h6>
                            </div>
                            <div className="col-sm-9 text-secondary">
                              <div className="col-sm-9 text-secondary">
                                {company.primary_address.city
                                  ? company.primary_address.city.name
                                  : ''}
                              </div>
                            </div>
                          </div>
                          <hr />
                          <div className="row">
                            <div className="col-sm-3">
                              <h6 className="mb-0">Zip</h6>
                            </div>
                            <div className="col-sm-9 text-secondary">
                              <div className="col-sm-9 text-secondary">
                                {company.primary_address.zipcode}
                              </div>
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                  <div className="row">
                    {company.primary_contact && (
                      <div className="col-md-6">
                        <Card mb={4}>
                          <CardContent>
                            <Typography variant="h6" gutterBottom>
                              Primary Contact
                            </Typography>

                            <Spacer mb={4} />
                            <hr />

                            <Grid
                              container
                              direction="row"
                              alignItems="center"
                              mb={2}
                            >
                              <Grid item xs={4}>
                                <span className="mb-0">First Name : </span>
                              </Grid>
                              <Grid item xs={8}>
                                <div className="text-secondary">
                                  {company.primary_contact.first_name}
                                </div>
                              </Grid>
                            </Grid>
                            <Grid
                              container
                              direction="row"
                              alignItems="center"
                              mb={2}
                            >
                              <Grid item xs={4}>
                                <span className="mb-0">Last Name : </span>
                              </Grid>
                              <Grid item xs={8}>
                                <div className="text-secondary">
                                  {company.primary_contact.last_name}
                                </div>
                              </Grid>
                            </Grid>
                            <Grid
                              container
                              direction="row"
                              alignItems="center"
                              mb={2}
                            >
                              <Grid item xs={4}>
                                <span className="mb-0">Email : </span>
                              </Grid>
                              <Grid item xs={8}>
                                <div className="text-secondary">
                                  <a
                                    href={`mailto:${company.primary_contact.email_address}`}
                                  >
                                    {company.primary_contact.email_address}
                                  </a>
                                </div>
                              </Grid>
                            </Grid>
                            <Grid
                              container
                              direction="row"
                              alignItems="center"
                              mb={2}
                            >
                              <Grid item xs={4}>
                                <span className="mb-0">Mobile : </span>
                              </Grid>
                              <Grid item xs={8}>
                                <div className="text-secondary">
                                  <a
                                    href={`tel://${company.primary_contact.mobile}`}
                                  >
                                    <CustomPhoneNumberView
                                      value={company.primary_contact.mobile}
                                    />
                                  </a>
                                </div>
                              </Grid>
                            </Grid>
                            <Grid
                              container
                              direction="row"
                              alignItems="center"
                              mb={2}
                            >
                              <Grid item xs={4}>
                                <span className="mb-0">Title : </span>
                              </Grid>
                              <Grid item xs={8}>
                                <div className="text-secondary">
                                  {company.primary_contact.designation_name}
                                </div>
                              </Grid>
                            </Grid>
                          </CardContent>
                        </Card>
                      </div>
                    )}
                    {company.alternate_contact && (
                      <div className="col-md-6">
                        <Card mb={4}>
                          <CardContent>
                            <Typography variant="h6" gutterBottom>
                              Alternate Contact
                            </Typography>

                            <Spacer mb={4} />
                            <hr />
                            <Grid
                              container
                              direction="row"
                              mb={2}
                              alignItems="center"
                            >
                              <Grid item xs={4}>
                                <span className="mb-0">First Name : </span>
                              </Grid>
                              <Grid item xs={8}>
                                <div className="text-secondary">
                                  {company.alternate_contact.first_name}
                                </div>
                              </Grid>
                            </Grid>
                            <Grid
                              container
                              direction="row"
                              alignItems="center"
                              mb={2}
                            >
                              <Grid item xs={4}>
                                <span className="mb-0">Last Name : </span>
                              </Grid>
                              <Grid item xs={8}>
                                <div className="text-secondary">
                                  {company.alternate_contact.last_name}
                                </div>
                              </Grid>
                            </Grid>
                            <Grid
                              container
                              direction="row"
                              alignItems="center"
                              mb={2}
                            >
                              <Grid item xs={4}>
                                <span className="mb-0">Email : </span>
                              </Grid>
                              <Grid item xs={8}>
                                <div className="text-secondary">
                                  <a
                                    href={`mailto:${company.alternate_contact.email_address}`}
                                  >
                                    {company.alternate_contact.email_address}{' '}
                                  </a>
                                </div>
                              </Grid>
                            </Grid>
                            <Grid
                              container
                              direction="row"
                              alignItems="center"
                              mb={2}
                            >
                              <Grid item xs={4}>
                                <span className="mb-0">Mobile</span>
                              </Grid>
                              <Grid item xs={8}>
                                <div className="text-secondary">
                                  <a
                                    href={`tel://${company.alternate_contact.mobile}`}
                                  >
                                    <CustomPhoneNumberView
                                      value={company.alternate_contact.mobile}
                                    />
                                  </a>
                                </div>
                              </Grid>
                            </Grid>
                            <Grid
                              container
                              direction="row"
                              alignItems="center"
                              mb={2}
                            >
                              <Grid item xs={4}>
                                <span className="mb-0">Title : </span>
                              </Grid>
                              <Grid item xs={8}>
                                <div className="text-secondary">
                                  {company.alternate_contact.designation_name}
                                </div>
                              </Grid>
                            </Grid>
                          </CardContent>
                        </Card>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* <CustomCompanyProfile item={company} /> */}
        </div>
      )}
    </>
  );
};

export default DashboardCompany;
