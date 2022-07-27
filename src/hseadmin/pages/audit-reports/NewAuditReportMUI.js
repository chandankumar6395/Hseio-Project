import { Col, Form, Row } from 'react-bootstrap';
import React, { useState } from 'react';

import { Link, NavLink, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Helmet } from 'react-helmet-async';
import { Button, Grid, Typography } from '@mui/material';
import URLConstants from '../../constants/URLConstants';
import { fetchPOST } from '../../utils/NetworkUtils';
import CustomSelect from '../../components/widgets/CustomSelect';
import { CustomBreadcrumbs, CustomDivider } from '../../utils/MUIStyle';
import UserSelect from '../../components/widgets/UserSelect';

const NewAuditReportMUI = () => {
  const [validated, setValidated] = useState(false);

  const history = useNavigate();

  const [name, setName] = useState('');
  const [auditTaskId, setAuditTaskId] = useState('');
  const [contactorName, setContactorName] = useState('');
  const [cityName, setCityName] = useState('');
  const [auditorId, setAuditorId] = useState(-1);
  const [auditorName, setAuditorName] = useState('');
  const [auditTypeId, setAuditTypeId] = useState('');

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
      audit_type_id: auditTypeId,
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
    <>
      <Helmet title="Add Audit Report" />

      <Grid justifyContent="space-between" container spacing={10}>
        <Grid item>
          <Typography variant="h3" gutterBottom display="inline">
            Audit Reports
          </Typography>

          <CustomBreadcrumbs aria-label="Breadcrumb" mt={2}>
            <Link component={NavLink} to="/">
              Dashboard
            </Link>
            <Link component={NavLink} to="/private/audit-reports">
              Audit Reports
            </Link>
            <Typography>Add Audit Report</Typography>
          </CustomBreadcrumbs>
        </Grid>
        <Grid item>
          <div>
            <NavLink to="/private/audit-reports">
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
          <Form noValidate validated={validated} onSubmit={onAuditReportSubmit}>
            {/* Name Field */}
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Name *</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    placeholder="Name *"
                    onChange={onNameChangeHandler}
                  />
                  <Form.Control.Feedback type="invalid">
                    Please provide a valid name.
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Audit Task *</Form.Label>
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

              <Col md={6}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Audit Type</Form.Label>
                  <CustomSelect
                    params={{ url: URLConstants.AUDIT_TYPES_URL }}
                    onChange={(value) => {
                      setAuditTypeId(value);
                    }}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Button variant="contained" type="submit" color="primary">
              Submit
            </Button>
          </Form>
        </Grid>
      </Grid>
    </>
  );
};

export default NewAuditReportMUI;
