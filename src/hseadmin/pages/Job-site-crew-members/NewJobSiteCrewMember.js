import { Button, Card, Col, Form, Row } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';
// import { addJobSiteCrewMembers } from '../../store/actions/job_site_crew_members';
import { fetchPOST } from '../../utils/NetworkUtils';
import { loadJobSiteCrew } from '../../store/actions/jobSiteCrews';
import URLConstants from '../../constants/URLConstants';
import { loadEmployees } from '../../store/actions/employees';
import JobSiteSelect from '../../components/widgets/JobSiteSelect';
import CompanySelect from '../../components/widgets/CompanySelect';
import DivisionSelect from '../../components/widgets/DivisionSelect';

const NewJobSiteCrewMember = () => {
  const [validated, setValidated] = useState(false);

  const history = useNavigate();
  const [jobSiteCrewId, setJobSiteCrewId] = useState(-1);
  const [jobSiteId, setJobSiteId] = useState(-1);
  const [employeeId, setEmployeeId] = useState(-1);
  const [companyId, setCompanyId] = useState(-1);
  const [divisionId, setDivisionId] = useState(-1);

  const dispatch = useDispatch();
  // const jobSites = useSelector(state => state.jobSite.jobSites);
  const employees = useSelector((state) => state.employee.employees);
  const jobSiteCrews = useSelector((state) => state.jobSiteCrew.jobSiteCrews);

  useEffect(() => {
    fetchEmployees();
    fetchJobSiteCrews();
  }, []);

  const fetchEmployees = async () => {
    await dispatch(loadEmployees(1, '', 'name', 'asc'));
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
      job_site_crew_id: jobSiteCrewId,
      company_id: companyId,
      primary_division_id: divisionId,
      job_site_id: jobSiteId,
      employee_id: employeeId,
      // client_id: clientId === -1 ? null : clientId
    };
    postJobSiteCrewMember(postData);
  };

  const postJobSiteCrewMember = async (data) => {
    try {
      // await dispatch(addJobSiteCrewMembers(data));
      await fetchPOST(URLConstants.JOB_SITE_CREW_MEMBERS_URL, data);
      history('../../private/job-site-crew-members');
    } catch (error) {
      console.log(error);
    }
  };

  const onJobSiteCrewIdChangeHandler = (selectedOption) => {
    setJobSiteCrewId(+selectedOption.value);
    console.log(selectedOption.value);
  };

  // const onJobSiteIdChangeHandler = (selectedOption) => {
  //   setJobSiteId(+selectedOption.value);
  //   console.log(selectedOption.value);
  // };

  const onEmployeeIdChangeHandler = (selectedOption) => {
    setEmployeeId(+selectedOption.value);
    console.log(selectedOption.value);
  };

  return (
    <Row>
      <Col>
        <Card>
          <Card.Header>
            Add JobSiteCrewMembers
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
          </Card.Header>
          <Card.Body>
            <Form
              noValidate
              validated={validated}
              onSubmit={onJobSiteCrewMemberSubmit}
            >
              {/* JobSiteCrew Id Field */}
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>JobSiteCrew *</Form.Label>
                    <Select
                      options={jobSiteCrews.map((jobSiteCrew) => {
                        return {
                          value: jobSiteCrew.id,
                          label: jobSiteCrew.name,
                        };
                      })}
                      onChange={onJobSiteCrewIdChangeHandler}
                    />
                  </Form.Group>
                </Col>

                <Col md={6}>
                  {/* Job Site Id */}
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Company *</Form.Label>
                    <CompanySelect
                      onChange={(value) => {
                        setCompanyId(value);
                      }}
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
                    />
                  </Form.Group>
                </Col>

                <Col md={6}>
                  {/* Employee id */}
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Employee *</Form.Label>
                    <Select
                      options={employees.map((employee) => {
                        return {
                          value: employee.id,
                          label: `${employee.user.first_name} ${employee.user.last_name}`,
                        };
                      })}
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

export default NewJobSiteCrewMember;
