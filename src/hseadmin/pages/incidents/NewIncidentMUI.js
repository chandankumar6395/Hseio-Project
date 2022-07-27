import { Col, Form, Row } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Helmet } from 'react-helmet-async';
import { Button, Grid, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { KEY_COMPANY_ID } from '../../constants/Constants';
import CompanySelect from '../../components/widgets/CompanySelect';
import { CustomBreadcrumbs, CustomDivider } from '../../utils/MUIStyle';
import URLConstants from '../../constants/URLConstants';
import CustomSelect from '../../components/widgets/CustomSelect';
import DivisionSelect from '../../components/widgets/DivisionSelect';
import JobSiteSelect from '../../components/widgets/JobSiteSelect';
import EmployeeSelect from '../../components/widgets/EmployeeSelect';
import { fetchPOST } from '../../utils/NetworkUtils';
import PhotoSelect from '../../components/widgets/PhotoSelect';
import { toServerDateTime } from '../../utils/Utils';

const NewIncidentMUI = () => {
  const localCompanyId = localStorage.getItem(KEY_COMPANY_ID);
  const localDivisionId = useSelector((state) => state.auth.selectedDivision);
  const localJobSiteId = useSelector((state) => state.auth.selectedJobSite);

  console.log('NewEquipmentMUI localCompanyId', localCompanyId);
  console.log('NewEquipmentMUI localDivisionId', localDivisionId);
  console.log('NewEquipmentMUI localJobSiteId', localJobSiteId);

  const [validated, setValidated] = useState(false);
  const history = useNavigate();

  const [name, setName] = useState('');
  const [supervisorId, setSupervisorId] = useState('');
  const [incidentDateTime, setIncidentDateTime] = useState('');
  const [clientId, setClientId] = useState('');
  const [incidentTypeId, setIncidentTypeId] = useState('');
  const [companyId, setCompanyId] = useState(localCompanyId);
  const [divisionId, setDivisionId] = useState(localDivisionId);
  const [jobSiteId, setJobSiteId] = useState(localJobSiteId);
  const [location, setLocation] = useState('');
  const [longDesc, setLongDesc] = useState('');
  const [photos, setPhotos] = useState([]);

  console.log('DivisionID', divisionId);

  useEffect(() => {}, []);

  const onIncidentSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);
    event.preventDefault();

    if (companyId === null) {
      toast('Please select Company');
    } else if (divisionId === -1) {
      toast('Please select Division');
    } else if (name === '') {
      toast('Please enter valid Name');
    } else if (jobSiteId === -1) {
      toast('Please select Project');
    } else if (incidentTypeId === '') {
      toast('Please select Incident Type');
    } else if (incidentDateTime === '') {
      toast('Please select Incident Date/Time:');
    } else {
      const postData = {
        name,
        supervisor_id: supervisorId,
        incident_date_time: toServerDateTime(incidentDateTime),
        location: location,
        client_id: clientId,
        long_desc: longDesc,
        incident_type_id: incidentTypeId,
        division_id: localDivisionId !== -1 ? localDivisionId : divisionId,
        company_id: localCompanyId !== null ? localCompanyId : companyId,
        job_site_id: localJobSiteId !== -1 ? localJobSiteId : jobSiteId,
        photos,
      };
      postIncident(postData);
    }
  };

  const postIncident = async (data) => {
    console.log('Post Data', data);
    try {
      const response = await fetchPOST(URLConstants.INCIDENTS_URL, data);
      console.log('Submit Data', response);
      history(`../../private/incidents/edit/${response.data.id.id}`);
    } catch (error) {
      toast(error.message || 'Failed');
    }
  };

  const onNameChangeHandler = (event) => {
    console.log(event.target.value);
    setName(event.target.value);
  };
  const onLocationChangeHandler = (event) => {
    console.log(event.target.value);
    setLocation(event.target.value);
  };
  const onIncidentDateTimeChangeHandler = (event) => {
    console.log(event.target.value);
    setIncidentDateTime(event.target.value);
  };
  const onLongDescChangeHandler = (event) => {
    console.log(event.target.value);
    setLongDesc(event.target.value);
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
      <Helmet title="Add Incident" />

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
            <Typography>Add Incident</Typography>
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
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Form noValidate validated={validated} onSubmit={onIncidentSubmit}>
            <Row>
              {/* Company id */}
              {localCompanyId === null && (
                <Col md={6}>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Company *</Form.Label>
                    <CompanySelect onChange={(value) => setCompanyId(value)} />
                  </Form.Group>
                </Col>
              )}

              {localDivisionId === -1 && (
                <Col md={6}>
                  {/* Division id */}
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Division *</Form.Label>
                    <DivisionSelect
                      onChange={(value) => setDivisionId(value)}
                      companyId={
                        localCompanyId !== null ? localCompanyId : companyId
                      }
                    />
                    <Form.Control.Feedback type="invalid">
                      Please provide a valid division.
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
              )}
              {localJobSiteId === -1 && (
                <Col md={6}>
                  {/* JobSite Id */}
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Project *</Form.Label>
                    <JobSiteSelect
                      onChange={(value) => setJobSiteId(value)}
                      companyId={
                        localCompanyId !== null ? localCompanyId : companyId
                      }
                      divisionId={
                        localDivisionId !== -1 ? localDivisionId : divisionId
                      }
                    />
                    <Form.Control.Feedback type="invalid">
                      Please provide a valid Project.
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
              )}
              <Col md={6}>
                <PhotoSelect
                  onChange={(values) => {
                    console.log('Photo Select', values);
                    setPhotos(values);
                  }}
                />
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Name *</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Name *"
                    onChange={onNameChangeHandler}
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
                    onChange={(value) => {
                      setSupervisorId(value);
                    }}
                  />
                </Form.Group>
              </Col>

              <Col md={6}>
                {/* incident date time */}
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Incident Date/Time*</Form.Label>
                  <Form.Control
                    type="datetime-local"
                    placeholder="Incident Date/Time:"
                    onChange={onIncidentDateTimeChangeHandler}
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
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
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
                  />
                  <Form.Control.Feedback type="invalid">
                    Please provide a valid Incident Type Name.
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
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

export default NewIncidentMUI;
