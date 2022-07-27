import React, { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Button, Grid, Typography } from '@mui/material';
import { Col, Form, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { CustomBreadcrumbs, CustomDivider } from '../../utils/MUIStyle';
import { fetchPOST } from '../../utils/NetworkUtils';
import URLConstants from '../../constants/URLConstants';
import CompanySelect from '../../components/widgets/CompanySelect';
import DivisionSelect from '../../components/widgets/DivisionSelect';
import JobSiteSelect from '../../components/widgets/JobSiteSelect';
import { KEY_COMPANY_ID } from '../../constants/Constants';

const NewManHours = () => {
  const localCompanyId = localStorage.getItem(KEY_COMPANY_ID);
  const localDivisionId = useSelector((state) => state.auth.selectedDivision);
  const localJobSiteId = useSelector((state) => state.auth.selectedJobSite);

  const [validated, setValidated] = useState(false);
  const history = useNavigate();

  const [year, setYear] = useState('');
  const [month, setMonth] = useState('');
  const [hoursValue, setHoursValue] = useState('');
  const [companyId, setCompanyId] = useState(-1);
  const [divisionId, setDivisionId] = useState(-1);
  const [jobSiteId, setJobSiteId] = useState(-1);

  useEffect(() => {}, []);

  const onManHoursChangeHandler = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);
    event.preventDefault();

    const postData = {
      year: year,
      month,
      hours_value: hoursValue,
      division_id: localDivisionId !== -1 ? localDivisionId : divisionId,
      company_id: localCompanyId !== null ? localCompanyId : companyId,
      job_site_id: localJobSiteId !== -1 ? localJobSiteId : jobSiteId,
    };
    postManHours(postData);
  };

  const postManHours = async (data) => {
    try {
      await fetchPOST(URLConstants.MAN_HOURS_URL, data);
      history('../../private/man-hours');
    } catch (error) {
      console.log(error);
    }
  };

  const onYearChangeHandler = (event) => {
    console.log(event.target.value);
    setYear(event.target.value);
  };
  const onMonthChangeHandler = (event) => {
    console.log(event.target.value);
    setMonth(event.target.value);
  };
  const onHoursValueChangeHandler = (event) => {
    console.log(event.target.value);
    setHoursValue(event.target.value);
  };
  const maxLengthCheck = (object) => {
    if (object.target.value.length > object.target.maxLength) {
      object.target.value = object.target.value.slice(
        0,
        object.target.maxLength
      );
    }
  };
  return (
    <>
      <Helmet title="Invoices" />

      <Grid justifyContent="space-between" container spacing={10}>
        <Grid item>
          <Typography variant="h3" gutterBottom display="inline">
            Man Hours
          </Typography>

          <CustomBreadcrumbs aria-label="Breadcrumb" mt={2}>
            <Link component={NavLink} to="/">
              Dashboard
            </Link>
            <Link component={NavLink} to="/private/man-hours">
              Man Hours
            </Link>
            <Typography>Add Man Hours</Typography>
          </CustomBreadcrumbs>
        </Grid>
        <Grid item>
          <div>
            <NavLink to="/private/man-hours">
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
          <Form
            noValidate
            validated={validated}
            onSubmit={onManHoursChangeHandler}
          >
            <Row>
              <Col md={6}>
                {/* Year */}
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Year</Form.Label>
                  <Form.Control
                    type="number"
                    maxLength="4"
                    onInput={maxLengthCheck}
                    placeholder="Year"
                    onChange={onYearChangeHandler}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                {/* month */}
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Month</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Month"
                    onChange={onMonthChangeHandler}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                {/* Hours Value */}
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Hours Value</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Hours Value"
                    onChange={onHoursValueChangeHandler}
                  />
                </Form.Group>
              </Col>
              {/* Company id */}
              {localCompanyId === null && (
                <Col md={6}>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Company </Form.Label>
                    <CompanySelect onChange={(value) => setCompanyId(value)} />
                  </Form.Group>
                </Col>
              )}

              {localDivisionId === -1 && (
                <Col md={6}>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Division </Form.Label>
                    <DivisionSelect
                      onChange={(value) => setDivisionId(value)}
                      companyId={companyId}
                    />
                  </Form.Group>
                </Col>
              )}
              <Col md={6}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Project</Form.Label>
                  <JobSiteSelect
                    onChange={(value) => setJobSiteId(value)}
                    companyId={companyId}
                    divisionId={divisionId}
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
export default NewManHours;
