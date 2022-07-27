import { Button, Card, Col, Form, Row } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { fetchPOST } from '../../utils/NetworkUtils';
import URLConstants from '../../constants/URLConstants';
import CustomSelect from '../../components/widgets/CustomSelect';

const NewAuditTaskCategoryQuestions = () => {
  const [validated, setValidated] = useState(false);

  const history = useNavigate();

  const [questionId, setQuestionId] = useState(-1);
  const [auditTaskCategoryId, setAuditTaskCategoryId] = useState(-1);

  useEffect(() => {}, []);

  const onAuditTaskCategoryQuestionsSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      console.log('I am here too');
      event.preventDefault();
      event.stopPropagation();
    } else {
      console.log('I am here');
      event.preventDefault();
      const postData = {
        question_id: questionId,
        audit_task_category_id: auditTaskCategoryId,
      };
      postAuditTaskCategoryQuestion(postData);
    }
    setValidated(true);
  };

  const postAuditTaskCategoryQuestion = async (data) => {
    try {
      await fetchPOST(URLConstants.AUDIT_TASK_CATEGORY_QUESTIONS_URL, data);
      history('../../audit-task-category-questions');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Row>
      <Col>
        <Card>
          <Card.Header>
            Add AuditTaskCategoryQuestions
            <>
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
            </>
          </Card.Header>
          <Card.Body>
            <Form
              noValidate
              validated={validated}
              onSubmit={onAuditTaskCategoryQuestionsSubmit}
            >
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Question</Form.Label>
                    <CustomSelect
                      params={{
                        url: URLConstants.QUESTIONS_URL,
                        company_id: 1,
                      }}
                      onChange={(value) => {
                        setQuestionId(value);
                      }}
                    />
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

export default NewAuditTaskCategoryQuestions;
