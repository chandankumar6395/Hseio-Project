import { Button, Card, Col, Form, Row } from 'react-bootstrap';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchPOST } from '../../utils/NetworkUtils';
import URLConstants from '../../constants/URLConstants';
import CustomMultiSelect from '../../components/widgets/CustomMultiSelect';

const NewAuditTaskCategories = () => {
  const [validated, setValidated] = useState(false);

  const history = useNavigate();

  const [name, setName] = useState('');

  const [auditTasks, setAuditTasks] = useState([]);

  useEffect(() => {}, []);

  const onAuditTaskCategoriesSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      console.log('I am here too');
      event.preventDefault();
      event.stopPropagation();
    } else {
      console.log('I am here');
      event.preventDefault();
      const postData = {
        name,
        audit_tasks: auditTasks,
      };
      postAuditTaskCategories(postData);
    }
    setValidated(true);
  };

  const postAuditTaskCategories = async (data) => {
    try {
      await fetchPOST(URLConstants.AUDIT_TASK_CATEGORIES_URL, data);
      history('../../private/audit-task-categories');
    } catch (error) {
      console.log(error);
    }
  };

  const onNameChangeHandler = (event) => {
    setName(event.target.value);
  };

  return (
    <Row>
      <Col>
        <Card>
          <Card.Header>
            Add Audit Task Category
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
                        setAuditTasks(value);
                      }}
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

export default NewAuditTaskCategories;
