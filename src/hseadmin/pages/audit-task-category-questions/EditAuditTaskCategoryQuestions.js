import { Button, Card, Col, Form, Row } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import URLConstants from '../../constants/URLConstants';
import { fetchGET, fetchPUT } from '../../utils/NetworkUtils';
import { toast } from 'react-toastify';
import CustomSelect from '../../components/widgets/CustomSelect';

const EditAuditTaskCategoryQuestions = () => {
  const [validated, setValidated] = useState(false);

  const history = useNavigate();

  const [auditTaskCategoryId, setAuditTaskCategoryId] = useState(-1);
  const [questionId, setQuestionId] = useState(-1);
  const [auditTaskCategoryQuestion, setAuditTaskCategoryQuestion] =
    useState(null);

  const params = useParams();
  const { id } = useParams();

  useEffect(() => {
    if (auditTaskCategoryQuestion != null) {
      setQuestionId(auditTaskCategoryQuestion.question_id);
      setAuditTaskCategoryId(auditTaskCategoryQuestion.audit_task_category_id);
    }
  }, [auditTaskCategoryQuestion]);

  useEffect(() => {
    console.log(`param is ${params.id}`);
    loadAuditTaskCategoryQuestion();
  }, []);

  const loadAuditTaskCategoryQuestion = async () => {
    try {
      const url = `${URLConstants.GET_AUDIT_TASK_CATEGORY_QUESTION_URL}/${id}.json`;
      const response = await fetchGET(url);
      setAuditTaskCategoryQuestion(response.data);
    } catch (error) {
      toast(error.message || 'Failed');
    }
  };

  const onAuditTaskCategoryQuestionSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
    event.preventDefault();
    const postData = {
      id,
      questionId,
      auditTaskCategoryId,
    };
    postAuditTaskCategoryQuestions(postData);
  };

  const postAuditTaskCategoryQuestions = async (data) => {
    try {
      const url = `${URLConstants.GET_AUDIT_TASK_CATEGORY_URL}/${id}.json`;

      await fetchPUT(url, data);

      history('../../audit-task-category-questions');
    } catch (error) {
      toast(error.message || 'Failed');
    }
  };

  return (
    <Row>
      <Col>
        <Card>
          <Card.Header>
            Edit Audit Task Category Question
            <NavLink to="/audit-task-category-questions">
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
          {auditTaskCategoryQuestion !== null && (
            <Card.Body>
              <Form
                noValidate
                validated={validated}
                onSubmit={onAuditTaskCategoryQuestionSubmit}
              >
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label>Question</Form.Label>
                      <CustomSelect
                        params={{
                          url: URLConstants.QUESTIONS_URL,
                        }}
                        onChange={(value) => {
                          setQuestionId(value);
                        }}
                        entity={auditTaskCategoryQuestion.question}
                      />
                      <Form.Control.Feedback type="invalid">
                        Please provide a valid name.
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label>Audit Task Category</Form.Label>
                      <CustomSelect
                        params={{
                          url: URLConstants.AUDIT_TASK_CATEGORIES_URL,
                        }}
                        onChange={(value) => {
                          setAuditTaskCategoryId(value);
                        }}
                        entity={auditTaskCategoryQuestion.audit_task_category}
                      />
                      <Form.Control.Feedback type="invalid">
                        Please provide a valid Audit Task.
                      </Form.Control.Feedback>
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

export default EditAuditTaskCategoryQuestions;
