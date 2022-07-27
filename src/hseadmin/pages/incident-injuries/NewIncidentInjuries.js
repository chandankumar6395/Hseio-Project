import { Col, Form, Row } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Helmet } from 'react-helmet-async';
import { Button, Grid, Typography } from '@mui/material';
import Select from 'react-select';
import CompanySelect from '../../components/widgets/CompanySelect';
import { CustomBreadcrumbs, CustomDivider } from '../../utils/MUIStyle';
import DivisionSelect from '../../components/widgets/DivisionSelect';
import JobSiteSelect from '../../components/widgets/JobSiteSelect';
import CustomSelect from '../../components/widgets/CustomSelect';
import URLConstants from '../../constants/URLConstants';
import EmployeeSelect from '../../components/widgets/EmployeeSelect';
import { KEY_COMPANY_ID, YES_NO_DATA } from '../../constants/Constants';
import { addIncidentInjuries } from '../../store/actions/incident_injuries';

const NewInspection = () => {
  const localCompanyId = localStorage.getItem(KEY_COMPANY_ID);
  const localDivisionId = useSelector((state) => state.auth.selectedDivision);
  const localJobSiteId = useSelector((state) => state.auth.selectedJobSite);

  console.log('NewIncidentMUI localCompanyId', localCompanyId);
  console.log('NewIncidentMUI localDivisionId', localDivisionId);
  console.log('NewIncidentMUI localJobSiteId', localJobSiteId);
  const [validated, setValidated] = useState(false);

  const history = useNavigate();

  const [incidentId, setIncidentId] = useState('');
  const [employeeId, setEmployeeId] = useState('');
  const [injuryClassId, setInjuryClassId] = useState('');
  const [oshaRecordable, setOshaRecordable] = useState('');
  const [fatility, setFatility] = useState('');
  const [lostTime, setLostTime] = useState('');
  const [lostTimeTotalDays, setLostTimeTotalDays] = useState('');
  const [restrictedDuty, setRestrictedDuty] = useState('');
  const [restrictedDutyTotalDuty, setRestrictedDutyTotalDays] = useState('');
  const [otherRecordable, setOtherRecortable] = useState('');
  const [companyId, setCompanyId] = useState(-1);
  const [divisionId, setDivisionId] = useState(-1);
  const [jobSiteId, setJobSiteId] = useState(-1);

  const dispatch = useDispatch();

  useEffect(() => {}, []);

  const onIncidentInjuriesSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);
    event.preventDefault();

    const postData = {
      incident_id: incidentId,
      employee_id: employeeId,
      injury_class_id: injuryClassId,
      osha_recordable: oshaRecordable,
      fatility,
      lost_time: lostTime,
      lost_time_total_days: lostTimeTotalDays,
      restricted_duty: restrictedDuty,
      restricted_duty_total_days: restrictedDutyTotalDuty,
      other_recordable: otherRecordable,
      division_id: localDivisionId !== -1 ? localDivisionId : divisionId,
      company_id: localCompanyId !== null ? localCompanyId : companyId,
      job_site_id: localJobSiteId !== -1 ? localJobSiteId : jobSiteId,
    };
    postIncidentInjuries(postData);
  };

  const postIncidentInjuries = async (data) => {
    try {
      await dispatch(addIncidentInjuries(data));
      history('../../private/incident-injuries');
    } catch (error) {
      toast(error.message || 'Failed');
    }
  };
  const onOshaRecordableChangeHandler = (selectedOption) => {
    // console.log(event.target.value);
    setOshaRecordable(+selectedOption.value);
  };
  const onFatilityChangeHandler = (selectedOption) => {
    // console.log(event.target.value);
    setFatility(+selectedOption.value);
  };
  const onLostTimeChangeHandler = (selectedOption) => {
    // console.log(event.target.value);
    setLostTime(+selectedOption.value);
  };
  const onLostTimeTotalDaysChangeHandler = (event) => {
    console.log(event.target.value);
    setLostTimeTotalDays(event.target.value);
  };
  const onRestrictedDutyChangeHandler = (selectedOption) => {
    // console.log(event.target.value);
    setRestrictedDuty(+selectedOption.value);
  };
  const onRestrictedDutyTotalDaysChangeHandler = (event) => {
    console.log(event.target.value);
    setRestrictedDutyTotalDays(event.target.value);
  };
  const onOtherRecordableChangeHandler = (selectedOption) => {
    // console.log(event.target.value);
    setOtherRecortable(+selectedOption.value);
  };

  return (
    <>
      <Helmet title="Add Incident Injuries" />

      <Grid justifyContent="space-between" container spacing={10}>
        <Grid item>
          <Typography variant="h3" gutterBottom display="inline">
            Incident Injuries
          </Typography>

          <CustomBreadcrumbs aria-label="Breadcrumb" mt={2}>
            <Link component={NavLink} to="/private/dashboard">
              Dashboard
            </Link>
            <Link component={NavLink} to="/private/incident-injuries">
              Incident Injuries
            </Link>
            <Typography>Add Incident Injuries</Typography>
          </CustomBreadcrumbs>
        </Grid>
        <Grid item>
          <div>
            <NavLink to="/private/incident-injuries">
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
            onSubmit={onIncidentInjuriesSubmit}
          >
            <Row>
              <Col md={6}>
                {/* Incident Id */}
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Incident *</Form.Label>
                  <CustomSelect
                    params={{
                      url: URLConstants.INCIDENTS_URL,
                    }}
                    onChange={(value) => {
                      setIncidentId(value);
                    }}
                  />
                </Form.Group>
                <Form.Control.Feedback type="invalid">
                  Please provide a valid Name.
                </Form.Control.Feedback>
              </Col>

              <Col md={6}>
                {/* employee id */}
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Employee *</Form.Label>
                  <EmployeeSelect
                    onChange={(value) => {
                      setEmployeeId(value);
                    }}
                  />
                </Form.Group>
              </Col>

              <Col md={6}>
                {/* injury class id */}
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Injury Class *</Form.Label>
                  <CustomSelect
                    params={{
                      url: URLConstants.INJURY_CLASSES_URL,
                    }}
                    onChange={(value) => {
                      setInjuryClassId(value);
                    }}
                  />
                </Form.Group>
              </Col>

              <Col md={6}>
                {/* latitude */}
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Osha Recordable</Form.Label>
                  <Select
                    required
                    options={YES_NO_DATA.map((item) => {
                      return { value: item.id, label: item.name };
                    })}
                    onChange={onOshaRecordableChangeHandler}
                  />
                </Form.Group>
              </Col>

              <Col md={6}>
                {/* longitude */}
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>fatility</Form.Label>
                  <Select
                    required
                    options={YES_NO_DATA.map((item) => {
                      return { value: item.id, label: item.name };
                    })}
                    onChange={onFatilityChangeHandler}
                  />
                </Form.Group>
              </Col>

              <Col md={6}>
                {/* LOST TIME */}
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Lost Time</Form.Label>
                  <Select
                    required
                    options={YES_NO_DATA.map((item) => {
                      return { value: item.id, label: item.name };
                    })}
                    onChange={onLostTimeChangeHandler}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                {/* lost time total days */}
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Lost Time Total Days</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Lost Time Total Days"
                    onChange={onLostTimeTotalDaysChangeHandler}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                {/* restricted duty */}
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Restricted Duty</Form.Label>
                  <Select
                    required
                    options={YES_NO_DATA.map((item) => {
                      return { value: item.id, label: item.name };
                    })}
                    onChange={onRestrictedDutyChangeHandler}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                {/* restricted duty total days */}
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Restricted Duty Total Days</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Lost Time Total Days"
                    onChange={onRestrictedDutyTotalDaysChangeHandler}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                {/* other recordable */}
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Other Recordable </Form.Label>
                  <Select
                    required
                    options={YES_NO_DATA.map((item) => {
                      return { value: item.id, label: item.name };
                    })}
                    onChange={onOtherRecordableChangeHandler}
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
                      companyId={
                        localCompanyId !== null ? localCompanyId : companyId
                      }
                    />
                  </Form.Group>
                </Col>
              )}
              <Col md={6}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Project</Form.Label>
                  <JobSiteSelect
                    onChange={(value) => setJobSiteId(value)}
                    companyId={
                      localCompanyId !== null ? localCompanyId : companyId
                    }
                    divisionId={
                      localDivisionId !== -1 ? localDivisionId : divisionId
                    }
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
export default NewInspection;
