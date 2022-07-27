import { Col, Form, Row } from 'react-bootstrap';
import React, { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Button, Grid, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { fetchPOST } from '../../utils/NetworkUtils';
import URLConstants from '../../constants/URLConstants';
import CustomSelect from '../../components/widgets/CustomSelect';
import JobSiteSelect from '../../components/widgets/JobSiteSelect';
import DivisionSelect from '../../components/widgets/DivisionSelect';
import CompanySelect from '../../components/widgets/CompanySelect';
import { CustomBreadcrumbs, CustomDivider } from '../../utils/MUIStyle';
import { KEY_COMPANY_ID } from '../../constants/Constants';

const NewTaskMUI = () => {
  const localCompanyId = localStorage.getItem(KEY_COMPANY_ID);

  const localDivisionId = useSelector((state) => state.auth.selectedDivision);

  const localJobSiteid = useSelector((state) => state.auth.selectedJobSite);

  const [validated, setValidated] = useState(false);

  const history = useNavigate();

  const [name, setName] = useState('');
  const [longDesc, setLongDesc] = useState('');
  const [shortDesc, setShortDesc] = useState('');
  const [priority, setPriority] = useState(0);
  const [startDateTime, setStartDateTime] = useState(null);
  const [endDateTime, setEndDateTime] = useState(null);
  const [manpower, setManpower] = useState('');
  const [cost, setCost] = useState('');
  const [parentId, setParentId] = useState(null);
  const [completedDateTime, setCompletedDateTime] = useState(null);
  const [industryId, setIndustryId] = useState(null);
  const [companyId, setCompanyId] = useState(null);
  const [divisionId, setDivisionId] = useState(null);
  const [jobSiteId, setJobSiteId] = useState(null);

  useEffect(() => {}, []);

  const onATaskSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);
    event.preventDefault();

    if (name === '') {
      toast('Please Enter Task Name');
    } else {
      const postData = {
        name,
        long_desc: longDesc,
        short_desc: shortDesc,
        priority,
        start_date_time: startDateTime,
        end_date_time: endDateTime,
        manpower,
        cost,
        parent_id: parentId,
        completed_date_time: completedDateTime,
        industry_id: industryId,
        company_id: companyId,
        division_id: divisionId,
        job_site_id: jobSiteId,
      };
      postTask(postData);
    }
  };

  const postTask = async (data) => {
    try {
      await fetchPOST(URLConstants.TASKS_URL, data);
      history('../../private/tasks');
    } catch (error) {
      console.log(error);
    }
  };
  const onNameChangeHandler = (event) => {
    // console.log(event.target.value);
    setName(event.target.value);
  };

  const onLongDescChangeHandler = (event) => {
    // console.log(event.target.value);
    setLongDesc(event.target.value);
  };
  const onShortDescChangeHandler = (event) => {
    // console.log(event.target.value);
    setShortDesc(event.target.value);
  };
  const onPriorityChangeHandler = (event) => {
    // console.log(event.target.value);
    setPriority(event.target.value);
  };
  const onStartDateTimeChangeHandler = (event) => {
    console.log(event.target.value);
    setStartDateTime(event.target.value);
  };
  const onEndDateTimeChangeHandler = (event) => {
    console.log(event.target.value);
    setEndDateTime(event.target.value);
  };
  const onManpowerChangeHandler = (event) => {
    console.log(event.target.value);
    setManpower(event.target.value);
  };
  const onCostChangeHandler = (event) => {
    console.log(event.target.value);
    setCost(event.target.value);
  };
  const onCompletedDateTimeChangeHandler = (event) => {
    console.log(event.target.value);
    setCompletedDateTime(event.target.value);
  };
  return (
    <>
      <Helmet title="Add Task" />

      <Grid justifyContent="space-between" container spacing={10}>
        <Grid item>
          <Typography variant="h3" gutterBottom display="inline">
            Tasks
          </Typography>

          <CustomBreadcrumbs aria-label="Breadcrumb" mt={2}>
            <Link component={NavLink} to="/">
              Dashboard
            </Link>
            <Link component={NavLink} to="/private/tasks">
              Tasks
            </Link>
            <Typography>Add Task</Typography>
          </CustomBreadcrumbs>
        </Grid>
        <Grid item>
          <div>
            <NavLink to="/private/tasks">
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
          <Form noValidate validated={validated} onSubmit={onATaskSubmit}>
            <Row>
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
              <Col md={6}>
                {/* Description Field */}
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
              <Col md={6}>
                {/* Short Desc Field */}
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Short Desc</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Short Desc"
                    onChange={onShortDescChangeHandler}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                {/* Priority */}
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Priority</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Priority"
                    onChange={onPriorityChangeHandler}
                  />
                </Form.Group>
              </Col>

              <Col md={6}>
                {/* Start Date Time */}
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Start Date Time</Form.Label>
                  <Form.Control
                    type="datetime-local"
                    placeholder="Start Date Time"
                    onChange={onStartDateTimeChangeHandler}
                  />
                </Form.Group>
              </Col>

              <Col md={6}>
                {/* End Date Time */}
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>End Date Time</Form.Label>
                  <Form.Control
                    type="datetime-local"
                    placeholder="End Date Time"
                    onChange={onEndDateTimeChangeHandler}
                  />
                </Form.Group>
              </Col>

              <Col md={6}>
                {/* manpower */}
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>manpower</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="manpower"
                    onChange={onManpowerChangeHandler}
                  />
                </Form.Group>
              </Col>

              <Col md={6}>
                {/* Cost */}
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Cost</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Cost"
                    onChange={onCostChangeHandler}
                  />
                </Form.Group>
              </Col>

              <Col md={6}>
                {/* Parent Id */}
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label> Parent</Form.Label>
                  <CustomSelect
                    params={{
                      url: URLConstants.TASKS_URL,
                    }}
                    onChange={(value) => {
                      setParentId(value);
                    }}
                  />
                </Form.Group>
              </Col>

              <Col md={6}>
                {/* Completed Date Time */}
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Completed Date Time</Form.Label>
                  <Form.Control
                    type="datetime-local"
                    placeholder="Completed Date Time"
                    onChange={onCompletedDateTimeChangeHandler}
                  />
                </Form.Group>
              </Col>

              <Col md={6}>
                {/* Industry Id */}
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Industry</Form.Label>
                  <CustomSelect
                    params={{
                      url: URLConstants.INDUSTRIES_URL,
                    }}
                    onChange={(value) => {
                      setIndustryId(value);
                    }}
                  />
                  <Form.Control.Feedback type="invalid">
                    Please provide a valid industry.
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>

              {localCompanyId === null && (
                <Col md={6}>
                  {/* Company Id */}
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Company</Form.Label>
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

              {localDivisionId === -1 && (
                <Col md={6}>
                  {/* Division id */}
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Division</Form.Label>
                    <DivisionSelect
                      onChange={(value) => {
                        setDivisionId(value);
                      }}
                      companyId={companyId}
                    />
                    <Form.Control.Feedback type="invalid">
                      Please provide a valid division.
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
              )}

              {localJobSiteid && (
                <Col md={6}>
                  {/* JobSite Id */}
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Project</Form.Label>
                    <JobSiteSelect
                      onChange={(value) => {
                        setJobSiteId(value);
                      }}
                      companyId={companyId}
                      divisionId={divisionId}
                    />
                    <Form.Control.Feedback type="invalid">
                      Please provide a valid jobSite.
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
              )}
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

export default NewTaskMUI;
