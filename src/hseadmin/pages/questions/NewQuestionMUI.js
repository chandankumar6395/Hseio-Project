import { Col, Form, Row } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';

import { Link, NavLink, useNavigate } from 'react-router-dom';
import Select from 'react-select';
import { Helmet } from 'react-helmet-async';
import { Button, Grid, Typography } from '@mui/material';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { fetchPOST } from '../../utils/NetworkUtils';
import URLConstants from '../../constants/URLConstants';
import JobSiteSelect from '../../components/widgets/JobSiteSelect';
import CompanySelect from '../../components/widgets/CompanySelect';
import DivisionSelect from '../../components/widgets/DivisionSelect';
import CustomMultiSelect from '../../components/widgets/CustomMultiSelect';
import {
  DATA_ANSWERS,
  DATA_QUESTION_TYPES,
  KEY_COMPANY_ID,
} from '../../constants/Constants';
import { CustomBreadcrumbs, CustomDivider } from '../../utils/MUIStyle';

const NewQuestionMUI = () => {
  const localCompanyId = localStorage.getItem(KEY_COMPANY_ID);
  const localDivisionId = useSelector((state) => state.auth.selectedDivision);
  const localJobSiteId = useSelector((state) => state.auth.selectedJobSite);

  console.log('NewEquipmentMUI localCompanyId', localCompanyId);
  console.log('NewEquipmentMUI localDivisionId', localDivisionId);
  console.log('NewEquipmentMUI localJobSiteId', localJobSiteId);

  const [validated, setValidated] = useState(false);

  const history = useNavigate();
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [companyId, setCompanyId] = useState(localCompanyId);
  const [divisionId, setDivisionId] = useState(localDivisionId);
  const [jobSiteId, setJobSiteId] = useState(localJobSiteId);
  const [auditTaskCategories, setAuditTaskCategories] = useState([]);
  const [selectedAnswers, setSelectedAnswers] = useState([]);

  useEffect(() => {}, []);

  const onQuestionSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
    event.preventDefault();
    if (name === '') {
      toast('Please Enter question Name');
    } else if (companyId === null) {
      toast('Please select Company');
    } else if (divisionId === -1) {
      toast('Please select Division');
    } else if (jobSiteId === -1) {
      toast('Please select JobSite');
    } else {
      const postData = {
        name,
        type,
        company_id: companyId,
        division_id: divisionId,
        job_site_id: jobSiteId,
        audit_task_categories: auditTaskCategories,
        answers: selectedAnswers,
      };
      postQuestion(postData);
    }
  };

  const postQuestion = async (data) => {
    console.log(data);
    try {
      await fetchPOST(URLConstants.QUESTIONS_URL, data);
      history('../../private/questions');
    } catch (error) {
      console.log(error);
    }
  };

  const onNameChangeHandler = (event) => {
    // console.log(event.target.value);
    setName(event.target.value);
  };
  return (
    <>
      <Helmet title="Add Question" />

      <Grid justifyContent="space-between" container spacing={10}>
        <Grid item>
          <Typography variant="h3" gutterBottom display="inline">
            Questions
          </Typography>

          <CustomBreadcrumbs aria-label="Breadcrumb" mt={2}>
            <Link component={NavLink} to="/">
              Dashboard
            </Link>
            <Link component={NavLink} to="/private/questions">
              Questions
            </Link>
            <Typography>Add Question</Typography>
          </CustomBreadcrumbs>
        </Grid>
        <Grid item>
          <div>
            <NavLink to="/private/questions">
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
          <Form noValidate validated={validated} onSubmit={onQuestionSubmit}>
            <Row>
              <Col md={6}>
                {/* Name Feild */}
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Name *</Form.Label>
                  <Form.Control
                    required
                    as="textarea"
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
                {/* Type Feild */}
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Type</Form.Label>
                  <Select
                    required
                    options={DATA_QUESTION_TYPES}
                    onChange={(selectedOption) => {
                      console.log(selectedOption);

                      setType(selectedOption.value);
                    }}
                  />
                  <Form.Control.Feedback type="invalid">
                    Please provide a valid name.
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col md={6}>
                {/* Company id */}
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
                {/* Division id */}
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
                {/* JobSite id */}
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
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Audit Task Categories</Form.Label>
                  <CustomMultiSelect
                    params={{ url: URLConstants.AUDIT_TASK_CATEGORIES_URL }}
                    onChange={(value) => {
                      setAuditTaskCategories(value);
                    }}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Select Answer</Form.Label>
                  <Select
                    isMulti
                    required
                    options={DATA_ANSWERS.map((item) => {
                      return { value: item.key, label: item.name };
                    })}
                    onChange={(selectedOption) => {
                      console.log(selectedOption);

                      const temp = [];
                      for (let i = 0; i < selectedOption.length; i += 1) {
                        const answer = DATA_ANSWERS.find(
                          (x) => x.key === +selectedOption[i].value
                        );
                        temp.push(answer);
                      }
                      console.log(temp);
                      setSelectedAnswers(temp);
                    }}
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
export default NewQuestionMUI;
