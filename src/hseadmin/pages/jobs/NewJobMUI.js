import { Col, Form, Row } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Helmet } from 'react-helmet-async';
import { Button, Grid, Typography } from '@mui/material';
import CompanySelect from '../../components/widgets/CompanySelect';
import { CustomBreadcrumbs, CustomDivider } from '../../utils/MUIStyle';
import DivisionSelect from '../../components/widgets/DivisionSelect';
import JobSiteSelect from '../../components/widgets/JobSiteSelect';
import { KEY_COMPANY_ID } from '../../constants/Constants';
import URLConstants from '../../constants/URLConstants';
import { fetchPOST } from '../../utils/NetworkUtils';
import { getCurrentDate, toServerDate } from '../../utils/Utils';

const NewJobMUI = () => {
  const localCompanyId = localStorage.getItem(KEY_COMPANY_ID);
  const localDivisionId = useSelector((state) => state.auth.selectedDivision);
  const localJobSiteId = useSelector((state) => state.auth.selectedJobSite);

  // console.log('------ localDivisionId>', localDivisionId);
  // console.log('------ localJobSiteId>', localJobSiteId);
  // console.log('------ localCompanyId>', localCompanyId);

  const [validated, setValidated] = useState(false);
  const history = useNavigate();

  const [name, setName] = useState('');
  const [shortDesc, setShortDesc] = useState('');
  const [longDesc, setLongDesc] = useState('');
  const [companyId, setCompanyId] = useState('');
  const [divisionId, setDivisionId] = useState('');
  const [jobSiteId, setJobSiteId] = useState('');
  const [medicalFacilityContact, setMedicalFacilityContact] = useState('');
  const [musterPointAlarm, setMusterPointAlarm] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [jsaDate, setJsaDate] = useState(getCurrentDate());
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
  useEffect(() => {
    getLocation();
  }, []);
  const onJobSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);
    event.preventDefault();

    if (name === '') {
      toast('Please enter Name');
    } else {
      const postData = {
        name: name,
        short_desc: shortDesc,
        long_desc: longDesc,
        company_id: localCompanyId !== null ? localCompanyId : companyId,
        division_id: localDivisionId !== -1 ? localDivisionId : divisionId,
        job_site_id: localJobSiteId !== -1 ? localJobSiteId : jobSiteId,
        medical_facility_contact: medicalFacilityContact,
        muster_point_alarm: musterPointAlarm,
        latitude: latitude,
        longitude: longitude,
        jsa_date: toServerDate(jsaDate),
      };
      postJob(postData);
    }
  };

  const postJob = async (data) => {
    try {
      // await dispatch(addJobs(data));

      const url = URLConstants.JOBS_URL;

      // console.log('addJobs url =', url);

      const resData = await fetchPOST(url, data);

      // console.log('addJobs --->', resData.data.id);

      history(`../../private/jobs/edit/${resData.data.id}`);
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

  const onMedicalFacilityContactChangeHandler = (event) => {
    // console.log(event.target.value);
    setMedicalFacilityContact(event.target.value);
  };

  const onMusterPointAlarmChangeHandler = (event) => {
    // console.log(event.target.value);
    setMusterPointAlarm(event.target.value);
  };

  const onLatitudeChangeHandler = (event) => {
    setLatitude(event.target.value);
  };
  const onLongitudeChangeHandler = (event) => {
    setLongitude(event.target.value);
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
      <Helmet title="Add Job" />

      <Grid justifyContent="space-between" container spacing={10}>
        <Grid item>
          <Typography variant="h3" gutterBottom display="inline">
            Job
          </Typography>

          <CustomBreadcrumbs aria-label="Breadcrumb" mt={2}>
            <Link component={NavLink} to="/private/dashboard">
              Dashboard
            </Link>
            <Link component={NavLink} to="/private/jobs">
              Jobs
            </Link>
            <Typography>Add Job</Typography>
          </CustomBreadcrumbs>
        </Grid>
        <Grid item>
          <div>
            <NavLink to="/private/jobs">
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
          <Form noValidate validated={validated} onSubmit={onJobSubmit}>
            <Row>
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
                {/* Description */}
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    row={2}
                    maxLength="255"
                    onInput={maxLongDescCheck}
                    placeholder="Description"
                    onChange={onLongDescChangeHandler}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>JSA Date</Form.Label>
                  <Form.Control
                    type="date"
                    placeholder="JSA Date"
                    onChange={(event) => {
                      setJsaDate(event.target.value);
                    }}
                    value={jsaDate}
                  />
                </Form.Group>
              </Col>
              {/* Company id */}
              {localCompanyId === null && (
                <Col md={6}>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Company </Form.Label>
                    <CompanySelect onChange={(value) => setCompanyId(value)} />
                  </Form.Group>
                </Col>
              )}

              {localDivisionId === -1 && (
                <Col md={6}>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Division </Form.Label>
                    <DivisionSelect
                      onChange={(value) => setDivisionId(value)}
                      companyId={companyId}
                    />
                  </Form.Group>
                </Col>
              )}

              {localJobSiteId === -1 && (
                <Col md={6}>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Project</Form.Label>
                    <JobSiteSelect
                      onChange={(value) => setJobSiteId(value)}
                      companyId={companyId}
                      divisionId={divisionId}
                    />
                  </Form.Group>
                </Col>
              )}

              <Col md={6}>
                {/* medical facility contact */}
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Medical Facility Contact</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Medical Facility Contact"
                    onChange={onMedicalFacilityContactChangeHandler}
                  />
                </Form.Group>
              </Col>

              <Col md={6}>
                {/* muster point alarm */}
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Muster Point Alarm</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Muster Point Alarm"
                    onChange={onMusterPointAlarmChangeHandler}
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

export default NewJobMUI;
