import { Col, Form, Modal, Row } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import { Link, NavLink, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Helmet } from 'react-helmet-async';
import { Button, Grid, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import URLConstants from '../../constants/URLConstants';
import { fetchGET, fetchPUT } from '../../utils/NetworkUtils';
import { CustomBreadcrumbs, CustomDivider } from '../../utils/MUIStyle';
import CompanySelect from '../../components/widgets/CompanySelect';
import DivisionSelect from '../../components/widgets/DivisionSelect';
import JobSiteSelect from '../../components/widgets/JobSiteSelect';

import JobItemsTable from './JobItemsTable';
import { KEY_COMPANY_ID } from '../../constants/Constants';
import NewJobItemForm from './NewJobItemForm';
import SignatureList from './SignatureList';
import PPEItemsTable from './PPEItemsTable';
import { getCurrentDate, toLocalDate, toServerDate } from '../../utils/Utils';

const EditJobMUI = () => {
  const localCompanyId = localStorage.getItem(KEY_COMPANY_ID);
  const localDivisionId = useSelector((state) => state.auth.selectedDivision);
  const localJobSiteId = useSelector((state) => state.auth.selectedJobSite);

  // console.log('------ localDivisionId>', localDivisionId);
  // console.log('------ localJobSiteId>', localJobSiteId);
  // console.log('------ localCompanyId>', localCompanyId);
  const [validated, setValidated] = useState(false);

  const history = useNavigate();

  const [name, setName] = useState('');
  // const [shortDesc, setShortDesc] = useState('');
  const [longDesc, setLongDesc] = useState('');
  const [companyId, setCompanyId] = useState('');
  const [divisionId, setDivisionId] = useState('');
  const [jobSiteId, setJobSiteId] = useState('');
  const [medicalFacilityContact, setMedicalFacilityContact] = useState('');
  const [musterPointAlarm, setMusterPointAlarm] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [jsaDate, setJsaDate] = useState('');
  const params = useParams();
  const { id } = useParams();

  const [job, setJob] = useState(null);

  // to handle modal
  const [showDocumentModal, setShowDocumentModal] = useState(false);
  const handleClose = () => {
    setShowDocumentModal(false);
    console.log('----->setReloadItems in handleClose');
  };

  useEffect(() => {
    if (job != null) {
      setName(job.name ? job.name : '');
      // setShortDesc(job.short_desc);
      setLongDesc(job.long_desc ? job.long_desc : '');
      setCompanyId(job.company_id);
      setDivisionId(job.division_id);
      setJobSiteId(job.job_site_id);
      setMedicalFacilityContact(job.medical_facility_contact);
      setMusterPointAlarm(job.muster_point_alarm);
      setLatitude(job.latitude ? job.latitude : '');
      setLongitude(job.longitude ? job.longitude : '');
      setJsaDate(job.jsa_date ? toLocalDate(job.jsa_date) : getCurrentDate());
    }
  }, [job]);

  useEffect(() => {
    console.log(`param is ${params.id}`);
    loadJob();
  }, []);

  const loadJob = async () => {
    try {
      const url = `${URLConstants.GET_JOB_URL}/${id}.json`;
      const response = await fetchGET(url);
      setJob(response.data);
    } catch (error) {
      toast(error.message || 'Failed');
    }
  };

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
        // short_desc: shortDesc,
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
      const url = `${URLConstants.GET_JOB_URL}/${id}.json`;

      await fetchPUT(url, data);

      history('../../private/jobs');
    } catch (error) {
      toast(error.message || 'Failed');
    }
  };

  const maxLongDescCheck = (object) => {
    if (object.target.value.length > object.target.maxLength) {
      object.target.value = object.target.value.slice(
        0,
        object.target.maxLength
      );
    }
  };
  // const onShortDescChangeHandler = (event) => {
  //   // console.log(event.target.value);
  //   setShortDesc(event.target.value);
  // };

  return (
    <>
      <Helmet title="Edit Job" />

      <Grid justifyContent="space-between" container spacing={10}>
        <Grid item>
          <Typography variant="h3" gutterBottom display="inline">
            Job
          </Typography>

          <CustomBreadcrumbs aria-label="Breadcrumb" mt={2}>
            <Link component={NavLink} to="/private/dashboard">
              Dashboard
            </Link>
            <Link component={NavLink} to="/private/incidents">
              Jobs
            </Link>
            <Typography>Edit Job</Typography>
          </CustomBreadcrumbs>
        </Grid>
        <Grid item>
          <div>
            <NavLink to="/private/Jobs">
              <Button variant="contained" color="primary">
                Back
              </Button>
            </NavLink>
          </div>
        </Grid>
      </Grid>
      <CustomDivider my={6} />
      {job && (
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Form noValidate validated={validated} onSubmit={onJobSubmit}>
              <Row>
                {/* Company id */}
                {localCompanyId === null && (
                  <Col md={4}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label>Company </Form.Label>
                      <CompanySelect
                        onChange={(value) => setCompanyId(value)}
                        entity={job.company}
                      />
                    </Form.Group>
                  </Col>
                )}
                {/* Division Id */}
                {localDivisionId === -1 && (
                  <Col md={4}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label>Division </Form.Label>
                      <DivisionSelect
                        onChange={(value) => setDivisionId(value)}
                        companyId={companyId}
                        entity={job.division}
                      />
                    </Form.Group>
                  </Col>
                )}
                {/* Job site id */}
                {localJobSiteId === -1 && (
                  <Col md={4}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label>Project</Form.Label>
                      <JobSiteSelect
                        onChange={(value) => setJobSiteId(value)}
                        companyId={companyId}
                        divisionId={divisionId}
                        entity={job.job_site}
                      />
                    </Form.Group>
                  </Col>
                )}
              </Row>
              <Row>
                {/* name */}
                <Col md={6}>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Name *</Form.Label>
                    <Form.Control
                      required
                      type="text"
                      placeholder="Name *"
                      onChange={(event) => {
                        setName(event.target.value);
                      }}
                      value={name}
                    />
                  </Form.Group>
                  <Form.Control.Feedback type="invalid">
                    Please provide a valid Name.
                  </Form.Control.Feedback>
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
                <Col md={6}>
                  {/* Description */}
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={2}
                      placeholder="Description"
                      maxLength="255"
                      onInput={maxLongDescCheck}
                      onChange={(event) => {
                        setLongDesc(event.target.value);
                      }}
                      value={longDesc}
                    />
                  </Form.Group>
                </Col>

                <Col md={6}>
                  {/* medical facility contact */}
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Medical Facility Contact</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Medical Facility Contact"
                      onChange={(event) => {
                        setMedicalFacilityContact(event.target.value);
                      }}
                      value={medicalFacilityContact}
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
                      onChange={(event) => {
                        setMusterPointAlarm(event.target.value);
                      }}
                      value={musterPointAlarm}
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
                      onChange={(event) => {
                        setLatitude(event.target.value);
                      }}
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
                      onChange={(event) => {
                        setLongitude(event.target.value);
                      }}
                      value={longitude}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Button variant="contained" type="submit" color="primary">
                Submit
              </Button>
            </Form>
            <br />
            <PPEItemsTable jobId={id} />
            <JobItemsTable jobId={id} />
            <SignatureList jobId={id} />
          </Grid>
        </Grid>
      )}

      <Modal
        size="xl"
        style={{ zIndex: '1000000' }}
        show={showDocumentModal}
        onHide={handleClose}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Item</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <NewJobItemForm close={handleClose} selectedJobId={id} />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default EditJobMUI;
