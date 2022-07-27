import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Button, Card, Col, Form, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import URLConstants from '../../constants/URLConstants';
import { fetchGET, fetchPUT } from '../../utils/NetworkUtils';
import { KEY_COMPANY_ID } from '../../constants/Constants';
import CompanySelect from '../../components/widgets/CompanySelect';
import DivisionSelect from '../../components/widgets/DivisionSelect';
import JobSiteSelect from '../../components/widgets/JobSiteSelect';

const EditManHours = () => {
  const localCompanyId = localStorage.getItem(KEY_COMPANY_ID);
  const localDivisionId = useSelector((state) => state.auth.selectedDivision);
  const localJobSiteId = useSelector((state) => state.auth.selectedJobSite);

  const [validated, setValidated] = useState(false);

  const history = useNavigate();

  const [year, setYear] = useState('');
  const [month, setMonth] = useState('');
  const [hoursValue, setHoursValue] = useState('');
  const [companyId, setCompanyId] = useState('');
  const [divisionId, setDivisionId] = useState('');
  const [jobSiteId, setJobSiteId] = useState('');

  const [manHour, setManHours] = useState(null);

  const { id } = useParams();
  const params = useParams();
  useEffect(() => {
    if (manHour != null) {
      setYear(manHour.year);
      setMonth(manHour.month);
      setHoursValue(manHour.hours_value);
      setCompanyId(manHour.company_id);
      setDivisionId(manHour.division_id);
      setJobSiteId(manHour.job_site_id);
    }
  }, [manHour]);

  useEffect(() => {
    console.log(`param is ${params.id}`);
    loadManHours();
  }, []);

  const loadManHours = async () => {
    try {
      const url = `${URLConstants.GET_MAN_HOURS_URL}/${id}.json`;

      console.log('getManHours url =', url);

      const response = await fetchGET(url);

      console.log('getManHours -->', response.data);

      setManHours(response.data);
    } catch (error) {
      toast(error.message || 'Failed');
    }
  };

  const onManHoursSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);
    event.preventDefault();
    // @ts-ignore
    const postData = {
      id,
      year: year,
      month,
      hours_value: hoursValue,
      company_id: localCompanyId !== null ? localCompanyId : companyId,
      division_id: localDivisionId !== -1 ? localDivisionId : divisionId,
      job_site_id: localJobSiteId !== -1 ? localJobSiteId : jobSiteId,
    };
    postManHours(postData);
  };
  const postManHours = async (data) => {
    try {
      const url = `${URLConstants.GET_MAN_HOURS_URL}/${id}.json`;

      await fetchPUT(url, data);

      history('../../private/man-hours');
    } catch (error) {
      toast(error.message || 'Failed');
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
    <Row>
      <Col>
        <Card>
          <Card.Header>
            Edit Man Hours Details
            <NavLink to="/private/man-hours">
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
          {manHour && (
            <Card.Body>
              <Form
                noValidate
                validated={validated}
                onSubmit={onManHoursSubmit}
              >
                {/* Year */}
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label>Year</Form.Label>
                      <Form.Control
                        type="number"
                        maxLength="4"
                        onInput={maxLengthCheck}
                        placeholder="Year"
                        onChange={onYearChangeHandler}
                        value={year}
                      />
                      <Form.Control.Feedback type="invalid">
                        Please provide a valid name.
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label>Month</Form.Label>
                      <Form.Control
                        type="number"
                        placeholder="Month"
                        onChange={onMonthChangeHandler}
                        value={month}
                      />
                    </Form.Group>
                  </Col>
                  {/* Hours Value */}
                  <Col md={6}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label>Hours Value</Form.Label>
                      <Form.Control
                        type="number"
                        placeholder="Hours Value"
                        onChange={onHoursValueChangeHandler}
                        value={hoursValue}
                      />
                    </Form.Group>
                  </Col>
                  {/* Company id */}
                  {localCompanyId === null && (
                    <Col md={6}>
                      <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Company </Form.Label>
                        <CompanySelect
                          onChange={(value) => setCompanyId(value)}
                          entity={manHour.company}
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
                          companyId={companyId}
                          entity={manHour.division}
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
                          companyId={companyId}
                          divisionId={divisionId}
                          entity={manHour.job_site}
                        />
                      </Form.Group>
                    </Col>
                  )}
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

export default EditManHours;
