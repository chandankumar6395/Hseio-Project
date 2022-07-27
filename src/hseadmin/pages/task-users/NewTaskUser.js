/* eslint-disable camelcase */
// @ts-ignore

import { Button, Card, Col, Form, Row } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
// import {useDispatch} from 'react-redux';
import { fetchPOST } from '../../utils/NetworkUtils';
import { useNavigate } from 'react-router-dom';
import URLConstants from '../../constants/URLConstants';
import CustomSelect from '../../components/widgets/CustomSelect';
import { STATUSES_DATA } from '../../constants/Constants';
import Select from 'react-select';
import UserSelect from '../../components/widgets/UserSelect';

const NewTaskUser = () => {
  const [validated, setValidated] = useState(false);

  const history = useNavigate();

  const [taskId, setTaskId] = useState(-1);
  const [userId, setUserId] = useState(-1);
  const [statusId, setStatusId] = useState('');
  const [jobSiteCrewId, setJobSiteCrewId] = useState(-1);
  const [startDateTime, setStartDateTime] = useState('');
  const [endDateTime, setEndDateTime] = useState('');
  const [completedDateTime, setCompletedDateTime] = useState('');

  useEffect(() => {}, []);

  const onTaskUserSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
    event.preventDefault();
    const postData = {
      task_id: taskId,
      user_id: userId,
      status_id: statusId,
      job_site_crew_id: jobSiteCrewId,
      start_date_time: startDateTime,
      end_date_time: endDateTime,
      completed_date_time: completedDateTime,
    };
    postTaskUser(postData);
  };

  const postTaskUser = async (data) => {
    try {
      await fetchPOST(URLConstants.TASK_USERS_URL, data);
      history('../../task-users');
    } catch (error) {
      console.log(error);
    }
  };

  const onStatusChangeHandler = (selectedOption) => {
    setStatusId(+selectedOption.value);
    console.log(selectedOption.value);
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
            Add Task User
            <Button
              className="btn-sm"
              variant="primary"
              type="button"
              style={{
                float: 'right',
              }}
              onClick={() => {
                history(-1);
              }}
            >
              Back
            </Button>
          </Card.Header>
          <Card.Body>
            <Form noValidate validated={validated} onSubmit={onTaskUserSubmit}>
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
              </Row>
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};
export default NewTaskUser;
