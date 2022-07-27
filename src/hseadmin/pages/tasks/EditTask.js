import { Button, Card, Col, Form, Row } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { NavLink, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import moment from 'moment';
import URLConstants from '../../constants/URLConstants';
import { fetchGET, fetchPUT } from '../../utils/NetworkUtils';
import CompanySelect from '../../components/widgets/CompanySelect';
import DivisionSelect from '../../components/widgets/DivisionSelect';
import JobSiteSelect from '../../components/widgets/JobSiteSelect';
import { getTask } from '../../store/actions/tasks';
import CustomSelect from '../../components/widgets/CustomSelect';
import { toLocalDateTime, toServerDateTime } from '../../utils/Utils';

const EditTask = () => {
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

  useEffect(() => {
    // eslint-disable-next-line camelcase
    if (task != null) {
      const date = new Date();
      const offset = date.getTimezoneOffset();
      // console.log('time offset----->', offset);
      // console.log('time----->', task.start_date_time);
      const dt = moment(task.start_date_time).format('YYYY-MM-DDTHH:MM');
      console.log('time----->', dt);
      console.log('time----->', dt);

      toLocalDateTime(task.start_date_time);

      setName(task.name);
      setLongDesc(task.long_desc);
      setShortDesc(task.short_desc);
      setPriority(task.priority);
      setStartDateTime(toLocalDateTime(task.start_date_time));
      setEndDateTime(toLocalDateTime(task.end_date_time));
      setManpower(task.manpower);
      setCost(task.cost);
      setParentId(task.parent_id);
      setCompletedDateTime(toLocalDateTime(task.completed_date_time));
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
    <Row>
      <Col>
        <Card>
          <Card.Header>
            Edit Task Details
            <NavLink to="/private/tasks">
              <Button
                className="btn-sm"
                variant="primary"
                type="button"
                style={{ float: 'right' }}
              >
                Back
              </Button>
            </NavLink>
          </Card.Header>
          {task && (
            <Card.Body>
              <Form noValidate validated={validated} onSubmit={onTaskSubmit}>
                {/* Name Field */}
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label>Name</Form.Label>
                      <Form.Control
                        required
                        as="textarea"
                        rows={2}
                        placeholder="Name"
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
                        type="text"
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
                        type="text"
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
                <Button variant="primary" type="submit">
                  Submit
                </Button>
              </Form>
            </Card.Body>
          )}
        </Card>
      </Col>
    </Row>
  );
};
export default EditTask;
