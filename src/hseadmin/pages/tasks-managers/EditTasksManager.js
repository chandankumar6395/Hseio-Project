import { Button, Card, Col, Form, Row } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import URLConstants from '../../constants/URLConstants';
import { fetchGET, fetchPUT } from '../../utils/NetworkUtils';
import { toast } from 'react-toastify';
import CustomSelect from '../../components/widgets/CustomSelect';
import CompanySelect from '../../components/widgets/CompanySelect';

const EditTasksManager = () => {
  const [validated, setValidated] = useState(false);

  const history = useNavigate();

  const [taskId, setTaskId] = useState(-1);
  const [managerId, setManagerId] = useState(-1);
  const [tasksManager, setTaskManager] = useState(null);

  const params = useParams();
  const { id } = useParams();

  useEffect(() => {
    if (tasksManager != null) {
      setTaskId(tasksManager.task.name);
      setManagerId(tasksManager.manager_id);
    }
  }, [tasksManager]);

  useEffect(() => {
    console.log(`param is ${params.id}`);
    loadTasksManagers();
  }, []);

  const loadTasksManagers = async () => {
    try {
      const url = `${URLConstants.GET_TASKS_MANAGER_URL}/${id}.json`;
      const response = await fetchGET(url);
      setTaskManager(response.data);
    } catch (error) {
      toast(error.message || 'Failed');
    }
  };

  const onTasksManagersSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
    event.preventDefault();
    const postData = {
      id,
      taskId,
      managerId,
    };
    postTasksManagers(postData);
  };

  const postTasksManagers = async (data) => {
    try {
      const url = `${URLConstants.GET_TASKS_MANAGER_URL}/${id}.json`;

      await fetchPUT(url, data);

      history('../../tasks-managers');
    } catch (error) {
      toast(error.message || 'Failed');
    }
  };

  return (
    <Row>
      <Col>
        <Card>
          <Card.Header>
            Edit Tasks Managers
            <NavLink to="/tasks-Managers">
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
          {tasksManager !== null && (
            <Card.Body>
              <Form
                noValidate
                validated={validated}
                onSubmit={onTasksManagersSubmit}
              >
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label>Question</Form.Label>
                      <CustomSelect
                        params={{
                          url: URLConstants.TASKS_URL,
                        }}
                        onChange={(value) => {
                          setTaskId(value);
                        }}
                        entity={tasksManager.task}
                      />
                      <Form.Control.Feedback type="invalid">
                        Please provide a valid task.
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label>manager </Form.Label>
                      {tasksManager && (
                        <CompanySelect
                          onChange={(value) => setManagerId(value)}
                          entity={tasksManager.manager}
                        />
                      )}
                      <Form.Control.Feedback type="invalid">
                        Please provide a valid name.
                      </Form.Control.Feedback>
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

export default EditTasksManager;
