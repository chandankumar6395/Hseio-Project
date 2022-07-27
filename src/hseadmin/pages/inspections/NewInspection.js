import { Col, Form, Row } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Helmet } from 'react-helmet-async';
import { Button, Grid, Typography } from '@mui/material';
import CompanySelect from '../../components/widgets/CompanySelect';
import { CustomBreadcrumbs, CustomDivider } from '../../utils/MUIStyle';
import DivisionSelect from '../../components/widgets/DivisionSelect';
import JobSiteSelect from '../../components/widgets/JobSiteSelect';
import { addInspections } from '../../store/actions/ inspections';
import CustomSelect from '../../components/widgets/CustomSelect';
import URLConstants from '../../constants/URLConstants';
import EmployeeSelect from '../../components/widgets/EmployeeSelect';
import { KEY_COMPANY_ID } from '../../constants/Constants';

const NewInspection = () => {
  const localCompanyId = localStorage.getItem(KEY_COMPANY_ID);
  const localDivisionId = useSelector((state) => state.auth.selectedDivision);
  const localJobSiteId = useSelector((state) => state.auth.selectedJobSite);

  console.log('NewIncidentMUI localCompanyId', localCompanyId);
  console.log('NewIncidentMUI localDivisionId', localDivisionId);
  console.log('NewIncidentMUI localJobSiteId', localJobSiteId);
  const [validated, setValidated] = useState(false);

  const history = useNavigate();

  const [name, setName] = useState('');
  const [shortDesc, setShortDesc] = useState('');
  const [longDesc, setLongDesc] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [inspectionDateTime, setInspectionDateTime] = useState('');
  const [companyId, setCompanyId] = useState('');
  const [divisionId, setDivisionId] = useState('');
  const [jobSiteId, setJobSiteId] = useState('');
  const [equipmentId, setEquimentId] = useState('');
  const [milesHoursId, setMilesHoursId] = useState('');
  const [inspectorId, setInspectorId] = useState('');
  const [notes, setNotes] = useState('');
  const [clientId, setClientId] = useState('');
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  const [status, setStatus] = useState(null);
  const getLocation = () => {
    if (!navigator.geolocation) {
      setStatus('Geolocation is not supported by your browser');
    } else {
      setStatus('Locating...');
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setStatus(null);
          setLat(position.coords.latitude);
          setLng(position.coords.longitude);
        },
        () => {
          setStatus('Unable to retrieve your location');
        }
      );
    }
  };
  console.log('Geo Location Status', status);
  const dispatch = useDispatch();

  useEffect(() => {
    getLocation();
  }, []);

  const onInspectionSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);
    event.preventDefault();

    const postData = {
      name: name,
      short_desc: shortDesc,
      client_id: clientId,
      long_desc: longDesc,
      latitude: latitude,
      longitude: longitude,
      inspection_date_time: inspectionDateTime,
      division_id: localDivisionId !== -1 ? localDivisionId : divisionId,
      company_id: localCompanyId !== null ? localCompanyId : companyId,
      job_site_id: localJobSiteId !== -1 ? localJobSiteId : jobSiteId,
      equipment_id: equipmentId,
      miles_hours: milesHoursId,
      inspector_id: inspectorId,
      notes: notes,
    };
    postInspection(postData);
  };

  const postInspection = async (data) => {
    try {
      await dispatch(addInspections(data));
      history('../../private/inspections');
    } catch (error) {
      toast(error.message || 'Failed');
    }
  };

  const onNameChangeHandler = (event) => {
    // console.log(event.target.value);
    setName(event.target.value);
  };

  const onShortDescChangeHandler = (event) => {
    // console.log(event.target.value);
    setShortDesc(event.target.value);
  };

  const onLongDescChangeHandler = (event) => {
    // console.log(event.target.value);
    setLongDesc(event.target.value);
  };

  const onLatitudeChangeHandler = (event) => {
    setLatitude(event.target.value);
  };
  const onLongitudeChangeHandler = (event) => {
    setLongitude(event.target.value);
  };

  const onInspectionDateTimeChangeHandler = (event) => {
    console.log(event.target.value);
    setInspectionDateTime(event.target.value);
  };
  const onMilesHourChangeHandler = (event) => {
    setMilesHoursId(event.target.value);
  };
  const onNotesChangeHandler = (event) => {
    setNotes(event.target.value);
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
      <Helmet title="Add Inspection" />

      <Grid justifyContent="space-between" container spacing={10}>
        <Grid item>
          <Typography variant="h3" gutterBottom display="inline">
            Inspection
          </Typography>

          <CustomBreadcrumbs aria-label="Breadcrumb" mt={2}>
            <Link component={NavLink} to="/private/dashboard">
              Dashboard
            </Link>
            <Link component={NavLink} to="/private/inspections">
              Inspections
            </Link>
            <Typography>Add Inspection</Typography>
          </CustomBreadcrumbs>
        </Grid>
        <Grid item>
          <div>
            <NavLink to="/private/inspections">
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
          <Form noValidate validated={validated} onSubmit={onInspectionSubmit}>
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
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Division *</Form.Label>
                    <DivisionSelect
                      onChange={(value) => setDivisionId(value)}
                      companyId={
                        localCompanyId !== null ? localCompanyId : companyId
                      }
                    />
                  </Form.Group>
                </Col>
              )}
              {localJobSiteId === -1 && (
                <Col md={6}>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Project *</Form.Label>
                    <JobSiteSelect
                      onChange={(value) => setJobSiteId(value)}
                      companyId={
                        localCompanyId !== null ? localCompanyId : companyId
                      }
                      divisionId={divisionId}
                    />
                  </Form.Group>
                </Col>
              )}
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
                {/* name */}
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Name *</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    placeholder="Name *"
                    onChange={onNameChangeHandler}
                  />
                </Form.Group>
                <Form.Control.Feedback type="invalid">
                  Please provide a valid Name.
                </Form.Control.Feedback>
              </Col>

              <Col md={6}>
                {/* short desc */}
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Short Desc</Form.Label>
                  <Form.Control
                    type="text"
                    maxLength="255"
                    onInput={maxShortDescCheck}
                    placeholder="Short desc"
                    onChange={onShortDescChangeHandler}
                  />
                </Form.Group>
              </Col>

              <Col md={12}>
                {/* long desc */}
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Long Desc</Form.Label>
                  <Form.Control
                    as="textarea"
                    maxLength="500"
                    onInput={maxLongDescCheck}
                    placeholder="Long Desc"
                    onChange={onLongDescChangeHandler}
                  />
                </Form.Group>
              </Col>

              <Col md={6}>
                {/* latitude */}
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Latitude</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Latitude"
                    onChange={onLatitudeChangeHandler}
                    value={lat}
                  />
                </Form.Group>
              </Col>

              <Col md={6}>
                {/* longitude */}
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Longitude</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Longitude"
                    onChange={onLongitudeChangeHandler}
                    value={lng}
                  />
                </Form.Group>
              </Col>

              <Col md={6}>
                {/* inspection date time */}
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Inspection Date Time</Form.Label>
                  <Form.Control
                    type="datetime-local"
                    placeholder="Inspection Date Time"
                    onChange={onInspectionDateTimeChangeHandler}
                  />
                </Form.Group>
              </Col>

              <Col md={6}>
                {/* equipment id */}
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Equipment Name</Form.Label>
                  <CustomSelect
                    params={{
                      url: URLConstants.EQUIPMENTS_URL,
                    }}
                    onChange={(value) => {
                      setEquimentId(value);
                    }}
                  />
                </Form.Group>
              </Col>

              <Col md={6}>
                {/* miles hours */}
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Miles Hours</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Miles Hour"
                    onChange={onMilesHourChangeHandler}
                  />
                </Form.Group>
              </Col>

              <Col md={6}>
                {/* inspector id */}
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Inspector Name</Form.Label>
                  <EmployeeSelect
                    onChange={(value) => {
                      setInspectorId(value);
                    }}
                  />
                </Form.Group>
              </Col>

              <Col md={6}>
                {/* Notes */}
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Notes</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Notes"
                    onChange={onNotesChangeHandler}
                  />
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
export default NewInspection;
