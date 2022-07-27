/* eslint-disable */
import {Button, Card, Col, Form, Row} from 'react-bootstrap';
import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import URLConstants from "../../constants/URLConstants";
import {fetchGET, fetchPUT} from "../../utils/NetworkUtils";
import {toast} from "react-toastify";
import CustomSelect from "../../components/widgets/CustomSelect";
import UserSelect from "../../components/widgets/UserSelect";

const EditAuditReport = () => {
  const [validated, setValidated] = useState(false);

  const history = useNavigate();

  const [name, setName] = useState('');
  const [auditTaskId, setAuditTaskId] = useState(-1);
  const [contactorName, setContactorName] = useState('');
  const [cityName, setCityName] = useState('');
  const [auditorId, setAuditorId] = useState('');
  const [auditorName, setAuditorName] = useState('');
  const [auditReport, setAuditReport] = useState(null);

  const params = useParams();
  const {id} = useParams();

  useEffect(() => {
    if (auditReport != null) {
      setName(auditReport.name);
      setAuditTaskId(auditReport.audit_task_id);
      setContactorName(auditReport.contactor_name);
      setCityName(auditReport.city_name);
      setAuditorId(auditReport.auditor_id);
      setAuditorName(auditReport.auditor_name);
    }
  }, [auditReport]);

  useEffect(() => {
    console.log('param is ' + params.id);
    loadAuditReport();
  }, []);

  const loadAuditReport = async () => {
    try {
      const url = `${URLConstants.GET_AUDIT_REPORT_URL}/${id}.json`;
      const response = await fetchGET(url);
      setAuditReport(response.data);
    } catch (error) {
      toast(error.message || 'Failed');
    }
  };

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
      auditor_id:auditorId,
      auditor_name:auditorName,
    };
    postAuditReport(postData);
  };

  const postAuditReport = async (data) => {
    try {
      const url = `${URLConstants.GET_AUDIT_REPORT_URL}/${id}.json`;

      await fetchPUT(url, data);

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
  const onAuditorChangeHandler = (event) => {
    console.log(event.target.value);
    setAuditorId(event.target.value);
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
              Edit Audit Report
              <>
                <Button
                    className="btn-sm"
                    variant="primary"
                    type="button"
                    style={{
                      float: 'right'
                    }}
                    onClick={() => {
                      history(-1);
                    }}
                >
                  Back
                </Button>
              </>
            </Card.Header>
            {auditReport !== null && (
            <Card.Body>
              <Form noValidate validated={validated} onSubmit={onAuditReportSubmit}>
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
                      <CustomSelect
                          params={{
                            url: URLConstants.AUDIT_TASKS_URL
                          }}
                          onChange={(value) => {
                            setAuditTaskId(value);
                          }}
                          entity={auditReport.audit_task}
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
                          value={contactorName}
                      />
                    </Form.Group>
                  </Col>

                  <Col md={6}>
                    {/* City name field */}
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label>City</Form.Label>
                      <Form.Control
                          type= "text"
                          placeholder="City"
                          onChange={onCityNameChangeHandler}
                          value={cityName}
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
                          entity={auditReport.auditor}
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
                          value={auditorName}
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

export default EditAuditReport;

