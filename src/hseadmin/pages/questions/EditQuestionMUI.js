import { Col, Form, Row } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { Link, NavLink, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Helmet } from 'react-helmet-async';
import { Button, Grid, Typography } from '@mui/material';
import Select from 'react-select';
import URLConstants from '../../constants/URLConstants';
import { fetchGET, fetchPUT } from '../../utils/NetworkUtils';
import CompanySelect from '../../components/widgets/CompanySelect';
import DivisionSelect from '../../components/widgets/DivisionSelect';
import JobSiteSelect from '../../components/widgets/JobSiteSelect';
import { getQuestion } from '../../store/actions/questions';
import CustomMultiSelect from '../../components/widgets/CustomMultiSelect';
import { CustomBreadcrumbs, CustomDivider } from '../../utils/MUIStyle';
import { DATA_QUESTION_TYPES } from '../../constants/Constants';

const EditQuestionMUI = () => {
  const [validated, setValidated] = useState(false);

  const history = useNavigate();

  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [companyId, setCompanyId] = useState(-1);
  const [divisionId, setDivisionId] = useState(-1);
  const [jobSiteId, setJobSiteId] = useState(-1);
  const [auditTaskCategories, setAuditTaskCategories] = useState([]);
  const [auditTaskCategoriesOptions, setAuditTaskCategoriesOptions] = useState(
    []
  );
  const [selectedTypeOption, setSelectedTypeOption] = useState({});

  const dispatch = useDispatch();

  const [question, setQuestion] = useState();
  const params = useParams();
  const { id } = useParams();

  useEffect(() => {
    // eslint-disable-next-line camelcase
    if (question != null) {
      setName(question.name);
      setType(question.type);
      setCompanyId(question.company_id);
      setDivisionId(question.division_id);
      setJobSiteId(question.job_site_id);
      setAuditTaskCategories(question.audit_task_categories);
      setSelectedTypeOption({
        value: question.type,
        label: DATA_QUESTION_TYPES.find((x) => x.value === question.type).label,
      });
      const localOptions = [];

      question.audit_task_categories.forEach((item) => {
        localOptions.push({
          id: item.id,
        });
      });

      setAuditTaskCategoriesOptions(localOptions);
    }
    // eslint-disable-next-line camelcase
  }, [question]);

  useEffect(() => {
    console.log(`param is ${params.id}`);
    loadQuestion();
  }, []);

  const loadQuestion = async () => {
    try {
      const url = `${URLConstants.GET_QUESTION_URL}/${id}.json`;

      console.log('getQuestion url =', url);

      const response = await fetchGET(url);

      console.log('EditQuestion -->', response.data);

      setQuestion(response.data);
    } catch (error) {
      toast(error.message || 'Failed');
    }
    await dispatch(getQuestion(id));
  };

  const onQuestionSubmit = (event) => {
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
      type,
      company_id: companyId,
      division_id: divisionId,
      job_site_id: jobSiteId,
      audit_task_categories: auditTaskCategoriesOptions,
    };
    postQuestion(postData);
  };

  const postQuestion = async (data) => {
    try {
      const url = `${URLConstants.GET_QUESTION_URL}/${id}.json`;

      await fetchPUT(url, data);

      history('../../private/questions');
    } catch (error) {
      toast(error.message || 'Failed');
    }
  };

  const onNameChangeHandler = (event) => {
    console.log(event.target.value);
    setName(event.target.value);
  };
  const onTypeChangeHandler = (selectedOption) => {
    // console.log(event.target.value);
    setType(selectedOption.value);
    setSelectedTypeOption(selectedOption);
  };
  return (
    <>
      <Helmet title="Edit Question" />

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
            <Typography>Edit Question</Typography>
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
          {question && (
            <Form noValidate validated={validated} onSubmit={onQuestionSubmit}>
              {/* Name Field */}
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Name *</Form.Label>
                    <Form.Control
                      required
                      as="textarea"
                      rows={2}
                      placeholder="Name *"
                      onChange={onNameChangeHandler}
                      value={name}
                    />
                    <Form.Control.Feedback type="invalid">
                      Please provide a valid name.
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>

                {/* Type Feild */}
                <Col md={6}>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Type</Form.Label>
                    <Select
                      options={DATA_QUESTION_TYPES.map((item) => {
                        return { value: item.value, label: item.label };
                      })}
                      onChange={onTypeChangeHandler}
                      value={selectedTypeOption}
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
                      entity={question.company}
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
                      entity={question.division}
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
                      entity={question.job_site}
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Audit Task Categories</Form.Label>
                    <CustomMultiSelect
                      params={{ url: URLConstants.AUDIT_TASK_CATEGORIES_URL }}
                      onChange={(value) => {
                        setAuditTaskCategoriesOptions(value);
                      }}
                      entities={auditTaskCategories}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Button variant="contained" type="submit" color="primary">
                Submit
              </Button>
            </Form>
          )}
        </Grid>
      </Grid>
    </>
  );
};
export default EditQuestionMUI;
