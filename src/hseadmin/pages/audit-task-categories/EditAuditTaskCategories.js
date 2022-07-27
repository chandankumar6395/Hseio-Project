import { Button, Card, Col, Form, Row } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate, useParams } from 'react-router-dom';

import { toast } from 'react-toastify';
import URLConstants from '../../constants/URLConstants';
import { fetchGET, fetchPUT } from '../../utils/NetworkUtils';
import CustomMultiSelect from '../../components/widgets/CustomMultiSelect';

const EditAuditTaskCategories = () => {
  const [validated, setValidated] = useState(false);

  const history = useNavigate();

  const [name, setName] = useState('');
  const [auditTaskCategory, setAuditTaskCategory] = useState(null);
  const params = useParams();
  const { id } = useParams();

  const [auditTasks, setAuditTasks] = useState([]);
  const [auditTasksOptions, setAuditTasksOptions] = useState([]);

  useEffect(() => {}, []);

  useEffect(() => {
    if (auditTaskCategory != null) {
      setName(auditTaskCategory.name);
      setAuditTasks(auditTaskCategory.audit_tasks);
    }
  }, [auditTaskCategory]);

  useEffect(() => {
    console.log(`param is ${params.id}`);
    loadAuditTaskCategory();
  }, []);

  const loadAuditTaskCategory = async () => {
    // await dispatch(getAuditTaskCategories(id));
    try {
      const url = `${URLConstants.GET_AUDIT_TASK_CATEGORY_URL}/${id}.json`;
      const response = await fetchGET(url);
      setAuditTaskCategory(response.data);
    } catch (error) {
      toast(error.message || 'Failed');
    }
  };

  const onAuditTaskCategoriesSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
    event.preventDefault();
    const postData = {
      name,
      audit_tasks: auditTasksOptions,
    };
    postAuditTaskCategories(postData);
  };

  const postAuditTaskCategories = async (data) => {
    try {
      const url = `${URLConstants.GET_AUDIT_TASK_CATEGORY_URL}/${id}.json`;

      await fetchPUT(url, data);

      history('../../private/audit-task-categories');
    } catch (error) {
      toast(error.message || 'Failed');
    }
  };
  const onNameChangeHandler = (event) => {
    // console.log(event.target.value);
    setName(event.target.value);
  };

  return (
    <Row>
      <Col>
        <Card>
          <Card.Header>
            Edit Audit Task
            <NavLink to="/private/audit-task-categories">
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
          <Card.Body>
            <Form
              noValidate
              validated={validated}
              onSubmit={onAuditTaskCategoriesSubmit}
            >
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      required
                      type="text"
                      placeholder="Name"
                      onChange={onNameChangeHandler}
                      value={name}
                    />
                    <Form.Control.Feedback type="invalid">
                      Please provide a valid name.
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Audit Task</Form.Label>
                    <CustomMultiSelect
                      params={{ url: URLConstants.AUDIT_TASKS_URL }}
                      onChange={(value) => {
                        setAuditTasksOptions(value);
                      }}
                      entities={auditTasks}
                    />

                    <Form.Control.Feedback type="invalid">
                      Please provide a valid Audit Task.
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
              </Row>

              {/* {renderSelect()} */}

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

export default EditAuditTaskCategories;
