import React, { useEffect, useState } from 'react';
import { Link, NavLink, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Col, Form, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import moment from 'moment';
import { Helmet } from 'react-helmet-async';
import { Grid, Typography, Button } from '@mui/material';
import URLConstants from '../../constants/URLConstants';
import { fetchGET, fetchPUT } from '../../utils/NetworkUtils';

import CompanySelect from '../../components/widgets/CompanySelect';
import DivisionSelect from '../../components/widgets/DivisionSelect';
import CustomSelect from '../../components/widgets/CustomSelect';
import { toLocalDateTime, toServerDateTime } from '../../utils/Utils';
import JobSiteSelect from '../../components/widgets/JobSiteSelect';
import { KEY_COMPANY_ID } from '../../constants/Constants';
import { CustomBreadcrumbs, CustomDivider } from '../../utils/MUIStyle';
import EmployeeSelect from '../../components/widgets/EmployeeSelect';

const EditEquipment = () => {
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
  const [companyId, setCompanyId] = useState(-1);
  const [divisionId, setDivisionId] = useState(-1);
  const [jobSiteId, setJobSiteId] = useState('');
  const [equipmentId, setEquipmentId] = useState(-1);
  const [milesHours, setMilesHours] = useState('');
  const [inspectorId, setInspectorId] = useState('');
  const [notes, setNotes] = useState('');

  const [inspection, setInspection] = useState(null);

  const { id } = useParams();
  const params = useParams();
  useEffect(() => {
    if (inspection != null) {
      const date = new Date();
      const offset = date.getTimezoneOffset();
      console.log('time offset----->', offset);
      console.log('time----->', inspection.start_date_time);
      const dt = moment(inspection.start_date_time).format('YYYY-MM-DDTHH:MM');
      console.log('time----->', dt);
      console.log('time----->', dt);

      toLocalDateTime(inspection.start_date_time);

      setName(inspection.name);
      setShortDesc(inspection.short_desc);
      setLongDesc(inspection.long_desc);
      setLatitude(inspection.latitude);
      setLongitude(inspection.longitude);
      // setInspectionDateTime(toLocalDateTime(inspection.inspection_date_time));
      setInspectionDateTime(
        inspection.inspection_date_time
          ? toLocalDateTime(inspection.inspection_date_time)
          : ''
      );
      setCompanyId(inspection.company_id);
      setDivisionId(inspection.division_id);
      setJobSiteId(inspection.job_site_id);
      setEquipmentId(inspection.equipment_id);
      setMilesHours(inspection.miles_hours);
      setInspectorId(inspection.inspector_id);
      setNotes(inspection.notes);
    }
  }, [inspection]);

  useEffect(() => {
    console.log(`param is ${params.id}`);
    loadInspections();
  }, []);

  const loadInspections = async () => {
    try {
      const url = `${URLConstants.GET_INSPECTION_URL}/${id}.json`;

      console.log('getInspections url =', url);

      const response = await fetchGET(url);

      console.log('getInspections -->', response.data);

      setInspection(response.data);
    } catch (error) {
      toast(error.message || 'Failed');
    }
  };

  const onInspectionSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);
    event.preventDefault();
    // @ts-ignore
    const postData = {
      id,
      name,
      long_desc: longDesc,
      short_desc: shortDesc,
      latitude: latitude,
      longitude: longitude,
      // inspection_date_time: toServerDateTime(inspectionDateTime),
      inspection_date_time:
        inspectionDateTime !== '' ? toServerDateTime(inspectionDateTime) : null,
      division_id: localDivisionId !== -1 ? localDivisionId : divisionId,
      company_id: localCompanyId !== null ? localCompanyId : companyId,
      job_site_id: localJobSiteId !== -1 ? localJobSiteId : jobSiteId,
      equipment_id: equipmentId,
      miles_hours: milesHours,
      inspector_id: inspectorId,
      notes: notes,
    };
    postInspoection(postData);
  };
  const postInspoection = async (data) => {
    try {
      const url = `${URLConstants.GET_INSPECTION_URL}/${id}.json`;

      await fetchPUT(url, data);

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
    console.log(event.target.value);
    setShortDesc(event.target.value);
  };
  const onLongDescChangeHandler = (event) => {
    console.log(event.target.value);
    setLongDesc(event.target.value);
  };
  const onLatitudeChangeHandler = (event) => {
    setLatitude(event.target.value);
  };
  const onLongitudeChangeHandler = (event) => {
    setLongitude(event.target.value);
  };
  const onInspectionDateTimeChangeHandler = (event) => {
    // console.log(event.target.value);
    setInspectionDateTime(event.target.value);
  };

  const onMilesHoursChangeHandler = (event) => {
    console.log(event.target.value);
    setMilesHours(event.target.value);
  };
  const onNotesChangeHandler = (event) => {
    console.log(event.target.value);
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
      <Helmet title="Edit Inspection" />

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
            <Typography>Edit Inspection</Typography>
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
          {inspection && (
            <Form
              noValidate
              validated={validated}
              onSubmit={onInspectionSubmit}
            >
              {/* Name Field */}
              <Row>
                <Col md={6}>
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
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Short Desc</Form.Label>
                    <Form.Control
                      type="text"
                      maxLength="255"
                      onInput={maxShortDescCheck}
                      placeholder="Short Desc"
                      onChange={onShortDescChangeHandler}
                      value={shortDesc}
                    />
                  </Form.Group>
                </Col>
                {/* Long Desc */}
                <Col md={6}>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Long Desc</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={2}
                      maxLength="500"
                      onInput={maxLongDescCheck}
                      placeholder="Long Desc"
                      onChange={onLongDescChangeHandler}
                      value={longDesc}
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
                      value={latitude}
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
                      value={longitude}
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  {/* inspection date time */}
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Inspection Date Time</Form.Label>
                    <Form.Control
                      type="datetime-local"
                      placeholder="Incident Date/Time:"
                      onChange={onInspectionDateTimeChangeHandler}
                      value={inspectionDateTime}
                    />
                  </Form.Group>
                </Col>
                {localCompanyId === null && (
                  <Col md={6}>
                    {/* Company Id */}
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label>Company *</Form.Label>
                      <CompanySelect
                        onChange={(value) => setCompanyId(value)}
                        entity={inspection.company}
                      />
                    </Form.Group>
                  </Col>
                )}
                {localDivisionId === -1 && (
                  <Col md={6}>
                    {/* Division Id */}
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label>Division *</Form.Label>
                      <DivisionSelect
                        onChange={(value) => setDivisionId(value)}
                        companyId={companyId}
                        entity={inspection.division}
                      />
                    </Form.Group>
                  </Col>
                )}
                {jobSiteId === -1 && (
                  <Col md={6}>
                    {/* Job Site Id */}
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label>Project *</Form.Label>
                      <JobSiteSelect
                        onChange={(value) => setJobSiteId(value)}
                        companyId={companyId}
                        divisionId={divisionId}
                        entity={inspection.job_site}
                      />
                    </Form.Group>
                  </Col>
                )}
                <Col md={6}>
                  {/* Equipment Id */}
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Equipment Name</Form.Label>
                    <CustomSelect
                      params={{ url: URLConstants.EQUIPMENTS_URL }}
                      onChange={(value) => {
                        setEquipmentId(value);
                      }}
                      entity={inspection.equipment}
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Miles Hours</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Miles Hours"
                      onChange={onMilesHoursChangeHandler}
                      value={milesHours}
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  {/* Inspection Id */}
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Inspector</Form.Label>
                    <EmployeeSelect
                      params={{
                        url: URLConstants.EMPLOYEES_URL,
                      }}
                      onChange={(value) => {
                        setInspectorId(value);
                      }}
                      entity={inspection.inspector}
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Notes</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Notes"
                      onChange={onNotesChangeHandler}
                      value={notes}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Button variant="contained" type="submit" color="primary">
                Submit
              </Button>
            </Form>
          )}
        </Grid>
      </Grid>
    </>
  );
};
export default EditEquipment;
