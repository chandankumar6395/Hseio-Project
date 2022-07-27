import { Button, Card, Col, Form, Row } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import URLConstants from '../../constants/URLConstants';
import { fetchPOST } from '../../utils/NetworkUtils';
import CustomSelect from '../../components/widgets/CustomSelect';
import UserSelect from '../../componen/widgets/UserSelect';

const NewAuditReport = () => {
  const [validated, setValidated] = useState(false);

  const history = useNavigate();

  const [name, setName] = useState('');
  const [auditTaskId, setAuditTaskId] = useState('');
  const [contactorName, setContactorName] = useState('');
  const [cityName, setCityName] = useState('');
  const [auditorId, setAuditorId] = useState('');
  const [auditorName, setAuditorName] = useState('');

  useEffect(() => {}, []);

  const onAuditReportSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
    event.preventDefault();
    const postData = {
      name,
      audit_task_id: auditTaskId,
      contactor_name: contactorName,
      city_name: cityName,
      auditor_id: auditorId,
      auditor_name: auditorName,
    };
    postAuditReport(postData);
  };

  const postAuditReport = async (data) => {
    try {
      const url = URLConstants.AUDIT_REPORTS_URL;
      await fetchPOST(url, data);
      history('../../private/audit-reports');
    } catch (error) {
      toast(error.message || 'Failed');
    }
  };

  const onNameChangeHandler = (event) => {
    // console.log(event.target.value);
    setName(event.target.value);
  };

  const onContactorNameChangeHandler = (event) => {
    console.log(event.target.value);
    setContactorName(event.target.value);
  };

  const onCityNameChangeHandler = (event) => {
    console.log(event.target.value);
    setCityName(event.target.value);
  };
  const onAuditorNameChangeHandler = (event) => {
    console.log(event.target.value);
    setAuditorName(event.target.value);
  };

  return (
    <Row>
      <Col>
        <Card>
          <Card.Header>
            Add Audit Report
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
              onSubmit={onAuditReportSubmit}
            >
              {/* Name Field */}
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
                    <CustomSelect
                      params={{
                        url: URLConstants.AUDIT_TASKS_URL,
                      }}
                      onChange={(value) => {
                        setAuditTaskId(value);
                      }}
                    />
                    <Form.Control.Feedback type="invalid">
                      Please provide a valid Audit Task.
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Contactor Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Contactor Name"
                      onChange={onContactorNameChangeHandler}
                    />
                  </Form.Group>
                </Col>

                <Col md={6}>
                  {/* City name field */}
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>City</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="City"
                      onChange={onCityNameChangeHandler}
                    />
                  </Form.Group>
                </Col>

                <Col md={6}>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Auditor Id</Form.Label>
                    <UserSelect
                      onChange={(value) => {
                        setAuditorId(value);
                      }}
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Auditor Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Auditor Name"
                      onChange={onAuditorNameChangeHandler}
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

export default NewAuditReport;
