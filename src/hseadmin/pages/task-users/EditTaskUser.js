/* eslint-disable camelcase */
import { Button, Card, Col, Form, Row } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import CustomSelect from '../../components/widgets/CustomSelect';
import URLConstants from '../../constants/URLConstants';
import { fetchGET, fetchPUT } from '../../utils/NetworkUtils';
import { toast } from 'react-toastify';
import { STATUSES_DATA } from '../../constants/Constants';
import Select from 'react-select';
import UserSelect from '../../components/widgets/UserSelect';
import moment from 'moment';
import { toLocalDateTime, toServerDateTime } from '../../utils/Utils';

const EditTaskUser = () => {
  const [validated, setValidated] = useState(false);

  const history = useNavigate();

  const [taskId, setTaskId] = useState(-1);
  const [userId, setUserId] = useState(-1);
  const [statusId, setStatusId] = useState('');
  const [jobSiteCrewId, setJobSiteCrewId] = useState(-1);
  const [startDateTime, setStartDateTime] = useState('');
  const [endDateTime, setEndDateTime] = useState('');
  const [completedDateTime, setCompletedDateTime] = useState('');
  const [taskUser, setTaskUser] = useState(null);
  const [selectedOnStatusIdOption, setSelectedOnStatusIdOption] = useState({});

  const params = useParams();
  const { id } = useParams();

  useEffect(() => {
    if (taskUser != null) {
      const date = new Date();
      const offset = date.getTimezoneOffset();
      console.log('time offset----->', offset);
      console.log('time----->', taskUser.start_date_time);
      const dt = moment(taskUser.start_date_time).format('YYYY-MM-DDTHH:MM');
      console.log('time----->', dt);
      console.log('time----->', dt);

      toLocalDateTime(taskUser.start_date_time);
      setTaskId(taskUser.task_id);
      setUserId(taskUser.user_id);
      setStatusId(taskUser.status_id);
      setJobSiteCrewId(taskUser.job_site_crew_id);
      setStartDateTime(toLocalDateTime(taskUser.start_date_time));
      setEndDateTime(toLocalDateTime(taskUser.end_date_time));
      setCompletedDateTime(toLocalDateTime(taskUser.completed_date_time));
      setSelectedOnStatusIdOption({
        value: taskUser.status_id,
        label: STATUSES_DATA.find((x) => x.id === taskUser.status_id).name,
      });
    }
  }, [taskUser]);

  useEffect(() => {
    console.log(`param is ${params.id}`);
    loadTaskUser();
  }, []);

  const loadTaskUser = async () => {
    try {
      const url = `${URLConstants.GET_TASK_USER_URL}/${id}.json`;
      const response = await fetchGET(url);
      setTaskUser(response.data);
    } catch (error) {
      toast(error.message || 'Failed');
    }
  };

  const onTaskUserSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
    event.preventDefault();
    const postData = {
      id,
      task_id: taskId,
      user_id: userId,
      status_id: statusId,
      job_site_crew_id: jobSiteCrewId,
      start_date_time: toServerDateTime(startDateTime),
      end_date_time: toServerDateTime(endDateTime),
      completed_date_time: toServerDateTime(completedDateTime),
    };
    postTaskUser(postData);
  };

  const postTaskUser = async (data) => {
    try {
      const url = `${URLConstants.GET_TASK_USER_URL}/${id}.json`;

      await fetchPUT(url, data);

      history('../../task-users');
    } catch (error) {
      toast(error.message || 'Failed');
    }
  };

  const onStatusChangeHandler = (selectedOption) => {
    setStatusId(+selectedOption.value);
    setSelectedOnStatusIdOption(selectedOption);
  };
  const onStartDateTimeChangeHandler = (event) => {
    console.log(event.target.value);
    setStartDateTime(event.target.value);
  };

  const onEndDateTimeChangeHandler = (event) => {
    console.log(event.target.value);
    setEndDateTime(event.target.value);
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
            Edit Task User
            <NavLink to="/task-users">
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
          {taskUser && (
            <Card.Body>
              <Form
                noValidate
                validated={validated}
                onSubmit={onTaskUserSubmit}
              >
                <Row>
                  {/* Task */}
                  <Col md={6}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label>Task</Form.Label>
                      <CustomSelect
                        params={{
                          url: URLConstants.TASKS_URL,
                        }}
                        onChange={(value) => {
                          setTaskId(value);
                        }}
                        entity={taskUser.task}
                      />
                      <Form.Control.Feedback type="invalid">
                        Please provide a valid task.
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    {/* Username */}
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label>User Name</Form.Label>
                      <UserSelect
                        onChange={(value) => {
                          setUserId(value);
                        }}
                        entity={taskUser.user}
                      />
                      <Form.Control.Feedback type="invalid">
                        Please provide a valid user.
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    {/* Status */}
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label>Status</Form.Label>
                      <Select
                        required
                        options={STATUSES_DATA.map((status) => {
                          return { value: status.id, label: status.name };
                        })}
                        onChange={onStatusChangeHandler}
                        value={selectedOnStatusIdOption}
                      />
                    </Form.Group>
                  </Col>

                  <Col md={6}>
                    {/* Job Site Crew */}
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label>Project Crew </Form.Label>
                      <CustomSelect
                        params={{
                          url: URLConstants.JOB_SITE_CREWS_URL,
                        }}
                        onChange={(value) => {
                          setJobSiteCrewId(value);
                        }}
                        entity={taskUser.job_site_crew}
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
                        value={startDateTime}
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
                        value={endDateTime}
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
                        value={completedDateTime}
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

export default EditTaskUser;
