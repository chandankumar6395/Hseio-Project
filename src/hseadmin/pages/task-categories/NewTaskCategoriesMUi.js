import { Col, Form, Row } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';

import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Button, Grid, Typography } from '@mui/material';
import { toast } from 'react-toastify';
import { fetchPOST } from '../../utils/NetworkUtils';
import URLConstants from '../../constants/URLConstants';
import CustomSelect from '../../components/widgets/CustomSelect';
import { CustomBreadcrumbs, CustomDivider } from '../../utils/MUIStyle';
import DivisionSelect from '../../components/widgets/DivisionSelect';
import JobSiteSelect from '../../components/widgets/JobSiteSelect';

const NewTaskCategoriesMUI = () => {
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
    if (name === '') {
      toast('Please Select task categories Name');
    } else {
      const postData = {
        name,
        industry_id: industryId,
        company_id: companyId,
        division_id: divisionId,
        job_site_id: jobSiteId,
      };
      postTaskCategory(postData);
    }
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
    <>
      <Helmet title="Add Task Category" />

      <Grid justifyContent="space-between" container spacing={10}>
        <Grid item>
          <Typography variant="h3" gutterBottom display="inline">
            Task Categories
          </Typography>

          <CustomBreadcrumbs aria-label="Breadcrumb" mt={2}>
            <Link component={NavLink} to="/">
              Dashboard
            </Link>
            <Link component={NavLink} to="/private/task-categories">
              Task Categories
            </Link>
            <Typography>Add Task Category</Typography>
          </CustomBreadcrumbs>
        </Grid>
        <Grid item>
          <div>
            <NavLink to="/private/task-categories">
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
            onSubmit={onTaskCategorySubmit}
          >
            <Row>
              <Col md={6}>
                {/* Name Feild */}
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Name *</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    rows={2}
                    placeholder="Name *"
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
                  <DivisionSelect
                    onChange={(value) => {
                      setDivisionId(value);
                    }}
                    companyId={companyId}
                  />
                </Form.Group>
              </Col>

              <Col md={6}>
                {/* JobSite id */}
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Project</Form.Label>
                  <JobSiteSelect
                    onChange={(value) => {
                      setJobSiteId(value);
                    }}
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
export default NewTaskCategoriesMUI;
