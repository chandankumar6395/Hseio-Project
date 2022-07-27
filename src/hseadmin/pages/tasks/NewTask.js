import { Button, Card, Col, Form, Row } from 'react-bootstrap';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchPOST } from '../../utils/NetworkUtils';
import URLConstants from '../../constants/URLConstants';
import CustomSelect from '../../components/widgets/CustomSelect';
import JobSiteSelect from '../../components/widgets/JobSiteSelect';
import DivisionSelect from '../../components/widgets/DivisionSelect';
import CompanySelect from '../../components/widgets/CompanySelect';

const NewAuditReportAnswers = () => {
  const [validated, setValidated] = useState(false);

  const history = useNavigate();

  const [name, setName] = useState('');
  const [longDesc, setLongDesc] = useState('');
  const [shortDesc, setShortDesc] = useState('');
  const [priority, setPriority] = useState('');
  const [startDateTime, setStartDateTime] = useState('');
  const [endDateTime, setEndDateTime] = useState('');
  const [manpower, setManpower] = useState('');
  const [cost, setCost] = useState('');
  const [parentId, setParentId] = useState(-1);
  const [completedDateTime, setCompletedDateTime] = useState('');
  const [industryId, setIndustryId] = useState(-1);
  const [companyId, setCompanyId] = useState(-1);
  const [divisionId, setDivisionId] = useState(-1);
  const [jobSiteId, setJobSiteId] = useState(-1);

  useEffect(() => {}, []);

  const onATaskSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      // console.log('I am here too');
      // console.log(parentId);
      event.preventDefault();
      event.stopPropagation();
    } else {
      // console.log('I am here');
      event.preventDefault();
      const postData = {
        name,
        long_desc: longDesc,
        short_desc: shortDesc,
        priority,
        start_date_time: startDateTime,
        end_date_time: endDateTime,
        manpower,
        cost,
        parent_id: 1,
        completed_date_time: completedDateTime,
        industry_id: industryId,
        company_id: companyId,
        division_id: divisionId,
        job_site_id: jobSiteId,
      };
      postTask(postData);
    }
    setValidated(true);
  };

  const postTask = async (data) => {
    try {
      await fetchPOST(URLConstants.TASKS_URL, data);
      history('../../private/tasks');
    } catch (error) {
      console.log(error);
    }
  };
  const onNameChangeHandler = (event) => {
    console.log(event.target.value);
    setName(event.target.value);
  };

  const onLongDescChangeHandler = (event) => {
    console.log(event.target.value);
    setLongDesc(event.target.value);
  };
  const onShortDescChangeHandler = (event) => {
    console.log(event.target.value);
    setShortDesc(event.target.value);
  };
  const onPriorityChangeHandler = (event) => {
    console.log(event.target.value);
    setPriority(event.target.value);
  };
  const onStartDateTimeChangeHandler = (event) => {
    console.log(event.target.value);
    setStartDateTime(event.target.value);
  };
  const onEndDateTimeChangeHandler = (event) => {
    console.log(event.target.value);
    setEndDateTime(event.target.value);
  };
  const onManpowerChangeHandler = (event) => {
    console.log(event.target.value);
    setManpower(event.target.value);
  };
  const onCostChangeHandler = (event) => {
    console.log(event.target.value);
    setCost(event.target.value);
  };
  const onCompletedDateTimeChangeHandler = (event) => {
    console.log(event.target.value);
    setCompletedDateTime(event.target.value);
  };
  return (
    <Row>
      <Col>
        <Card>
          <Card.Header>
            Add Tasks
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
            <Form noValidate validated={validated} onSubmit={onATaskSubmit}>
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
                  {/* Description Field */}
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={2}
                      placeholder="Description"
                      onChange={onLongDescChangeHandler}
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  {/* Short Desc Field */}
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Short Desc</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Short Desc"
                      onChange={onShortDescChangeHandler}
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  {/* Priority */}
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Priority</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Priority"
                      onChange={onPriorityChangeHandler}
                    />
                  </Form.Group>
                </Col>

                <Col md={6}>
                  {/* Start Date Time */}
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Start Date Time</Form.Label>
                    <Form.Control
                      type="datetime-local"
                      placeholder="Start Date Time"
                      onChange={onStartDateTimeChangeHandler}
                    />
                  </Form.Group>
                </Col>

                <Col md={6}>
                  {/* End Date Time */}
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>End Date Time</Form.Label>
                    <Form.Control
                      type="datetime-local"
                      placeholder="End Date Time"
                      onChange={onEndDateTimeChangeHandler}
                    />
                  </Form.Group>
                </Col>

                <Col md={6}>
                  {/* manpower */}
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>manpower</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="manpower"
                      onChange={onManpowerChangeHandler}
                    />
                  </Form.Group>
                </Col>

                <Col md={6}>
                  {/* Cost */}
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Cost</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Cost"
                      onChange={onCostChangeHandler}
                    />
                  </Form.Group>
                </Col>

                <Col md={6}>
                  {/* Parent Id */}
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label> Parent</Form.Label>
                    <CustomSelect
                      params={{
                        url: URLConstants.TASKS_URL,
                      }}
                      onChange={(value) => {
                        setParentId(value);
                      }}
                    />
                  </Form.Group>
                </Col>

                <Col md={6}>
                  {/* Completed Date Time */}
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Completed Date Time</Form.Label>
                    <Form.Control
                      type="datetime-local"
                      placeholder="Completed Date Time"
                      onChange={onCompletedDateTimeChangeHandler}
                    />
                  </Form.Group>
                </Col>

                <Col md={6}>
                  {/* Industry Id */}
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Industry</Form.Label>
                    <CustomSelect
                      params={{
                        url: URLConstants.INDUSTRIES_URL,
                      }}
                      onChange={(value) => {
                        setIndustryId(value);
                      }}
                    />
                    <Form.Control.Feedback type="invalid">
                      Please provide a valid industry.
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>

                <Col md={6}>
                  {/* Company Id */}
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Company</Form.Label>
                    <CompanySelect
                      onChange={(value) => {
                        setCompanyId(value);
                      }}
                    />
                    <Form.Control.Feedback type="invalid">
                      Please provide a valid company.
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>

                <Col md={6}>
                  {/* Division id */}
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Division</Form.Label>
                    <DivisionSelect
                      onChange={(value) => {
                        setDivisionId(value);
                      }}
                      companyId={companyId}
                    />
                    <Form.Control.Feedback type="invalid">
                      Please provide a valid division.
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>

                <Col md={6}>
                  {/* JobSite Id */}
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Project</Form.Label>
                    <JobSiteSelect
                      onChange={(value) => {
                        setJobSiteId(value);
                      }}
                      companyId={companyId}
                      divisionId={divisionId}
                    />
                    <Form.Control.Feedback type="invalid">
                      Please provide a valid jobSite.
                    </Form.Control.Feedback>
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

export default NewAuditReportAnswers;
