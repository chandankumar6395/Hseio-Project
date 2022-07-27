import { Button, Card, Col, Form, Row } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import Select from 'react-select';
import { fetchPUT } from '../../utils/NetworkUtils';
import URLConstants from '../../constants/URLConstants';
import { loadJobSiteCrew } from '../../store/actions/jobSiteCrews';

import { loadEmployees } from '../../store/actions/employees';
import {
  loadJobSiteCrewMembers,
  updateJobSiteCrewMember,
  getJobSiteCrewMember,
} from '../../store/actions/job_site_crew_members';
import { loadJobSites } from '../../store/actions/jobSites';

const EditJobSiteCrewMember = () => {
  const [validated, setValidated] = useState(false);
  const history = useNavigate();

  const [jobSiteCrewId, setJobSiteCrewId] = useState(-1);
  const [jobSiteId, setJobSiteId] = useState(-1);
  const [employeeId, setEmployeeId] = useState(-1);
  // const [companyId, setCompanyId] = useState(-1);
  // const [divisionId, setDivisionId] = useState(-1);
  const [selectedJobSiteOption, setSelectedJobSiteOption] = useState({});
  const [selectedEmployeeOption, setSelectedEmployeeOption] = useState({});
  const [selectedJobSiteCrewIdOption, setSelectedJobSiteCrewIdOption] =
    useState({});

  const dispatch = useDispatch();

  useEffect(() => {
    fetchJobSiteCrewMember();
  }, []);

  const fetchJobSiteCrewMember = async () => {
    await dispatch(loadJobSiteCrewMembers());
  };

  const jobSites = useSelector((state) => state.jobSite.jobSites);
  const employees = useSelector((state) => state.employee.employees);
  const jobSiteCrewMember = useSelector(
    (state) => state.jobSiteCrewMember.jobSiteCrewMember
  );
  const jobSiteCrews = useSelector((state) => state.jobSiteCrew.jobSiteCrews);

  const params = useParams();
  const { id } = useParams();

  useEffect(() => {
    if (jobSiteCrewMember != null) {
      setJobSiteCrewId(jobSiteCrewMember.job_site_crew_id);
      setJobSiteId(jobSiteCrewMember.job_site_id);
      setEmployeeId(jobSiteCrewMember.employee.user.first_name);
      setSelectedJobSiteCrewIdOption({
        value: jobSiteCrewMember.job_site_crew.id,
        label: jobSiteCrewMember.job_site_crew.name,
      });
      setSelectedJobSiteOption({
        value: jobSiteCrewMember.job_site.id,
        label: jobSiteCrewMember.job_site.name,
      });
      setSelectedEmployeeOption({
        value: jobSiteCrewMember.employee.user.id,
        label: jobSiteCrewMember.employee.user.first_name,
      });
      // if (jobSite.client !== null) {
      //   setSelectedClientOption({
      //     value: jobSite.client.id,
      //     label: jobSite.client.name
      //   });
      // }
    }
  }, [jobSiteCrewMember]);

  useEffect(() => {
    console.log(`param is ${params.id}`);
    loadJobSiteCrewMember();
    fetchEmployees();
    fetchJobSiteCrews();
    fetchJobSites();
  }, []);

  const loadJobSiteCrewMember = async () => {
    await dispatch(getJobSiteCrewMember(id));
  };

  const fetchJobSites = async () => {
    await dispatch(loadJobSites(1, '', 'name', 'asc', 100));
  };
  const fetchEmployees = async () => {
    await dispatch(loadEmployees(1, '', 'name', 'asc', 100));
  };

  const fetchJobSiteCrews = async () => {
    await dispatch(loadJobSiteCrew(1, '', 'name', 'asc', 100));
  };

  const onJobSiteCrewMemberSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
    event.preventDefault();
    const postData = {
      id,
      job_site_crew_id: jobSiteCrewId,
      // company_id: jobSiteCrewId,
      // division_id: divisionId,
      job_site_id: jobSiteId,
      employee_id: employeeId,
    };
    postJobSiteCrewMember(postData);
  };

  const postJobSiteCrewMember = async (data) => {
    try {
      const url = `${URLConstants.GET_JOB_SITE_CREW_MEMBER_URL}/${jobSiteCrewMember.id}.json`;
      await fetchPUT(url, data);
      await dispatch(updateJobSiteCrewMember(data));
      history('../../private/job-site-crew-members');
    } catch (error) {
      console.log(error);
    }
  };

  const onJobSiteCrewIdChangeHandler = (selectedOption) => {
    setJobSiteCrewId(+selectedOption.value);
    setSelectedJobSiteCrewIdOption(selectedOption);
    // console.log(selectedOption.value);
  };
  const onJobSiteIdChangeHandler = (selectedOption) => {
    setEmployeeId(+selectedOption.value);
    setSelectedEmployeeOption(selectedOption);
    console.log(selectedOption.value);
  };

  const onEmployeeIdChangeHandler = (selectedOption) => {
    setEmployeeId(+selectedOption.value);
    setSelectedEmployeeOption(selectedOption);
    console.log(selectedOption.value);
  };

  return (
    <Row>
      <Col>
        <Card>
          <Card.Header>
            Edit JobSiteCrewMember
            <>
              <Button
                className="btn-sm"
                variant="primary"
                type="button"
                style={{ float: 'right' }}
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
              onSubmit={onJobSiteCrewMemberSubmit}
            >
              <Row>
                <Col md={6}>
                  {/* JobSiteCrew Field */}
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>JobSiteCrew *</Form.Label>
                    <Select
                      options={jobSiteCrews.map((jobSiteCrew) => {
                        return {
                          value: jobSiteCrew.id,
                          label: jobSiteCrew.name,
                        };
                      })}
                      value={selectedJobSiteCrewIdOption}
                      onChange={onJobSiteCrewIdChangeHandler}
                    />
                    <Form.Control.Feedback type="invalid">
                      Please provide a valid name.
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>

                {/* <Col md={6}> */}
                {/*  /!* Company Id *!/ */}
                {/*  <Form.Group className="mb-3" controlId="formBasicEmail"> */}
                {/*    <Form.Label>Company</Form.Label> */}
                {/*    <CompanySelect */}
                {/*      onChange={(value) => { */}
                {/*        setCompanyId(value); */}
                {/*      }} */}
                {/*    /> */}
                {/*  </Form.Group> */}
                {/* </Col> */}

                {/* <Col md={6}> */}
                {/*  /!* Division Id *!/ */}
                {/*  <Form.Group className="mb-3" controlId="formBasicEmail"> */}
                {/*    <Form.Label>Division</Form.Label> */}
                {/*    <DivisionSelect */}
                {/*      onChange={(value) => { */}
                {/*        setDivisionId(value); */}
                {/*      }} */}
                {/*      companyId={companyId} */}
                {/*    /> */}
                {/*  </Form.Group> */}
                {/* </Col> */}

                <Col md={6}>
                  {/* Job Site Id */}
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Project *</Form.Label>
                    <Select
                      options={jobSites.map((jobSite) => {
                        return {
                          value: jobSite.id,
                          label: jobSite.name,
                        };
                      })}
                      value={selectedJobSiteOption}
                      onChange={onJobSiteIdChangeHandler}
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  {/* Employee id */}
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Employee Name *</Form.Label>
                    <Select
                      options={employees.map((employee) => {
                        return {
                          value: employee.id,
                          label: `${employee.user.first_name} ${employee.user.last_name}`,
                        };
                      })}
                      value={selectedEmployeeOption}
                      onChange={onEmployeeIdChangeHandler}
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

export default EditJobSiteCrewMember;
