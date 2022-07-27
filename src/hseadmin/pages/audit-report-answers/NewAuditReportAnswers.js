import { Button, Card, Col, Form, Row } from 'react-bootstrap';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchPOST } from '../../utils/NetworkUtils';
import URLConstants from '../../constants/URLConstants';
import CustomSelect from '../../components/widgets/CustomSelect';

const NewAuditReportAnswers = () => {
  const [validated, setValidated] = useState(false);

  const history = useNavigate();

  const [auditReportId, setAuditReportId] = useState(-1);
  const [questionId, setQuestionId] = useState(-1);
  const [answerId, setAnswerId] = useState(-1);
  const [answerValue, setAnswerValue] = useState('');
  const [comments, setComments] = useState('');

  useEffect(() => {}, []);

  const onAuditReportAnswerSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      console.log('I am here too');
      event.preventDefault();
      event.stopPropagation();
    } else {
      console.log('I am here');
      event.preventDefault();
      const postData = {
        audit_report_id: auditReportId,
        question_id: questionId,
        answer_id: answerId,
        answer_value: answerValue,
        comments,
      };
      postAuditReportAnswer(postData);
    }
    setValidated(true);
  };

  const postAuditReportAnswer = async (data) => {
    try {
      await fetchPOST(URLConstants.AUDIT_REPORT_ANSWERS_URL, data);
      history('../../private/audit-report-answers');
    } catch (error) {
      console.log(error);
    }
  };
  const onAnswerValueChangeHandler = (event) => {
    setAnswerValue(event.target.value);
  };

  const onCommentsChangeHandler = (event) => {
    setComments(event.target.value);
  };

  return (
    <Row>
      <Col>
        <Card>
          <Card.Header>
            Add Audit Report Answers
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
              onSubmit={onAuditReportAnswerSubmit}
            >
              <Row>
                <Col md={6}>
                  {/* Audit Report Field */}
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Audit Report *</Form.Label>
                    <CustomSelect
                      params={{
                        url: URLConstants.AUDIT_REPORTS_URL,
                      }}
                      onChange={(value) => {
                        setAuditReportId(value);
                      }}
                    />
                    <Form.Control.Feedback type="invalid">
                      Please provide a valid audit.
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>

                <Col md={6}>
                  {/* Question Field */}
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Question *</Form.Label>
                    <CustomSelect
                      params={{
                        url: URLConstants.QUESTIONS_URL,
                      }}
                      onChange={(value) => {
                        setQuestionId(value);
                      }}
                    />
                    <Form.Control.Feedback type="invalid">
                      Please provide a valid question.
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>

                <Col md={6}>
                  {/* Answer Field */}
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Answer *</Form.Label>
                    <CustomSelect
                      params={{
                        url: URLConstants.ANSWERS_URL,
                      }}
                      onChange={(value) => {
                        setAnswerId(value);
                      }}
                    />
                  </Form.Group>
                </Col>

                <Col md={6}>
                  {/* Answer Value Field */}
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Answer Value</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Answer Value"
                      onChange={onAnswerValueChangeHandler}
                    />
                  </Form.Group>
                </Col>

                <Col md={6}>
                  {/* Comment Field */}
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Comment</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Comment"
                      onChange={onCommentsChangeHandler}
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

export default NewAuditReportAnswers;
