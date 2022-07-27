import { Button, Card, Col, Form, Row } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { NavLink, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import URLConstants from '../../constants/URLConstants';
import { fetchGET, fetchPUT } from '../../utils/NetworkUtils';
import CompanySelect from '../../components/widgets/CompanySelect';
import DivisionSelect from '../../components/widgets/DivisionSelect';
import JobSiteSelect from '../../components/widgets/JobSiteSelect';
import { getQuestion } from '../../store/actions/questions';
import CustomMultiSelect from '../../components/widgets/CustomMultiSelect';

const EditQuestion = () => {
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
  const onTypeChangeHandler = (event) => {
    console.log(event.target.value);
    setType(event.target.value);
  };
  return (
    <Row>
      <Col>
        <Card>
          <Card.Header>
            Edit Question Details
            <NavLink to="/private/questions">
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
          {question && (
            <Card.Body>
              <Form
                noValidate
                validated={validated}
                onSubmit={onQuestionSubmit}
              >
                {/* Name Field */}
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label>Name</Form.Label>
                      <Form.Control
                        required
                        as="textarea"
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

                  {/* Type Feild */}
                  <Col md={6}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label>Type</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Type"
                        onChange={onTypeChangeHandler}
                        value={type}
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
                        entity={question.company}
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
                        entity={question.division}
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
