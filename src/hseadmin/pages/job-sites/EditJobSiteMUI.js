import { Col, Form, Row } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink, useNavigate, useParams } from 'react-router-dom';
import Select from 'react-select';
import { toast } from 'react-toastify';
import { Helmet } from 'react-helmet-async';
import { Button, Grid, Typography } from '@mui/material';
import { fetchGET, fetchPUT } from '../../utils/NetworkUtils';
import URLConstants from '../../constants/URLConstants';
// import JobSiteCrewTabs from '../../components/tabs/JobSiteCrewTabs';
import StateSelect from '../../components/widgets/StateSelect';
import CitySelect from '../../components/widgets/CitySelect';
import CompanySelect from '../../components/widgets/CompanySelect';
import DivisionSelect from '../../components/widgets/DivisionSelect';
// import {getJobSite} from '../../store/actions/jobSites';
// import JobSiteCrewTabs from '../../components/tabs/JobSiteCrewTabs';
import { COUNTRY_ID_USA, KEY_COMPANY_ID } from '../../constants/Constants';
import ManagerSelect from '../../components/widgets/ManagerSelect';
import { loadClients } from '../../store/actions/clients';
import { CustomBreadcrumbs, CustomDivider } from '../../utils/MUIStyle';

const EditJobSiteMUI = () => {
  const localCompanyId = localStorage.getItem(KEY_COMPANY_ID);

  console.log('NewJobSite localCompanyId = ', localCompanyId);
  const [validated, setValidated] = useState(false);
  const history = useNavigate();

  const [name, setName] = useState('');
  const [shortDesc, setShortDesc] = useState('');
  const [longDesc, setLongDesc] = useState('');
  // const [supervisorEmpId, setSupervisorEmpId] = useState(-1);
  const [addressId, setAddressId] = useState(-1);
  const [companyId, setCompanyId] = useState(-1);
  // const [latitude, setLatitude] = useState('');
  // const [longitude, setLongitude] = useState('');
  const [clientId, setClientId] = useState(-1);
  const [divisionId, setDivisionId] = useState(-1);

  const dispatch = useDispatch();
  const [jobSite, setJobSite] = useState(null);
  const [address1, setAddress1] = useState('');

  const [selectedClientOption, setSelectedClientOption] = useState({});

  const [countryId, setCountryId] = useState(COUNTRY_ID_USA);
  const [stateId, setStateId] = useState(-1);
  const [cityId, setCityId] = useState(-1);

  const [managers, setManagers] = useState([]);
  const [managerOptions, setManagerOptions] = useState([]);

  const clients = useSelector((state) => state.client.clients);

  const params = useParams();
  const { id } = useParams();

  useEffect(() => {
    if (jobSite != null) {
      setName(jobSite.name);
      setShortDesc(jobSite.short_desc);
      setLongDesc(jobSite.long_desc);
      if (jobSite.address !== null) {
        setAddress1(jobSite.address.address1);
        setCityId(jobSite.address.city_id);
        setStateId(jobSite.address.state_id);
        setCountryId(jobSite.address.country_id);
        setAddressId(jobSite.address_id);
      }

      setCompanyId(jobSite.company_id);
      setDivisionId(jobSite.primary_division_id);
      // setLatitude(jobSite.latitude);
      // setLongitude(jobSite.longitude);
      setClientId(jobSite.client_id);

      if (jobSite.client !== null) {
        setSelectedClientOption({
          value: jobSite.client.id,
          label: jobSite.client.name,
        });
      }
      setManagers(jobSite.managers);
      const localOptions = [];

      jobSite.managers.forEach((manager) => {
        localOptions.push({
          id: manager.id,
        });
      });
      setManagerOptions(localOptions);
    }
  }, [jobSite]);

  useEffect(() => {
    console.log(`param is ${params.id}`);
    loadJobSite();
    fetchClients();
    // fetchCompanies();
    // fetchAddress();
    // fetchDivisions();
  }, []);

  const loadJobSite = async () => {
    try {
      const url = `${URLConstants.GET_JOB_SITE_URL}/${id}.json`;

      const response = await fetchGET(url);

      console.log('getJobSite', response);
      setJobSite(response.data);
    } catch (error) {
      toast(error.message || 'Failed');
    }
    // await dispatch(getJobSite(id));
  };
  const fetchClients = async () => {
    await dispatch(loadClients(1, '', 'name', 'asc', -1, 100));
  };

  const onJobSiteSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
    event.preventDefault();
    if (companyId === -1) {
      toast('Please select company');
    } else if (divisionId === -1) {
      toast('Please select division');
    } else if (name === '') {
      toast('Please enter project name');
    } else if (address1 === '') {
      toast('Please Enter address1');
    } else {
      const postData = {
        id,
        name,
        short_desc: shortDesc,
        long_desc: longDesc,
        // supervisor_employee_id: supervisorEmpId ,
        address: {
          id: addressId,
          name: 'Project Address',
          address1,
          country_id: countryId,
          state_id: stateId !== -1 ? stateId : null,
          city_id: cityId !== -1 ? cityId : null,
        },
        address_id: addressId,
        company_id: companyId,
        // latitude,
        // longitude,
        client_id: clientId,
        primary_division_id: divisionId,
        managers: managerOptions,
      };
      postJobSite(postData);
    }
  };

  const postJobSite = async (data) => {
    try {
      const url = `${URLConstants.GET_JOB_SITE_URL}/${jobSite.id}.json`;
      await fetchPUT(url, data);
      // await dispatch(updateJobSite(data));
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
  // const onLongitudeChangeHandler = (event) => {
  //   console.log(event.target.value);
  //   setLongitude(event.target.value);
  // };
  const onClientIdChangeHandler = (selectedOption) => {
    setClientId(+selectedOption.value);
    setSelectedClientOption(selectedOption);
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
      <Helmet title="Edit Project" />

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
            <Typography>Edit Project</Typography>
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
          {jobSite && (
            <Form noValidate validated={validated} onSubmit={onJobSiteSubmit}>
              <Row>
                <Col md={6}>
                  {/* Name Field */}
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Name *</Form.Label>
                    <Form.Control
                      required
                      type="text"
                      placeholder="Name *"
                      onChange={onNameChangeHandler}
                      value={name}
                    />
                    <Form.Control.Feedback type="invalid">
                      Please provide a valid name.
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col md={6}>
                  {/* Short Desc */}
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Short Desc</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Short Desc"
                      maxLength="255"
                      onInput={maxShortDescCheck}
                      onChange={onShortDescChangeHandler}
                      value={shortDesc === null ? '' : shortDesc}
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  {/* Description */}
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={2}
                      maxLength="500"
                      onInput={maxLongDescCheck}
                      placeholder="Description"
                      onChange={onLongDescChangeHandler}
                      value={longDesc === null ? '' : longDesc}
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  {/* Address1 field */}
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Address *</Form.Label>
                    <Form.Control
                      required
                      type="text"
                      placeholder="Address *"
                      onChange={onAddress1ChangeHandler}
                      value={address1}
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  {/* State name field */}
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Select State</Form.Label>
                    {jobSite && (
                      <StateSelect
                        onChange={(value) => setStateId(value)}
                        countryId={countryId}
                        entity={jobSite.address ? jobSite.address.state : null}
                      />
                    )}
                  </Form.Group>
                </Col>
                <Col md={6}>
                  {/* City name field */}
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Select City</Form.Label>
                    {jobSite && (
                      <CitySelect
                        onChange={(value) => setCityId(value)}
                        stateId={stateId}
                        entity={jobSite.address ? jobSite.address.city : null}
                      />
                    )}
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Select Managers</Form.Label>
                    <ManagerSelect
                      onChange={(value) => {
                        console.log('selected value', value);
                        setManagerOptions(value);
                      }}
                      companyId={companyId}
                      entities={managers}
                    />
                    <Form.Control.Feedback type="invalid">
                      Please provide a valid Company name.
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
                {localCompanyId === null && (
                  <Col md={6}>
                    {/* Company id */}
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label>Company Name *</Form.Label>
                      {jobSite && (
                        <CompanySelect
                          entity={jobSite.company}
                          onChange={(value) => setCompanyId(value)}
                        />
                      )}
                      <Form.Control.Feedback type="invalid">
                        Please provide a valid company.
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                )}
                <Col md={6}>
                  {/* Division id */}
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Division Name *</Form.Label>
                    {jobSite && (
                      <DivisionSelect
                        entity={jobSite.primary_division}
                        onChange={(value) => setDivisionId(value)}
                        companyId={companyId}
                      />
                    )}
                  </Form.Group>
                </Col>
                <Col md={6}>
                  {/* Client id */}
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Client Name</Form.Label>
                    <Select
                      options={clients.map((client) => {
                        return { value: client.id, label: client.name };
                      })}
                      value={selectedClientOption}
                      onChange={onClientIdChangeHandler}
                    />
                    <Form.Control.Feedback type="invalid">
                      Please provide a valid client id.
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
                {/* <Col md={6}> */}
                {/* Latitude Field */}
                {/* <Form.Group className="mb-3" controlId="formBasicEmail"> */}
                {/*  <Form.Label>Latitude</Form.Label> */}
                {/*  <Form.Control */}
                {/*    type="text" */}
                {/*    placeholder="Latitude" */}
                {/*    onChange={onLatitudeChangeHandler} */}
                {/*    value={latitude === null ? '' : latitude} */}
                {/*  /> */}
                {/* </Form.Group> */}
                {/* </Col> */}
                {/* <Col md={6}> */}
                {/*   Longitude Field */}
                {/* <Form.Group className="mb-3" controlId="formBasicEmail"> */}
                {/*  <Form.Label>Longitude</Form.Label> */}
                {/*  <Form.Control */}
                {/*    type="text" */}
                {/*    placeholder="Longitude" */}
                {/*    onChange={onLongitudeChangeHandler} */}
                {/*    value={longitude === null ? '' : longitude} */}
                {/*  /> */}
                {/* </Form.Group> */}
                {/* </Col> */}
              </Row>

              <Button variant="contained" type="submit" color="primary">
                Submit
              </Button>
            </Form>
          )}
        </Grid>
      </Grid>

      <CustomDivider my={4} />
      {/* <Grid container spacing={6}> */}
      {/*  <Grid item xs={12}> */}
      {/*    <Col md={12}> */}
      {/*      <Card> */}
      {/*        <Card.Header> */}
      {/*          <div className="row"> */}
      {/*            <div className="col-md-4"> */}
      {/*              <h3 className="card-title" style={{ float: 'left' }}> */}
      {/*                <i className="fas fa-text-width" /> */}
      {/*                Job Site Crew */}
      {/*              </h3> */}
      {/*            </div> */}
      {/*          </div> */}
      {/*        </Card.Header> */}
      {/*        <Card.Body> */}
      {/*          <JobSiteCrewTabs jobSiteId={id} companyId={companyId} /> */}
      {/*        </Card.Body> */}
      {/*      </Card> */}
      {/*    </Col> */}
      {/*  </Grid> */}
      {/* </Grid> */}
    </>
  );
};

export default EditJobSiteMUI;
