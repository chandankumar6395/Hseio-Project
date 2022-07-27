import { Button, Card, Col, Form, Row } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { NavLink, useNavigate, useParams } from 'react-router-dom';
import {
  getJobSiteCrew,
  updateJobSiteCrew,
} from '../../store/actions/jobSiteCrews';
// import Select from 'react-select';
import CompanySelect from '../../components/widgets/CompanySelect';
import DivisionSelect from '../../components/widgets/DivisionSelect';
import JobSiteSelect from '../../components/widgets/JobSiteSelect';

const EditJobSiteCrew = () => {
  const [validated, setValidated] = useState(false);

  const history = useNavigate();

  const [name, setName] = useState('');
  const [shortDesc, setShortDesc] = useState('');
  const [longDesc, setLongDesc] = useState('');
  const [jobSiteId, setJobSiteId] = useState('');
  const [companyId, setCompanyId] = useState(-1);
  const [divisionId, setDivisionId] = useState(-1);
  const [selectedCompanyId, setSelectedCompanyId] = useState({});
  const [selectedDivisionId, setSelectedDivisionId] = useState({});
  const [selectedJobSiteId, setSelectedJobSiteId] = useState({});

  const dispatch = useDispatch();
  const jobSiteCrew = useSelector((state) => state.jobSiteCrew.jobSiteCrew);
  // const jobSites = useSelector((state) => state.jobSite.jobSites);

  const params = useParams();
  const { id } = useParams();

  useEffect(() => {
    if (jobSiteCrew != null) {
      setName(jobSiteCrew.name);
      setShortDesc(jobSiteCrew.short_desc);
      setLongDesc(jobSiteCrew.long_desc);
      setCompanyId(jobSiteCrew.company_id);
      setDivisionId(jobSiteCrew.primary_division_id);
      setJobSiteId(jobSiteCrew.job_site_id);
      setSelectedJobSiteId({
        value: jobSiteCrew.job_site_id,
        // label: jobSiteCrew.job_site_id.name
      });
      setSelectedDivisionId({
        value: jobSiteCrew.primary_division_id,
        // label: jobSiteCrew.primary_division_id.name
      });
      setSelectedCompanyId({
        value: jobSiteCrew.company_id,
        // label: jobSiteCrew.company_id.name
      });
    }
  }, [jobSiteCrew]);

  useEffect(() => {
    console.log(`param is ${params.id}`);
    loadJobSiteCrew();
  }, []);

  const loadJobSiteCrew = async () => {
    await dispatch(getJobSiteCrew(id));
  };

  const onJobSiteCrewSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
    event.preventDefault();
    const postData = {
      id,
      name,
      short_desc: shortDesc,
      long_desc: longDesc,
      company_id: companyId,
      primary_division_id: divisionId,
      job_site_id: jobSiteId,
    };
    postJobSiteCrew(postData);
  };

  const postJobSiteCrew = async (data) => {
    await dispatch(updateJobSiteCrew(data));
    history('../../private/job-site-crews');
  };

  const onNameChangeHandler = (event) => {
    console.log(event.target.value);
    setName(event.target.value);
  };

  const onShortDescChangeHandler = (event) => {
    console.log(event.target.value);
    setShortDesc(event.target.value);
  };

  const onLongDescChangeHandler = (event) => {
    console.log(event.target.value);
    setLongDesc(event.target.value);
  };

  // const onJobSiteIdChangeHandler = (event) => {
  //   setJobSiteId(event.target.value);
  //   console.log(event.target.value);
  // };

  return (
    <Row>
      <Col>
        <Card>
          <Card.Header>
            Edit Project Crew
            <NavLink to="/private/job-site-crews">
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
              onSubmit={onJobSiteCrewSubmit}
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
                      value={name}
                    />
                    <Form.Control.Feedback type="invalid">
                      Please provide a valid name.
                    </Form.Control.Feedback>
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
                      value={shortDesc}
                    />
                  </Form.Group>
                </Col>

                <Col md={6}>
                  {/* Long Desc Field */}
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Long Desc</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Long Desc"
                      onChange={onLongDescChangeHandler}
                      value={longDesc}
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  {/* Company Id */}
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Company *</Form.Label>
                    <CompanySelect
                      onChange={(value) => {
                        setCompanyId(value);
                      }}
                      value={selectedCompanyId}
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  {/* Division Id */}
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Division *</Form.Label>
                    <DivisionSelect
                      onChange={(value) => {
                        setDivisionId(value);
                      }}
                      companyId={companyId}
                      value={selectedDivisionId}
                    />
                  </Form.Group>
                </Col>

                <Col md={6}>
                  {/* Job Site Id */}
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Project *</Form.Label>
                    <JobSiteSelect
                      onChange={(value) => {
                        setJobSiteId(value);
                      }}
                      companyId={companyId}
                      divisionId={divisionId}
                      value={selectedJobSiteId}
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

export default EditJobSiteCrew;
