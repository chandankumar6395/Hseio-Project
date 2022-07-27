import { Col, Form, Row } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import { Link, NavLink, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Helmet } from 'react-helmet-async';
import { Button, Grid, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import URLConstants from '../../constants/URLConstants';
import { fetchGET, fetchPUT } from '../../utils/NetworkUtils';
import CustomSelect from '../../components/widgets/CustomSelect';
import { CustomBreadcrumbs, CustomDivider } from '../../utils/MUIStyle';
import {
  INCIDENT_TYPE_INJURY_ILLNESS,
  INCIDENT_TYPE_PROPERTY_DAMAGE,
  INCIDENT_TYPE_PROPERTY_DAMAGE_VEHICLE_NON_MOVING,
  INCIDENT_TYPE_VEHICLE_MOVING,
  INCIDENT_TYPE_VEHICLE_MOVING_INJURY_ILLNESS,
  KEY_COMPANY_ID,
} from '../../constants/Constants';
import CompanySelect from '../../components/widgets/CompanySelect';
import DivisionSelect from '../../components/widgets/DivisionSelect';
import JobSiteSelect from '../../components/widgets/JobSiteSelect';
import {
  toLocalDateTimeWithoutSecond,
  toServerDateTime,
} from '../../utils/Utils';
import EmployeeSelect from '../../components/widgets/EmployeeSelect';
import InjuryIllnessList from './InjuryIllnessList';
import VehicleMovingList from './VehicleMovingList';
import PhotoSelect from '../../components/widgets/PhotoSelect';

const EditIncidentMUI = () => {
  const localCompanyId = localStorage.getItem(KEY_COMPANY_ID);
  const localDivisionId = useSelector((state) => state.auth.selectedDivision);
  const localJobSiteId = useSelector((state) => state.auth.selectedJobSite);

  console.log('NewIncidentMUI localCompanyId', localCompanyId);
  console.log('NewIncidentMUI localDivisionId', localDivisionId);
  console.log('NewIncidentMUI localJobSiteId', localJobSiteId);

  const [validated, setValidated] = useState(false);

  const history = useNavigate();

  const [name, setName] = useState('');
  const [supervisorId, setSupervisorId] = useState('');
  const [incidentDateTime, setIncidentDateTime] = useState('');
  const [clientId, setClientId] = useState('');
  const [incidentTypeId, setIncidentTypeId] = useState('');
  const [companyId, setCompanyId] = useState('');
  const [divisionId, setDivisionId] = useState('');
  const [jobsiteId, setJobsiteId] = useState('');
  const [location, setLocation] = useState('');
  const [longDesc, setLongDesc] = useState('');
  const [photos, setPhotos] = useState([]);

  const params = useParams();
  const { id } = useParams();

  const [incident, setIncident] = useState(null);

  useEffect(() => {
    if (incident != null) {
      setName(incident.name);
      setLongDesc(incident.long_desc);
      setLocation(incident.location);
      setSupervisorId(incident.supervisor_id);
      // setIncidentDateTime(toLocalDateTime(incident.incident_date_time));
      setIncidentDateTime(
        incident.incident_date_time !== null
          ? toLocalDateTimeWithoutSecond(incident.incident_date_time)
          : ''
      );
      setClientId(incident.client_id);
      setIncidentTypeId(incident.incident_type_id);
      setCompanyId(incident.company_id);
      setDivisionId(incident.division_id);
      setJobsiteId(incident.job_site_id);

      const localPhotoArray = [];
      incident.photos.forEach((photo) => {
        localPhotoArray.push({ id: photo.id });
      });
      setPhotos(localPhotoArray);
    }
  }, [incident]);

  useEffect(() => {
    console.log(`param is ${params.id}`);
    loadIncident();
  }, []);

  const loadIncident = async () => {
    try {
      const url = `${URLConstants.GET_INCIDENT_URL}/${id}.json`;
      const response = await fetchGET(url);
      setIncident(response.data);
    } catch (error) {
      toast(error.message || 'Failed');
    }
  };

  const onIncidentSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
    event.preventDefault();
    if (companyId === null) {
      toast('Please Enter Company');
    } else if (name === '') {
      toast('Please Enter Valid Name');
    } else {
      const postData = {
        name,
        long_desc: longDesc,
        location,
        supervisor_id: supervisorId,
        // incident_date_time: toServerDateTime(incidentDateTime),
        incident_date_time:
          incidentDateTime !== '' ? toServerDateTime(incidentDateTime) : null,
        client_id: clientId,
        incident_type_id: incidentTypeId,
        photos: photos,
        company_id: localCompanyId !== null ? localCompanyId : companyId,
        division_id: localDivisionId !== -1 ? localDivisionId : divisionId,
        job_site_id: localJobSiteId !== -1 ? localJobSiteId : jobsiteId,
      };
      postIncident(postData);
    }
  };

  const postIncident = async (data) => {
    try {
      const url = `${URLConstants.GET_INCIDENT_URL}/${id}.json`;

      await fetchPUT(url, data);

      history('../../private/incidents');
    } catch (error) {
      toast(error.message || 'Failed');
    }
  };

  const onNameChangeHandler = (event) => {
    console.log(event.target.value);
    setName(event.target.value);
  };

  const onLongDescChangeHandler = (event) => {
    console.log(event.target.value);
    setLongDesc(event.target.value);
  };

  const onLocationChangeHandler = (event) => {
    console.log(event.target.value);
    setLocation(event.target.value);
  };

  const onIncidentDateTimeChangeHandler = (event) => {
    // console.log(event.target.value);
    setIncidentDateTime(event.target.value);
  };

  const maxLongDescCheck = (object) => {
    if (object.target.value.length > object.target.maxLength) {
      object.target.value = object.target.value.slice(
        0,
        object.target.maxLength
      );
    }
  };

  return (
    <>
      <Helmet title="Edit Incident" />

      <Grid justifyContent="space-between" container spacing={10}>
        <Grid item>
          <Typography variant="h3" gutterBottom display="inline">
            Incident
          </Typography>

          <CustomBreadcrumbs aria-label="Breadcrumb" mt={2}>
            <Link component={NavLink} to="/">
              Dashboard
            </Link>
            <Link component={NavLink} to="/private/incidents">
              Incidents
            </Link>
            <Typography>Edit Incident</Typography>
          </CustomBreadcrumbs>
        </Grid>
        <Grid item>
          <div>
            <NavLink to="/private/incidents">
              <Button variant="contained" color="primary">
                Back
              </Button>
            </NavLink>
          </div>
        </Grid>
      </Grid>
      <CustomDivider my={6} />
      {incident && (
        <Grid container spacing={6}>
          <Grid item xs={12}>
            {/* <Card> */}
            {/*  <Card.Body> */}
            <div className="cordbox">
              <Form
                noValidate
                validated={validated}
                onSubmit={onIncidentSubmit}
              >
                <Row>
                  {/* Company id */}
                  {localCompanyId === null && (
                    <Col md={6}>
                      <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Company *</Form.Label>
                        <CompanySelect
                          onChange={(value) => setCompanyId(value)}
                          entity={incident.company}
                        />
                      </Form.Group>
                    </Col>
                  )}

                  {localDivisionId === -1 && (
                    <Col md={6}>
                      <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Division *</Form.Label>
                        <DivisionSelect
                          onChange={(value) => setDivisionId(value)}
                          companyId={companyId}
                          entity={incident.division}
                        />
                      </Form.Group>
                    </Col>
                  )}
                  {localJobSiteId && (
                    <Col md={6}>
                      <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Project</Form.Label>
                        <JobSiteSelect
                          onChange={(value) => setJobsiteId(value)}
                          companyId={companyId}
                          divisionId={divisionId}
                          entity={incident.job_site}
                        />
                      </Form.Group>
                    </Col>
                  )}

                  <Col md={6}>
                    <PhotoSelect
                      onChange={(values) => {
                        console.log('Photo Select', values);
                        setPhotos(values);
                      }}
                      entities={incident.photos}
                    />
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label>Name *</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Name *"
                        onChange={onNameChangeHandler}
                        value={name}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label>Location</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Location"
                        onChange={onLocationChangeHandler}
                        value={location}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    {/* supervisor id */}
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label>Supervisor</Form.Label>
                      <EmployeeSelect
                        params={{
                          url: URLConstants.EMPLOYEES_URL,
                        }}
                        onChange={(value) => {
                          setSupervisorId(value);
                        }}
                        entity={incident.supervisor}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    {/* incident date time */}
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label>Incident Date/Time:</Form.Label>
                      <Form.Control
                        type="datetime-local"
                        placeholder="Incident Date/Time:"
                        onChange={onIncidentDateTimeChangeHandler}
                        value={incidentDateTime}
                      />
                    </Form.Group>
                  </Col>

                  <Col md={6}>
                    {/* client id */}
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label>Client Name</Form.Label>
                      <CustomSelect
                        params={{
                          url: URLConstants.CLIENTS_URL,
                        }}
                        onChange={(value) => {
                          setClientId(value);
                        }}
                        entity={incident.client}
                      />
                    </Form.Group>
                  </Col>

                  <Col md={6}>
                    {/* Incident Type Id */}
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label>Incident Type *</Form.Label>
                      <CustomSelect
                        params={{
                          url: URLConstants.INCIDENT_TYPES_URL,
                        }}
                        onChange={(value) => {
                          setIncidentTypeId(value);
                        }}
                        entity={incident.incident_type}
                      />
                      <Form.Control.Feedback type="invalid">
                        Please provide a valid Incident Type Name.
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col md={12}>
                    {/* Description Field */}
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label>Incident Description</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={2}
                        maxLength="500"
                        onInput={maxLongDescCheck}
                        placeholder="Incident Description"
                        onChange={onLongDescChangeHandler}
                        value={longDesc}
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Button variant="contained" type="submit" color="primary">
                  Submit
                </Button>
              </Form>
            </div>
            {/*  </Card.Body> */}
            {/* </Card> */}
          </Grid>
        </Grid>
      )}

      {(incidentTypeId === INCIDENT_TYPE_INJURY_ILLNESS ||
        incidentTypeId === INCIDENT_TYPE_VEHICLE_MOVING_INJURY_ILLNESS) && (
        <InjuryIllnessList
          tableName="incident"
          columnName="incident_id"
          incidentId={id}
          incidentTypeId={incidentTypeId}
          companyId={companyId}
          devisionId={divisionId}
          jobsiteId={jobsiteId}
        />
      )}
      {(incidentTypeId === INCIDENT_TYPE_VEHICLE_MOVING ||
        incidentTypeId === INCIDENT_TYPE_PROPERTY_DAMAGE ||
        incidentTypeId === INCIDENT_TYPE_PROPERTY_DAMAGE_VEHICLE_NON_MOVING ||
        incidentTypeId === INCIDENT_TYPE_VEHICLE_MOVING_INJURY_ILLNESS) && (
        <VehicleMovingList
          tableName="incident"
          columnName="incident_id"
          incidentId={id}
          incidentTypeId={incidentTypeId}
          companyId={companyId}
          devisionId={divisionId}
          jobsiteId={jobsiteId}
        />
      )}
    </>
  );
};

export default EditIncidentMUI;
