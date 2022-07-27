import { Col, Form, Row } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import Select from 'react-select';
import { Helmet } from 'react-helmet-async';
import { Button, Grid, Typography } from '@mui/material';
import { toast } from 'react-toastify';
import { fetchPOST } from '../../utils/NetworkUtils';
import URLConstants from '../../constants/URLConstants';
import { loadDivisions } from '../../store/actions/divisions';
import CompanySelect from '../../components/widgets/CompanySelect';
import DivisionSelect from '../../components/widgets/DivisionSelect';
import StateSelect from '../../components/widgets/StateSelect';
import CitySelect from '../../components/widgets/CitySelect';
import { COUNTRY_ID_USA, KEY_COMPANY_ID } from '../../constants/Constants';
import ManagerSelect from '../../components/widgets/ManagerSelect';
import { loadJobSites } from '../../store/actions/jobSites';
import { loadClients } from '../../store/actions/clients';
import { loadCompanies } from '../../store/actions/companies';
import { CustomBreadcrumbs, CustomDivider } from '../../utils/MUIStyle';

const NewJobSiteMUI = () => {
  const localCompanyId = localStorage.getItem(KEY_COMPANY_ID);
  // this value should always -1 if the user is logged via system admin and company owner.
  const localDivisionId = useSelector((state) => state.auth.selectedDivision);

  console.log('NewJobSite localCompanyId = ', localCompanyId);
  const [validated, setValidated] = useState(false);

  const history = useNavigate();

  const [name, setName] = useState('');
  const [shortDesc, setShortDesc] = useState('');
  const [longDesc, setLongDesc] = useState('');
  // const [supervisorEmpId, setSupervisorEmpId] = useState(-1);
  const [address1, setAddress1] = useState('');
  // const [latitude, setLatitude] = useState('');
  // const [longitude, setLongitude] = useState('');

  const [companyId, setCompanyId] = useState(localCompanyId);
  const [clientId, setClientId] = useState(-1);
  const [divisionId, setDivisionId] = useState(localDivisionId);

  const [countryId, setCountryId] = useState(-1);
  const [stateId, setStateId] = useState(-1);
  const [cityId, setCityId] = useState(-1);

  const [managers, setManagers] = useState([]);

  const dispatch = useDispatch();
  // const jobSites = useSelector(state => state.jobSite.jobSites);
  const clients = useSelector((state) => state.client.clients);
  // const [lat, setLat] = useState(null);
  // const [lng, setLng] = useState(null);
  // const [status, setStatus] = useState(null);
  // const getLocation = () => {
  //   if (!navigator.geolocation) {
  //     setStatus('Geolocation is not supported by your browser');
  //   } else {
  //     setStatus('Locating...');
  //     navigator.geolocation.getCurrentPosition(
  //       (position) => {
  //         setStatus(null);
  //         setLat(position.coords.latitude);
  //         setLng(position.coords.longitude);
  //       },
  //       () => {
  //         setStatus('Unable to retrieve your location');
  //       }
  //     );
  //   }
  // };
  // console.log('Geo Location Status', status);
  // useEffect(() => {
  //   getLocation();
  // }, []);
  useEffect(() => {
    fetchJobSites();
    fetchClients();
    fetchCompanies();
    fetchDivisions();
    setCountryId(COUNTRY_ID_USA);
  }, []);

  const fetchJobSites = async () => {
    await dispatch(loadJobSites());
  };

  const fetchClients = async () => {
    await dispatch(loadClients(1, '', 'name', 'asc', -1, 100));
  };

  const fetchCompanies = async () => {
    await dispatch(loadCompanies(1, '', 'name', 'asc', 100));
  };

  const fetchDivisions = async () => {
    await dispatch(loadDivisions(1, '', 'name', 'asc', 100));
  };

  const onJobSiteSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
    event.preventDefault();
    if (companyId === null) {
      toast('Please select company');
    } else if (divisionId === -1) {
      toast('Please select division');
    } else if (name === '') {
      toast('Please enter project name');
    } else if (address1 === '') {
      toast('Please Enter address1');
    } else {
      const postData = {
        name,
        short_desc: shortDesc,
        long_desc: longDesc,
        // supervisor_employee_id: supervisorEmpId ,
        address: {
          name: 'Project Address',
          address1,
          country_id: countryId,
          state_id: stateId === -1 ? null : stateId,
          city_id: cityId === -1 ? null : cityId,
        },
        company_id: localCompanyId !== null ? localCompanyId : companyId,
        primary_division_id:
          localDivisionId !== -1 ? localDivisionId : divisionId,
        // latitude,
        // longitude,
        client_id: clientId === -1 ? null : clientId,
        managers,
      };
      postJobSite(postData);
    }
  };

  const postJobSite = async (data) => {
    try {
      // await dispatch(addJobSites(data));
      await fetchPOST(URLConstants.JOB_SITES_URL, data);
      history('../../private/job-sites');
    } catch (error) {
      console.log(error);
    }
  };

  const onNameChangeHandler = (event) => {
    console.log(event.target.value);
    setName(event.target.value);
  };

  const onShortDescChangeHandler = (event) => {
    console.log(event.target.value);
    setShortDesc(event.target.value);
  };

  const onLongDescChangeHandler = (event) => {
    console.log(event.target.value);
    setLongDesc(event.target.value);
  };

  // const onSupervisorEmpIdChangeHandler = (selectedOption) =>{
  //   setSupervisorEmpId(+selectedOption.value);
  //   console.log(selectedOption.value);
  // }
  const onAddress1ChangeHandler = (event) => {
    console.log(event.target.value);
    setAddress1(event.target.value);
  };

  // const onLatitudeChangeHandler = (event) => {
  //   console.log(event.target.value);
  //   setLatitude(event.target.value);
  // };
  //
  // const onLongitudeChangeHandler = (event) => {
  //   console.log(event.target.value);
  //   setLongitude(event.target.value);
  // };

  const onClientIdChangeHandler = (selectedOption) => {
    setClientId(+selectedOption.value);
    console.log(selectedOption.value);
  };

  const maxLongDescCheck = (object) => {
    if (object.target.value.length > object.target.maxLength) {
      object.target.value = object.target.value.slice(
        0,
        object.target.maxLength
      );
    }
  };

  const maxShortDescCheck = (object) => {
    if (object.target.value.length > object.target.maxLength) {
      object.target.value = object.target.value.slice(
        0,
        object.target.maxLength
      );
    }
  };

  return (
    <>
      <Helmet title="Add Project" />

      <Grid justifyContent="space-between" container spacing={10}>
        <Grid item>
          <Typography variant="h3" gutterBottom display="inline">
            Projects
          </Typography>

          <CustomBreadcrumbs aria-label="Breadcrumb" mt={2}>
            <Link component={NavLink} to="/">
              Dashboard
            </Link>
            <Link component={NavLink} to="/private/job-sites">
              Projects
            </Link>
            <Typography>Add Project</Typography>
          </CustomBreadcrumbs>
        </Grid>
        <Grid item>
          <div>
            <NavLink to="/private/job-sites">
              <Button variant="contained" color="primary">
                Back
              </Button>
            </NavLink>
          </div>
        </Grid>
      </Grid>

      <CustomDivider my={6} />
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Form noValidate validated={validated} onSubmit={onJobSiteSubmit}>
            {/* Name Field */}
            <Row>
              {/* Company id */}
              {localCompanyId === null && (
                <Col md={6}>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Company Name *</Form.Label>
                    <CompanySelect
                      onChange={(value) => {
                        setCompanyId(value);
                      }}
                    />
                  </Form.Group>
                </Col>
              )}
              {/* Division id */}
              {localDivisionId === -1 && (
                <Col md={6}>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Division Name *</Form.Label>
                    <DivisionSelect
                      onChange={(value) => setDivisionId(value)}
                      companyId={
                        localCompanyId !== null ? localCompanyId : companyId
                      }
                    />
                  </Form.Group>
                </Col>
              )}
              {/* Select Managers */}
              <Col md={6}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Select Managers</Form.Label>
                  <ManagerSelect
                    onChange={(value) => {
                      setManagers(value);
                    }}
                    companyId={
                      localCompanyId !== null ? localCompanyId : companyId
                    }
                  />
                  <Form.Control.Feedback type="invalid">
                    Please provide a valid Company name.
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              {/* Client id */}
              <Col md={6}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Client Name</Form.Label>
                  <Select
                    options={clients.map((client) => {
                      return { value: client.id, label: client.name };
                    })}
                    onChange={onClientIdChangeHandler}
                  />
                </Form.Group>
              </Col>
              {/* Job site name */}
              <Col md={6}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Name *</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    placeholder="Name *"
                    onChange={onNameChangeHandler}
                  />
                  <Form.Control.Feedback type="invalid">
                    Please provide a valid name.
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              {/* Short Desc Field */}
              <Col md={6}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Short Desc</Form.Label>
                  <Form.Control
                    type="text"
                    maxLength="255"
                    onInput={maxShortDescCheck}
                    placeholder="Short Desc"
                    onChange={onShortDescChangeHandler}
                  />
                </Form.Group>
              </Col>
              {/* Description Field */}
              <Col md={6}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={2}
                    maxLength="500"
                    onInput={maxLongDescCheck}
                    placeholder="Description"
                    onChange={onLongDescChangeHandler}
                  />
                </Form.Group>
              </Col>
              {/* Address1 field */}
              <Col md={6}>
                {/* Supervisor id */}
                {/* <Form.Group className="mb-3" controlId="formBasicEmail"> */}
                {/*  <Form.Label >Supervisor Id</Form.Label> */}
                {/*  /!*<Select required options = {industries.map(industry =>{*!/ */}
                {/*  /!*  return {value:industry.id, label:industry.name}*!/ */}
                {/*  /!*})*!/ */}
                {/*  } onChange={onSupervisorEmpIdChangeHandler} /> */}
                {/*  <Form.Control.Feedback type="invalid"> */}
                {/*    Please provide a valid supervisor id. */}
                {/*  </Form.Control.Feedback> */}
                {/* </Form.Group> */}

                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Address *</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    placeholder="Address *"
                    onChange={onAddress1ChangeHandler}
                  />
                  <Form.Control.Feedback type="invalid">
                    Please provide a valid Address.
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              {/* State name field */}
              <Col md={6}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Select State</Form.Label>
                  <StateSelect
                    onChange={(value) => setStateId(value)}
                    countryId={countryId}
                  />
                </Form.Group>
              </Col>
              {/* City name field */}
              <Col md={6}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Select City</Form.Label>
                  <CitySelect
                    onChange={(value) => setCityId(value)}
                    stateId={stateId}
                  />
                </Form.Group>
              </Col>

              {/* /!* latitude field *!/ */}
              {/* <Col md={6}> */}
              {/*  <Form.Group className="mb-3" controlId="formBasicEmail"> */}
              {/*    <Form.Label>Latitude</Form.Label> */}
              {/*    <Form.Control */}
              {/*      type="number" */}
              {/*      placeholder="Latitude" */}
              {/*      onChange={onLatitudeChangeHandler} */}
              {/*      value={lat} */}
              {/*    /> */}
              {/*  </Form.Group> */}
              {/* </Col> */}
              {/* /!* longitude field *!/ */}
              {/* <Col md={6}> */}
              {/*  <Form.Group className="mb-3" controlId="formBasicEmail"> */}
              {/*    <Form.Label>Longitude</Form.Label> */}
              {/*    <Form.Control */}
              {/*      type="number" */}
              {/*      placeholder="Longitude" */}
              {/*      onChange={onLongitudeChangeHandler} */}
              {/*      value={lng} */}
              {/*    /> */}
              {/*  </Form.Group> */}
              {/* </Col> */}
            </Row>

            <Button variant="contained" type="submit" color="primary">
              Submit
            </Button>
          </Form>
        </Grid>
      </Grid>
    </>
  );
};

export default NewJobSiteMUI;
