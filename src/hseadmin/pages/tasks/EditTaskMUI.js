import { Col, Form, Row } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from '@emotion/styled';
import { Link, NavLink, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import moment from 'moment';
import { Helmet } from 'react-helmet-async';
import { spacing } from '@mui/system';
import {
  Button,
  Grid,
  Typography,
  Card as MuiCard,
  CardContent,
  Select,
  MenuItem,
  Input,
  Paper,
} from '@mui/material';

import { toLocalDateTime, toServerDateTime } from '../../utils/Utils';
import { CustomBreadcrumbs, CustomDivider } from '../../utils/MUIStyle';
import { fetchGET, fetchPUT } from '../../utils/NetworkUtils';
import CompanySelect from '../../components/widgets/CompanySelect';
import DivisionSelect from '../../components/widgets/DivisionSelect';
import JobSiteSelect from '../../components/widgets/JobSiteSelect';
import { getTask } from '../../store/actions/tasks';
import CustomSelect from '../../components/widgets/CustomSelect';
import URLConstants from '../../constants/URLConstants';

const Card = styled(MuiCard)(spacing);

const EditTaskMUI = () => {
  const [validated, setValidated] = useState(false);

  const history = useNavigate();

  const [name, setName] = useState('');
  const [longDesc, setLongDesc] = useState('');
  const [shortDesc, setShortDesc] = useState('');
  const [priority, setPriority] = useState('');
  const [startDateTime, setStartDateTime] = useState('');
  const [endDateTime, setEndDateTime] = useState('');
  const [manpower, setManpower] = useState('');
  const [cost, setCost] = useState('');
  const [parentId, setParentId] = useState('');
  const [completedDateTime, setCompletedDateTime] = useState('');
  const [industryId, setIndustryId] = useState(-1);
  const [companyId, setCompanyId] = useState(-1);
  const [divisionId, setDivisionId] = useState(-1);
  const [jobSiteId, setJobSiteId] = useState(-1);

  const dispatch = useDispatch();

  const [task, setTask] = useState(null);

  const params = useParams();
  const { id } = useParams();

  const catnames = [
    'PERSONNEL/DOCUMENTATION',
    'TOOLS/EQUIPMENT',
    'PERSONAL PROTECTIVE EQUIPMENT',
    'SITE CONDITION',
    'COMMENTS/OTHER',
    'ADMIN',
    'MIRIAN WAGNER',
  ];

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };
  const [catName, setCatName] = React.useState([]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setCatName(typeof value === 'string' ? value.split(',') : value);
  };

  useEffect(() => {
    // eslint-disable-next-line camelcase
    if (task != null) {
      const date = new Date();
      const offset = date.getTimezoneOffset();
      console.log('time offset----->', offset);
      // console.log('time----->', task.start_date_time);
      const dt = moment(task.start_date_time).format('YYYY-MM-DDTHH:MM');
      console.log('time----->', dt);
      // console.log('time----->', dt);

      toLocalDateTime(task.start_date_time);

      setName(task.name);
      setLongDesc(task.long_desc);
      setShortDesc(task.short_desc);
      setPriority(task.priority);
      // setStartDateTime(toLocalDateTime(task.start_date_time));
      setStartDateTime(
        task.start_date_time !== null
          ? toLocalDateTime(task.start_date_time)
          : ''
      );
      // setEndDateTime(toLocalDateTime(task.end_date_time));
      setEndDateTime(
        task.end_date_time !== null ? toLocalDateTime(task.end_date_time) : ''
      );
      setManpower(task.manpower);
      setCost(task.cost);
      setParentId(task.parent_id);
      // setCompletedDateTime(toLocalDateTime(task.completed_date_time));
      setCompletedDateTime(
        task.completed_date_time !== null
          ? toLocalDateTime(task.completed_date_time)
          : ''
      );
      setIndustryId(task.industry_id);
      setCompanyId(task.company_id);
      setDivisionId(task.division_id);
      setJobSiteId(task.job_site_id);
    }
    // eslint-disable-next-line camelcase
  }, [task]);

  useEffect(() => {
    console.log(`param is ${params.id}`);
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      const url = `${URLConstants.GET_TASK_URL}/${id}.json`;

      console.log('getTask url =', url);

      const response = await fetchGET(url);

      console.log('EditTask -->', response.data);

      setTask(response.data);
    } catch (error) {
      toast(error.message || 'Failed');
    }
    await dispatch(getTask(id));
  };

  const onTaskSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
    event.preventDefault();
    // @ts-ignore
    if (name === '') {
      toast('Please Enter Task Name');
    } else {
      const postData = {
        id,
        name,
        long_desc: longDesc,
        short_desc: shortDesc,
        priority,
        start_date_time: toServerDateTime(startDateTime),
        end_date_time: toServerDateTime(endDateTime),
        manpower,
        cost,
        parent_id: parentId,
        completed_date_time: toServerDateTime(completedDateTime),
        industry_id: industryId,
        division_id: divisionId,
        company_id: companyId,
        job_site_id: jobSiteId,
      };
      postTask(postData);
    }
  };

  const postTask = async (data) => {
    try {
      const url = `${URLConstants.GET_TASK_URL}/${id}.json`;

      await fetchPUT(url, data);

      history('../../private/tasks');
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
  const onShortDescChangeHandler = (event) => {
    console.log(event.target.value);
    setShortDesc(event.target.value);
  };
  const onPriorityChangeHandler = (event) => {
    console.log(event.target.value);
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
      <Helmet title="Edit Task" />

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
            <Typography>Edit Task</Typography>
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
          {task && (
            <Form noValidate validated={validated} onSubmit={onTaskSubmit}>
              {/* Name Field */}
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Name *</Form.Label>
                    <Form.Control
                      required
                      as="textarea"
                      rows={2}
                      placeholder="Name *"
                      onChange={onNameChangeHandler}
                      value={name}
                    />
                    <Form.Control.Feedback type="invalid">
                      Please provide a valid name.
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>

                {/* Description */}
                <Col md={6}>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Description"
                      onChange={onLongDescChangeHandler}
                      value={longDesc}
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Short Desc</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Short Desc"
                      onChange={onShortDescChangeHandler}
                      value={shortDesc}
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Priority</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="Priority"
                      onChange={onPriorityChangeHandler}
                      value={priority}
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Start Date Time</Form.Label>
                    <Form.Control
                      type="datetime-local"
                      placeholder="Type"
                      onChange={onStartDateTimeChangeHandler}
                      value={startDateTime}
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>End Date Time</Form.Label>
                    <Form.Control
                      type="datetime-local"
                      placeholder="End Date Time"
                      onChange={onEndDateTimeChangeHandler}
                      value={endDateTime}
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>ManPower</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="Manpower"
                      onChange={onManpowerChangeHandler}
                      value={manpower}
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Cost</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Cost"
                      onChange={onCostChangeHandler}
                      value={cost}
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Parent</Form.Label>
                    <CustomSelect
                      params={{
                        url: URLConstants.TASKS_URL,
                      }}
                      onChange={(value) => {
                        setParentId(value);
                      }}
                      entity={task.parent_task}
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Completed Data Time</Form.Label>
                    <Form.Control
                      type="datetime-local"
                      placeholder="Completed Data Time"
                      onChange={onCompletedDateTimeChangeHandler}
                      value={completedDateTime}
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Industry Name</Form.Label>
                    <CustomSelect
                      params={{
                        url: URLConstants.INDUSTRIES_URL,
                      }}
                      onChange={(value) => {
                        setIndustryId(value);
                      }}
                      entity={task.industry}
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  {/* Company Id */}
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Company</Form.Label>
                    <CompanySelect
                      onChange={(value) => {
                        setCompanyId(value);
                      }}
                      entity={task.company}
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  {/* Division Id */}
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Division</Form.Label>
                    <DivisionSelect
                      onChange={(value) => {
                        setDivisionId(value);
                      }}
                      companyId={companyId}
                      entity={task.division}
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  {/* Job Site Id */}
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Project</Form.Label>
                    <JobSiteSelect
                      onChange={(value) => {
                        setJobSiteId(value);
                      }}
                      companyId={companyId}
                      divisionId={divisionId}
                      entity={task.job_site}
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

      <h5 className="sectitle">Manage Category</h5>
      <Grid container spacing={6}>
        <Grid item xs={6}>
          <Card mb={6}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Add Task category
              </Typography>
              <Paper mt={3}>
                <Form.Group className="mb-3">
                  <Form.Label>Select Task category </Form.Label>
                  <Select
                    value={catName}
                    onChange={handleChange}
                    input={<Input className="form-control" />}
                    MenuProps={MenuProps}
                  >
                    {catnames.map((catnames) => (
                      <MenuItem key={catnames} value={catnames}>
                        {catnames}
                      </MenuItem>
                    ))}
                  </Select>
                </Form.Group>
                <h6 className="or">
                  <span>or</span>
                </h6>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Add Category</Form.Label>
                  <Form.Control type="text" />
                </Form.Group>
                <Button mr={2} variant="contained" color="primary">
                  Submit
                </Button>
              </Paper>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={6}>
          <Card mb={6}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                List of category
              </Typography>
              <div className="catlist">
                <ul>
                  <li>Personal Protective Equipments</li>
                  <li>Category listed you are added here</li>
                  <li>Personal Protective Equipments</li>
                  <li>Trainning Courses completed</li>
                  <li>Personal Protective Equipments</li>
                  <li>Personal Protective Equipments</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <h5 className="sectitle">Manage Question</h5>
      <Grid container spacing={6}>
        <Grid item xs={6}>
          <Card mb={6}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Add Question/Answer
              </Typography>
              <Paper mt={3}>
                <Form.Group className="mb-3">
                  <Form.Label>Select category </Form.Label>
                  <Select
                    value={catName}
                    onChange={handleChange}
                    input={<Input className="form-control" />}
                    MenuProps={MenuProps}
                  >
                    {catnames.map((catnames) => (
                      <MenuItem key={catnames} value={catnames}>
                        {catnames}
                      </MenuItem>
                    ))}
                  </Select>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Question</Form.Label>
                  <Form.Control type="text" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Answer</Form.Label>
                  <Form.Control type="text" />
                </Form.Group>
                <Button mr={2} variant="contained" color="info" size="small">
                  Add other answer
                </Button>
                <div className="sub">
                  <Button
                    mr={2}
                    variant="contained"
                    color="primary"
                    size="Large"
                  >
                    Submit
                  </Button>
                </div>
              </Paper>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={6}>
          <Card mb={6}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Question List
              </Typography>
              <Paper mt={3}>
                <div className="queslist">
                  <ul>
                    <li>
                      <div classsName="que">
                        <strong>Question :</strong> Permits to work (excavation,
                        confined space entry, LOTO, etc.) are in place,
                        authorized and communicated to affected employees
                      </div>
                      <span>
                        <strong>Ans</strong>
                      </span>
                      <div className="ans">
                        <div className="opt">
                          1. <span>ADEQUATE</span>
                        </div>
                        <div className="opt">
                          2. <span>DEFICIENT</span>
                        </div>
                        <div className="opt">
                          3. <span>N/A</span>
                        </div>
                      </div>
                    </li>
                    <li>
                      <div classsName="que">
                        <strong>Question :</strong> Permits to work (excavation,
                        confined space entry, LOTO, etc.) are in place,
                        authorized and communicated to affected employees
                      </div>
                      <span>
                        <strong>Ans</strong>
                      </span>
                      <div className="ans">
                        <div className="opt">
                          1. <span>ADEQUATE</span>
                        </div>
                        <div className="opt">
                          2. <span>DEFICIENT</span>
                        </div>
                        <div className="opt">
                          3. <span>N/A</span>
                        </div>
                      </div>
                    </li>
                    <li>
                      <div classsName="que">
                        <strong>Question :</strong> Permits to work (excavation,
                        confined space entry, LOTO, etc.) are in place,
                        authorized and communicated to affected employees
                      </div>
                      <span>
                        <strong>Ans</strong>
                      </span>
                      <div className="ans">
                        <div className="opt">
                          1. <span>ADEQUATE</span>
                        </div>
                        <div className="opt">
                          2. <span>DEFICIENT</span>
                        </div>
                        <div className="opt">
                          3. <span>N/A</span>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </Paper>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};
export default EditTaskMUI;
