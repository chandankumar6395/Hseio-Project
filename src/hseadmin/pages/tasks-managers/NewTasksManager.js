import { Button, Card, Col, Form, Row } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { fetchPOST } from '../../utils/NetworkUtils';
import URLConstants from '../../constants/URLConstants';
import CustomSelect from '../../components/widgets/CustomSelect';

const NewTasksManager = () => {
  const [validated, setValidated] = useState(false);

  const history = useNavigate();

  const [taskId, setTaskId] = useState(-1);
  const [managerId, setManagerId] = useState(-1);

  useEffect(() => {}, []);

  const onTasksManagerSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      console.log('I am here too');
      console.log(managerId);
      event.preventDefault();
      event.stopPropagation();
    } else {
      console.log('I am here');
      event.preventDefault();
      const postData = {
        task_id: taskId,
        manager_id: 1,
      };
      postTasksManager(postData);
    }
    setValidated(true);
  };

  const postTasksManager = async (data) => {
    try {
      await fetchPOST(URLConstants.TASKS_MANAGERS_URL, data);
      history('../../tasks-managers');
    } catch (error) {
      console.log(error);
    }
  };
  const onManagerIdChangeHandler = (event) => {
    console.log(event.target.value);
    setManagerId(event.target.value);
  };

  return (
    <Row>
      <Col>
        <Card>
          <Card.Header>
            Add Task Managers
            <>
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
            </>
          </Card.Header>
          <Card.Body>
            <Form
              noValidate
              validated={validated}
              onSubmit={onTasksManagerSubmit}
            >
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Task</Form.Label>
                    <CustomSelect
                      params={{
                        url: URLConstants.TASKS_URL,
                        task_id: 1,
                      }}
                      onChange={(value) => {
                        setTaskId(value);
                      }}
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  {/* Manager */}
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Manager</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Manager"
                      onChange={onManagerIdChangeHandler}
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

export default NewTasksManager;
