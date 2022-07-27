import { Button, Card, Col, Form, Row } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';
import { fetchPOST } from '../../utils/NetworkUtils';
import URLConstants from '../../constants/URLConstants';
import CustomSelect from '../../components/widgets/CustomSelect';

const NewTaskCategories = () => {
  const [validated, setValidated] = useState(false);

  const history = useNavigate();
  const [name, setName] = useState('');
  const [industryId, setIndustryId] = useState('');
  const [companyId, setCompanyId] = useState('');
  const [divisionId, setDivisionId] = useState('');
  const [jobSiteId, setJobSiteId] = useState('');

  useEffect(() => {}, []);

  const onTaskCategorySubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
    event.preventDefault();
    const postData = {
      name,
      industry_id: industryId,
      company_id: companyId,
      division_id: divisionId,
      job_site_id: jobSiteId,
    };
    postTaskCategory(postData);
  };

  const postTaskCategory = async (data) => {
    try {
      await fetchPOST(URLConstants.TASK_CATEGORIES_URL, data);
      history('../../private/task-categories');
    } catch (error) {
      console.log(error);
    }
  };

  const onNameChangeHandler = (event) => {
    setName(event.target.value);
  };

  return (
    <Row>
      <Col>
        <Card>
          <Card.Header>
            Add Tasks Categories
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
              onSubmit={onTaskCategorySubmit}
            >
              <Row>
                <Col md={6}>
                  {/* Name Feild */}
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      required
                      type="text"
                      rows={2}
                      placeholder="Name"
                      onChange={onNameChangeHandler}
                    />
                    <Form.Control.Feedback type="invalid">
                      Please provide a valid name.
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>

                <Col md={6}>
                  {/* Indusrty Feild */}
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
                      Please provide a valid Industry.
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col md={6}>
                  {/* Company id */}
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Company</Form.Label>
                    <CustomSelect
                      params={{
                        url: URLConstants.COMPANIES_URL,
                      }}
                      onChange={(value) => {
                        setCompanyId(value);
                      }}
                    />
                  </Form.Group>
                </Col>

                <Col md={6}>
                  {/* Division id */}
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Division</Form.Label>
                    <CustomSelect
                      params={{
                        url: URLConstants.DIVISIONS_URL,
                      }}
                      onChange={(value) => {
                        setDivisionId(value);
                      }}
                    />
                  </Form.Group>
                </Col>

                <Col md={6}>
                  {/* JobSite id */}
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Project</Form.Label>
                    <CustomSelect
                      params={{
                        url: URLConstants.JOB_SITES_URL,
                      }}
                      onChange={(value) => {
                        setJobSiteId(value);
                      }}
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
export default NewTaskCategories;
