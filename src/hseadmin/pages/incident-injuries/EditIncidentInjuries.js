import { Col, Form, Row } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import { Link, NavLink, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Helmet } from 'react-helmet-async';
import { Button, Grid, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import Select from 'react-select';
import URLConstants from '../../constants/URLConstants';
import { fetchGET, fetchPUT } from '../../utils/NetworkUtils';
import CustomSelect from '../../components/widgets/CustomSelect';
import { CustomBreadcrumbs, CustomDivider } from '../../utils/MUIStyle';
import { KEY_COMPANY_ID, YES_NO_DATA } from '../../constants/Constants';
import CompanySelect from '../../components/widgets/CompanySelect';
import DivisionSelect from '../../components/widgets/DivisionSelect';
import JobSiteSelect from '../../components/widgets/JobSiteSelect';
import EmployeeSelect from '../../components/widgets/EmployeeSelect';

const EditIncidentInjuries = () => {
  const localCompanyId = localStorage.getItem(KEY_COMPANY_ID);
  const localDivisionId = useSelector((state) => state.auth.selectedDivision);
  const localJobSiteId = useSelector((state) => state.auth.selectedJobSite);

  console.log('NewIncidentInjuries localCompanyId', localCompanyId);
  console.log('NewIncidentInjuries localDivisionId', localDivisionId);
  console.log('NewIncidentInjuries localJobSiteId', localJobSiteId);

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
  const [restrictedDutyTotalDays, setRestrictedDutyTotalDays] = useState('');
  const [otherRecordable, setOtherRecordable] = useState('');
  const [companyId, setCompanyId] = useState('');
  const [divisionId, setDivisionId] = useState('');
  const [jobSiteId, setJobSiteId] = useState('');

  const [oshaRecordableOptions, setOshaRecordableOptions] = useState('');
  const [fatilityOptions, setFatilityOptions] = useState('');
  const [lostTimeOptions, setLostTimeOptions] = useState('');
  const [restrictedDutyOptions, setRestrictedDutyOptions] = useState('');
  const [otherRecordableOptions, setOtherRecordableOptions] = useState('');

  const params = useParams();
  const { id } = useParams();

  const [incidentInjuries, setIncidentInjuries] = useState(null);

  useEffect(() => {
    if (incidentInjuries != null) {
      setIncidentId(incidentInjuries.incident_id);
      setEmployeeId(incidentInjuries.employee_id);
      setInjuryClassId(incidentInjuries.injury_class_id);
      setOshaRecordable(incidentInjuries.osha_recordable);
      setOshaRecordableOptions({
        value: incidentInjuries.osha_recordable,
        label: YES_NO_DATA.find(
          (x) => x.id === incidentInjuries.osha_recordable
        ).name,
      });
      setFatility(incidentInjuries.fatility);
      setFatilityOptions({
        value: incidentInjuries.fatility,
        label: YES_NO_DATA.find(
          (x) => x.id === incidentInjuries.osha_recordable
        ).name,
      });
      setLostTime(incidentInjuries.lost_time);
      setLostTimeOptions({
        value: incidentInjuries.lost_time,
        label: YES_NO_DATA.find((x) => x.id === incidentInjuries.lost_time)
          .name,
      });
      setLostTimeTotalDays(incidentInjuries.lost_time_total_days);
      setRestrictedDuty(incidentInjuries.restricted_duty);
      setRestrictedDutyOptions({
        value: incidentInjuries.restricted_duty,
        label: YES_NO_DATA.find(
          (x) => x.id === incidentInjuries.restricted_duty
        ).name,
      });
      setRestrictedDutyTotalDays(incidentInjuries.restricted_duty_total_days);
      setOtherRecordable(incidentInjuries.other_recordable);
      setOtherRecordableOptions({
        value: incidentInjuries.other_recordable,
        label: YES_NO_DATA.find(
          (x) => x.id === incidentInjuries.other_recordable
        ).name,
      });
      setCompanyId(incidentInjuries.company_id);
      setDivisionId(incidentInjuries.division_id);
      setJobSiteId(incidentInjuries.job_site_id);
    }
  }, [incidentInjuries]);

  useEffect(() => {
    console.log(`param is ${params.id}`);
    loadIncidentInjuries();
  }, []);

  const loadIncidentInjuries = async () => {
    try {
      const url = `${URLConstants.GET_INCIDENTS_INJURIES_URL}/${id}.json`;
      const response = await fetchGET(url);
      setIncidentInjuries(response.data);
    } catch (error) {
      toast(error.message || 'Failed');
    }
  };

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
      restricted_duty_total_days: restrictedDutyTotalDays,
      other_recordable: otherRecordable,
      company_id: localCompanyId !== null ? localCompanyId : companyId,
      division_id: localDivisionId !== -1 ? localDivisionId : divisionId,
      job_site_id: localJobSiteId !== -1 ? localJobSiteId : jobSiteId,
    };
    postIncidentInjuries(postData);
  };

  const postIncidentInjuries = async (data) => {
    try {
      const url = `${URLConstants.GET_INCIDENTS_INJURIES_URL}/${id}.json`;

      await fetchPUT(url, data);

      history('../../private/incident-injuries');
    } catch (error) {
      toast(error.message || 'Failed');
    }
  };

  const onOshaRecordableChangeHandler = (selectedOption) => {
    setOshaRecordableOptions(selectedOption);
    setOshaRecordable(+selectedOption.value);
  };
  const onFatilityChangeHandler = (selectedOption) => {
    setFatilityOptions(selectedOption);
    setFatility(+selectedOption.value);
  };
  const onLostTimeChangeHandler = (selectedOption) => {
    setLostTimeOptions(selectedOption);
    setLostTime(+selectedOption.value);
  };
  const onLostTimeTotalDaysChangeHandler = (event) => {
    console.log(event.target.value);
    setLostTimeTotalDays(event.target.value);
  };
  const onRestrictedDutyChangeHandler = (selectedOption) => {
    setRestrictedDutyOptions(selectedOption);
    setRestrictedDuty(+selectedOption.value);
  };
  const onRestrictedDutyTotalDaysChangeHandler = (event) => {
    console.log(event.target.value);
    setRestrictedDutyTotalDays(event.target.value);
  };
  const onOtherRecordableChangeHandler = (selectedOption) => {
    setOtherRecordableOptions(selectedOption);
    setOtherRecordable(+selectedOption.value);
  };
  return (
    <>
      <Helmet title="Edit Incident Injuries" />

      <Grid justifyContent="space-between" container spacing={10}>
        <Grid item>
          <Typography variant="h3" gutterBottom display="inline">
            Incident Injuries
          </Typography>

          <CustomBreadcrumbs aria-label="Breadcrumb" mt={2}>
            <Link component={NavLink} to="/">
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
      {incidentInjuries && (
        <Grid container spacing={6}>
          <Grid item xs={12}>
            {/* <Card> */}
            {/*  <Card.Body> */}
            <div className="cordbox">
              <Form
                noValidate
                validated={validated}
                onSubmit={onIncidentInjuriesSubmit}
              >
                <Row>
                  <Col md={6}>
                    {/* incident id */}
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label>Incident</Form.Label>
                      <CustomSelect
                        params={{
                          url: URLConstants.INCIDENTS_URL,
                        }}
                        onChange={(value) => {
                          setIncidentId(value);
                        }}
                        entity={incidentInjuries.incident}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    {/* injury class id */}
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label>Injury Class</Form.Label>
                      <CustomSelect
                        params={{
                          url: URLConstants.INJURY_CLASSES_URL,
                        }}
                        onChange={(value) => {
                          setInjuryClassId(value);
                        }}
                        entity={incidentInjuries.injury_class}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    {/* employee id */}
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label>Employee</Form.Label>
                      <EmployeeSelect
                        onChange={(value) => {
                          setEmployeeId(value);
                        }}
                        entity={incidentInjuries.employee}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    {/* osha recordable */}
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label>Osha Recordable</Form.Label>
                      <Select
                        required
                        options={YES_NO_DATA.map((item) => {
                          return { value: item.id, label: item.name };
                        })}
                        onChange={onOshaRecordableChangeHandler}
                        value={oshaRecordableOptions}
                      />
                      <Form.Control.Feedback type="invalid">
                        Please provide a valid Osha recordable.
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    {/* fatility */}
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label>Fatility</Form.Label>
                      <Select
                        required
                        options={YES_NO_DATA.map((item) => {
                          return { value: item.id, label: item.name };
                        })}
                        onChange={onFatilityChangeHandler}
                        value={fatilityOptions}
                      />
                      <Form.Control.Feedback type="invalid">
                        Please provide a valid fatility.
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    {/* lost time */}
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label>Lost Time</Form.Label>
                      <Select
                        required
                        options={YES_NO_DATA.map((item) => {
                          return { value: item.id, label: item.name };
                        })}
                        onChange={onLostTimeChangeHandler}
                        value={lostTimeOptions}
                      />
                      <Form.Control.Feedback type="invalid">
                        Please provide a valid lost time.
                      </Form.Control.Feedback>
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
                        value={lostTimeTotalDays}
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
                        value={restrictedDutyOptions}
                      />
                      <Form.Control.Feedback type="invalid">
                        Please provide a valid restricted duty.
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    {/* restricted duty total days */}
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label>Restricted Duty Total Days</Form.Label>
                      <Form.Control
                        type="number"
                        placeholder="Restricted Duty Total Days"
                        onChange={onRestrictedDutyTotalDaysChangeHandler}
                        value={restrictedDutyTotalDays}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    {/* other recordable */}
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label>Other Recordable</Form.Label>
                      <Select
                        required
                        options={YES_NO_DATA.map((item) => {
                          return { value: item.id, label: item.name };
                        })}
                        onChange={onOtherRecordableChangeHandler}
                        value={otherRecordableOptions}
                      />
                      <Form.Control.Feedback type="invalid">
                        Please provide a valid other recordable.
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  {/* Company id */}
                  {localCompanyId === null && (
                    <Col md={6}>
                      <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Company </Form.Label>
                        <CompanySelect
                          onChange={(value) => setCompanyId(value)}
                          entity={incidentInjuries.company}
                        />
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
                          entity={incidentInjuries.division}
                        />
                      </Form.Group>
                    </Col>
                  )}
                  {localJobSiteId && (
                    <Col md={6}>
                      <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Project</Form.Label>
                        <JobSiteSelect
                          onChange={(value) => setJobSiteId(value)}
                          companyId={
                            localCompanyId !== null ? localCompanyId : companyId
                          }
                          divisionId={
                            localDivisionId !== -1
                              ? localDivisionId
                              : divisionId
                          }
                          entity={incidentInjuries.job_site}
                        />
                      </Form.Group>
                    </Col>
                  )}
                </Row>
                <Button variant="contained" type="submit" color="primary">
                  Submit
                </Button>
              </Form>
            </div>
            {/*  </Card.Body> */}
            {/* </Card> */}
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default EditIncidentInjuries;
