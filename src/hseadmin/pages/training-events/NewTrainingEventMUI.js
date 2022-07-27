/* eslint-disable camelcase */
// @ts-ignore

import { Col, Form, Row } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
// import {useDispatch} from 'react-redux';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import Select from 'react-select';
import { Helmet } from 'react-helmet-async';
import { Button, Grid, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { fetchPOST } from '../../utils/NetworkUtils';
import URLConstants from '../../constants/URLConstants';
import CustomSelect from '../../components/widgets/CustomSelect';
import { KEY_COMPANY_ID, YES_NO_DATA } from '../../constants/Constants';
import { CustomBreadcrumbs, CustomDivider } from '../../utils/MUIStyle';
import CustomMultiSelect from '../../components/widgets/CustomMultiSelect';
import CompanySelect from '../../components/widgets/CompanySelect';
import DivisionSelect from '../../components/widgets/DivisionSelect';
import JobSiteSelect from '../../components/widgets/JobSiteSelect';
import { toServerDateTime } from '../../utils/Utils';
import EmployeeMultiSelect from '../../components/widgets/EmployeeMultiSelect';

const NewTrainingEventMUI = () => {
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
  const [proposedStartDate, setProposedStartDate] = useState('');
  const [proposedEndDate, setProposedEndDate] = useState('');
  const [actualStartDate, setActualStartDate] = useState('');
  const [actualEndDate, setActualEndDate] = useState('');
  const [expireDate, setExpireDate] = useState('');
  const [self, setSelf] = useState('');
  const [trainingEventStatusId, setTrainingEventStatusId] = useState(-1);
  const [trainingCoursesOptions, setTrainingCoursesOptions] = useState([]);
  const [companyId, setCompanyId] = useState(localCompanyId);
  const [divisionId, setDivisionId] = useState(localDivisionId);
  const [jobSiteId, setJobSiteId] = useState(localJobSiteId);
  const [eventEmployees, seteventEmployees] = useState([]);
  console.log('Employee ID', eventEmployees);

  useEffect(() => {}, []);

  const onTrainingEventSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
    event.preventDefault();
    if (name === '') {
      toast('Please Enter Training Event Name');
    } else if (self === '') {
      toast('Please Enter Self');
    } else if (trainingEventStatusId === -1) {
      toast('please select Training Event Status');
    } else if (companyId === -1) {
      toast('Please select Company');
    } else if (divisionId === -1) {
      toast('Please select Division');
    } else if (jobSiteId === -1) {
      toast('Please select Project');
    } else {
      const postData = {
        name,
        short_desc: shortDesc,
        long_desc: longDesc,
        proposed_start_date:
          proposedStartDate !== '' ? toServerDateTime(proposedStartDate) : null,
        // proposed_start_date: proposedStartDate
        //   ? toServerDateTime(proposedStartDate)
        //   : null,
        proposed_end_date: proposedEndDate
          ? toServerDateTime(proposedEndDate)
          : null,
        actual_start_date:
          actualStartDate !== '' ? toServerDateTime(actualStartDate) : null,
        // actual_start_date: actualStartDate
        //   ? toServerDateTime(actualStartDate)
        //   : null,
        actual_end_date:
          actualEndDate !== '' ? toServerDateTime(actualEndDate) : null,
        // actual_end_date: actualEndDate ? toServerDateTime(actualEndDate) : null,
        expire_date: expireDate !== '' ? toServerDateTime(expireDate) : null,
        // expire_date: expireDate ? toServerDateTime(expireDate) : null,
        self,
        training_event_status_id: trainingEventStatusId,
        training_courses: trainingCoursesOptions,
        training_event_employees: eventEmployees,
        division_id: localDivisionId !== -1 ? localDivisionId : divisionId,
        company_id: localCompanyId !== null ? localCompanyId : companyId,
        job_site_id: localJobSiteId !== -1 ? localJobSiteId : jobSiteId,
      };
      postTrainingEvent(postData);
    }
  };

  const postTrainingEvent = async (data) => {
    try {
      const url = URLConstants.TRAINING_EVENTS_URL;

      console.log('addTrainingEvents url =', url);

      const resData = await fetchPOST(url, data);

      console.log('addTrainingEvents --->', resData.data);

      history(`../../private/training-events/edit/${resData.data.id}`);
    } catch (error) {
      toast(error.message || 'Failed');
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

  const onProposedStartDateChangeHandler = (event) => {
    setProposedStartDate(event.target.value);
    console.log(event.target.value);
  };

  const onProposedEndDateChangeHandler = (event) => {
    console.log(event.target.value);
    setProposedEndDate(event.target.value);
  };

  const onActualStartDateChangeHandler = (event) => {
    console.log(event.target.value);
    setActualStartDate(event.target.value);
  };

  const onActualEndDateChangeHandler = (event) => {
    console.log(event.target.value);
    setActualEndDate(event.target.value);
  };

  const onExpireDateChangeHandler = (event) => {
    console.log(event.target.value);
    setExpireDate(event.target.value);
  };

  const onSelfChangeHandler = (selectedOption) => {
    setSelf(+selectedOption.value);
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
      <Helmet title="Add Training Event" />
      <Grid justifyContent="space-between" container spacing={10}>
        <Grid item>
          <Typography variant="h3" gutterBottom display="inline">
            Training Events
          </Typography>

          <CustomBreadcrumbs aria-label="Breadcrumb" mt={2}>
            <Link component={NavLink} to="/private/dashboard">
              Dashboard
            </Link>
            <Link component={NavLink} to="/private/training-events">
              Training Events
            </Link>
            <Typography>Add Training Event</Typography>
          </CustomBreadcrumbs>
        </Grid>
        <Grid item>
          <div>
            <NavLink to="/private/training-events">
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
          <Form
            noValidate
            validated={validated}
            onSubmit={onTrainingEventSubmit}
          >
            {/* Name Field */}
            <Row>
              {/* Company Id */}
              {localCompanyId === null && (
                <Col md={6}>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Company *</Form.Label>
                    <CompanySelect
                      onChange={(value) => {
                        setCompanyId(value);
                      }}
                    />
                    <Form.Control.Feedback type="invalid">
                      Please provide a valid company.
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
              )}

              {/* Division id */}
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
                    <Form.Control.Feedback type="invalid">
                      Please provide a valid division.
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
              )}
              {/* JobSite Id */}
              {localJobSiteId === -1 && (
                <Col md={6}>
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
                      Please provide a valid jobSite.
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
              )}
              <Col md={6}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Name *</Form.Label>
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
              <Col md={6}>
                {/* Short Desc Field */}
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
              <Col md={6}>
                {/* Long Desc Field */}
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Long Desc</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={2}
                    maxLength="500"
                    onInput={maxLongDescCheck}
                    placeholder="Long Desc"
                    onChange={onLongDescChangeHandler}
                  />
                </Form.Group>
              </Col>

              <Col md={6}>
                {/* Proposed Start Date */}
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Proposed Start Date</Form.Label>
                  <Form.Control
                    type="datetime-local"
                    placeholder="Proposed Start Date"
                    onChange={onProposedStartDateChangeHandler}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                {/* Proposed End Date */}
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Proposed End Date</Form.Label>
                  <Form.Control
                    type="datetime-local"
                    placeholder="Proposed End Date"
                    onChange={onProposedEndDateChangeHandler}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                {/* Actual Start Date */}
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Actual Start Date</Form.Label>
                  <Form.Control
                    type="datetime-local"
                    placeholder="Actual Start Date"
                    onChange={onActualStartDateChangeHandler}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                {/* Actual End Date */}
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Actual End Date</Form.Label>
                  <Form.Control
                    type="datetime-local"
                    placeholder="Actual End Date"
                    onChange={onActualEndDateChangeHandler}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                {/* Expire Date */}
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Expire Date</Form.Label>
                  <Form.Control
                    type="datetime-local"
                    placeholder="Expire Date"
                    onChange={onExpireDateChangeHandler}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                {/* Self */}
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Self *</Form.Label>
                  <Select
                    required
                    options={YES_NO_DATA.map((item) => {
                      return { value: item.id, label: item.name };
                    })}
                    onChange={onSelfChangeHandler}
                  />
                  <Form.Control.Feedback type="invalid">
                    Please provide a valid Self.
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>

              <Col md={6}>
                {/* Training Event Status Id */}
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Training Event Status *</Form.Label>
                  <CustomSelect
                    params={{
                      url: URLConstants.TRAINING_EVENT_STATUSES_URL,
                    }}
                    onChange={(value) => {
                      setTrainingEventStatusId(value);
                    }}
                  />
                  <Form.Control.Feedback type="invalid">
                    Please provide a valid Training Event Status.
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>

              {/* Training Course Field */}
              <Col md={6}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Training Course</Form.Label>
                  <CustomMultiSelect
                    params={{ url: URLConstants.TRAINING_COURSES_URL }}
                    onChange={(value) => {
                      // setTrainingCourses(value);
                      setTrainingCoursesOptions(value);
                    }}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Select Employee</Form.Label>
                  <EmployeeMultiSelect
                    onChange={(value) => {
                      seteventEmployees(value);
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
export default NewTrainingEventMUI;
