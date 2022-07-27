import { Button, Card, Col, Form, Row } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';
import Select from 'react-select';
import { fetchPOST } from '../../utils/NetworkUtils';
import URLConstants from '../../constants/URLConstants';
import JobSiteSelect from '../../components/widgets/JobSiteSelect';
import CompanySelect from '../../components/widgets/CompanySelect';
import DivisionSelect from '../../components/widgets/DivisionSelect';
import CustomMultiSelect from '../../components/widgets/CustomMultiSelect';
import { DATA_ANSWERS, DATA_QUESTION_TYPES } from '../../constants/Constants';

const NewQuestion = () => {
  const [validated, setValidated] = useState(false);

  const history = useNavigate();
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [companyId, setCompanyId] = useState(-1);
  const [divisionId, setDivisionId] = useState(-1);
  const [jobSiteId, setJobSiteId] = useState(-1);
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
  };

  const postQuestion = async (data) => {
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
    <Row>
      <Col>
        <Card>
          <Card.Header>
            Add Question
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
            <Form noValidate validated={validated} onSubmit={onQuestionSubmit}>
              <Row>
                <Col md={6}>
                  {/* Name Feild */}
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      required
                      as="textarea"
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
                    <Form.Label>Company</Form.Label>
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
export default NewQuestion;
