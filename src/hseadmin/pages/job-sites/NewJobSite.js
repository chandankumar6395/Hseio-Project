import { Button, Card, Col, Form, Row } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';
import { fetchPOST } from '../../utils/NetworkUtils';
import URLConstants from '../../constants/URLConstants';
import { loadDivisions } from '../../store/actions/divisions';
import CompanySelect from '../../components/widgets/CompanySelect';
import DivisionSelect from '../../components/widgets/DivisionSelect';
import CountrySelect from '../../components/widgets/CountrySelect';
import StateSelect from '../../components/widgets/StateSelect';
import CitySelect from '../../components/widgets/CitySelect';
import { KEY_COMPANY_ID } from '../../constants/Constants';
import ManagerSelect from '../../components/widgets/ManagerSelect';
import { loadJobSites } from '../../store/actions/jobSites';
import { loadClients } from '../../store/actions/clients';
import { loadCompanies } from '../../store/actions/companies';

const NewJobSite = () => {
  const localCompanyId = localStorage.getItem(KEY_COMPANY_ID);

  console.log('NewJobSite localCompanyId = ', localCompanyId);
  const [validated, setValidated] = useState(false);

  const history = useNavigate();

  const [name, setName] = useState('');
  const [shortDesc, setShortDesc] = useState('');
  const [longDesc, setLongDesc] = useState('');
  // const [supervisorEmpId, setSupervisorEmpId] = useState(-1);
  const [address1, setAddress1] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');

  const [companyId, setCompanyId] = useState(-1);
  const [clientId, setClientId] = useState(-1);
  const [divisionId, setDivisionId] = useState(-1);

  const [countryId, setCountryId] = useState(-1);
  const [stateId, setStateId] = useState(-1);
  const [cityId, setCityId] = useState(-1);

  const [managers, setManagers] = useState([]);

  const dispatch = useDispatch();
  // const jobSites = useSelector(state => state.jobSite.jobSites);
  const clients = useSelector((state) => state.client.clients);

  useEffect(() => {
    fetchJobSites();
    fetchClients();
    fetchCompanies();
    fetchDivisions();
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
    const postData = {
      name,
      short_desc: shortDesc,
      long_desc: longDesc,
      // supervisor_employee_id: supervisorEmpId ,
      address: {
        name: 'Project Address',
        address1,
        country_id: countryId,
        state_id: stateId,
        city_id: cityId,
      },
      company_id: localCompanyId !== null ? localCompanyId : companyId,
      primary_division_id: divisionId,
      latitude,
      longitude,
      client_id: clientId === -1 ? null : clientId,
      managers,
    };
    postJobSite(postData);
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

  const onLatitudeChangeHandler = (event) => {
    console.log(event.target.value);
    setLatitude(event.target.value);
  };

  const onLongitudeChangeHandler = (event) => {
    console.log(event.target.value);
    setLongitude(event.target.value);
  };

  const onClientIdChangeHandler = (selectedOption) => {
    setClientId(+selectedOption.value);
    console.log(selectedOption.value);
  };

  return (
    <Row>
      <Col>
        <Card>
          <Card.Header>
            Add Project
            <Button
              className="btn-sm"
              variant="primary"
              type="button"
              style={{
                float: 'right',
              }}
              onClick={() => {
                history(-1);
              }}
            >
              Back
            </Button>
          </Card.Header>
          <Card.Body>
            <Form noValidate validated={validated} onSubmit={onJobSiteSubmit}>
              {/* Name Field */}
              <Row>
                {/* Company id */}
                {localCompanyId === null && (
                  <Col md={6}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label>Company Name</Form.Label>
                      <CompanySelect
                        onChange={(value) => {
                          setCompanyId(value);
                        }}
                      />
                    </Form.Group>
                  </Col>
                )}
                {/* Division id */}
                <Col md={6}>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Division Name</Form.Label>
                    <DivisionSelect
                      onChange={(value) => setDivisionId(value)}
                      companyId={
                        localCompanyId !== null ? localCompanyId : companyId
                      }
                    />
                  </Form.Group>
                </Col>
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
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      required
                      type="text"
                      placeholder="Name"
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
                    <Form.Label>Address</Form.Label>
                    <Form.Control
                      required
                      type="text"
                      placeholder="Address"
                      onChange={onAddress1ChangeHandler}
                    />
                    <Form.Control.Feedback type="invalid">
                      Please provide a valid Address.
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
                {/* Country name field */}
                <Col md={6}>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Country</Form.Label>
                    <CountrySelect onChange={(value) => setCountryId(value)} />
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

                {/* latitude field */}
                <Col md={6}>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Latitude</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="Latitude"
                      onChange={onLatitudeChangeHandler}
                    />
                  </Form.Group>
                </Col>
                {/* longitude field */}
                <Col md={6}>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Longitude</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="Longitude"
                      onChange={onLongitudeChangeHandler}
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default NewJobSite;
