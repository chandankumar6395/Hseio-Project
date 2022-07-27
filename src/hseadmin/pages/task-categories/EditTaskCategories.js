import { Button, Card, Col, Form, Row } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';

import { NavLink, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import URLConstants from '../../constants/URLConstants';
import { fetchGET, fetchPUT } from '../../utils/NetworkUtils';
import CompanySelect from '../../components/widgets/CompanySelect';
import DivisionSelect from '../../components/widgets/DivisionSelect';
import JobSiteSelect from '../../components/widgets/JobSiteSelect';
import CustomSelect from '../../components/widgets/CustomSelect';

const EditQuestion = () => {
  const [validated, setValidated] = useState(false);

  const history = useNavigate();

  const [name, setName] = useState('');
  const [industryId, setIndustryId] = useState(-1);
  const [companyId, setCompanyId] = useState(-1);
  const [divisionId, setDivisionId] = useState(-1);
  const [jobSiteId, setJobSiteId] = useState(-1);

  const [tasksCategory, setTasksCategory] = useState(null);
  const params = useParams();
  const { id } = useParams();

  useEffect(() => {
    // eslint-disable-next-line camelcase
    if (tasksCategory != null) {
      setName(tasksCategory.name);
      setIndustryId(tasksCategory.industry_id);
      setCompanyId(tasksCategory.company_id);
      setDivisionId(tasksCategory.division_id);
      setJobSiteId(tasksCategory.job_site_id);
    }
    // eslint-disable-next-line camelcase
  }, [tasksCategory]);

  useEffect(() => {
    console.log(`param is ${params.id}`);
    loadTasksCategory();
  }, []);

  const loadTasksCategory = async () => {
    try {
      const url = `${URLConstants.GET_TASK_CATEGORY_URL}/${id}.json`;

      console.log('getTasksCategory url =', url);

      const response = await fetchGET(url);

      console.log('EditTasksCategory -->', response.data);

      setTasksCategory(response.data);
    } catch (error) {
      toast(error.message || 'Failed');
    }
  };

  const onTasksCategorySubmit = (event) => {
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
      industry_id: industryId,
      company_id: companyId,
      division_id: divisionId,
      job_site_id: jobSiteId,
    };
    postTasksCategory(postData);
  };

  const postTasksCategory = async (data) => {
    try {
      const url = `${URLConstants.GET_TASK_CATEGORY_URL}/${id}.json`;

      await fetchPUT(url, data);

      history('../../private/task-categories');
    } catch (error) {
      toast(error.message || 'Failed');
    }
  };

  const onNameChangeHandler = (event) => {
    console.log(event.target.value);
    setName(event.target.value);
  };
  return (
    <Row>
      <Col>
        <Card>
          <Card.Header>
            Edit Task Categories Details
            <NavLink to="/private/task-categories">
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
          {tasksCategory && (
            <Card.Body>
              <Form
                noValidate
                validated={validated}
                onSubmit={onTasksCategorySubmit}
              >
                {/* Name Field */}
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label>Name</Form.Label>
                      <Form.Control
                        required
                        type="text"
                        rows={2}
                        placeholder="Name"
                        onChange={onNameChangeHandler}
                        value={name}
                      />
                      <Form.Control.Feedback type="invalid">
                        Please provide a valid name.
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>

                  {/* Type Field */}
                  <Col md={6}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label>Industry Name</Form.Label>
                      <CustomSelect
                        params={{
                          url: URLConstants.INDUSTRIES_URL,
                        }}
                        onChange={(value) => {
                          setIndustryId(value);
                        }}
                        entity={tasksCategory.industry}
                      />
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
                        entity={tasksCategory.company}
                      />
                    </Form.Group>
                  </Col>

                  <Col md={6}>
                    {/* Division Id */}
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label>Division</Form.Label>
                      <DivisionSelect
                        onChange={(value) => {
                          setDivisionId(value);
                        }}
                        companyId={companyId}
                        entity={tasksCategory.division}
                      />
                    </Form.Group>
                  </Col>

                  <Col md={6}>
                    {/* Job Site Id */}
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label>Project</Form.Label>
                      <JobSiteSelect
                        onChange={(value) => {
                          setJobSiteId(value);
                        }}
                        companyId={companyId}
                        divisionId={divisionId}
                        entity={tasksCategory.job_site}
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
export default EditQuestion;
