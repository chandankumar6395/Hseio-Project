import { Button, Card, Col, Form, Row } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate, useParams } from 'react-router-dom';

import { toast } from 'react-toastify';
import URLConstants from '../../constants/URLConstants';
import { fetchGET, fetchPUT } from '../../utils/NetworkUtils';
import CustomSelect from '../../components/widgets/CustomSelect';

const EditAuditReportAnswer = () => {
  const [validated, setValidated] = useState(false);

  const history = useNavigate();

  const [auditReportId, setAuditReportId] = useState(-1);
  const [questionId, setQuestionId] = useState(-1);
  const [answerId, setAnswerId] = useState(-1);
  const [answerValue, setAnswerValue] = useState('');
  const [comments, setComments] = useState('');
  const [auditReportAnswer, setAuditReportAnswer] = useState(null);

  const { id } = useParams();
  const params = useParams();

  useEffect(() => {
    if (auditReportAnswer != null) {
      setAuditReportId(auditReportAnswer.audit_report_id);
      setQuestionId(auditReportAnswer.question_id);
      setAnswerId(auditReportAnswer.answer_id);
      setAnswerValue(auditReportAnswer.answer_value);
      setComments(auditReportAnswer.comments);
    }
  }, [auditReportAnswer]);

  useEffect(() => {
    console.log(`param is ${params.id}`);
    loadAuditReportAnswer();
  }, []);

  const loadAuditReportAnswer = async () => {
    try {
      const url = `${URLConstants.GET_AUDIT_REPORT_ANSWER_URL}/${id}.json`;
      const response = await fetchGET(url);
      setAuditReportAnswer(response.data);
    } catch (error) {
      toast(error.message || 'Failed');
    }
  };

  const onAuditReportAnswerSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
    event.preventDefault();
    const postData = {
      id,
      audit_report_id: auditReportId,
      question_id: questionId,
      answer_id: answerId,
      answerValue,
      comments,
    };
    postAuditReportAnswer(postData);
  };

  const postAuditReportAnswer = async (data) => {
    try {
      const url = `${URLConstants.GET_AUDIT_REPORT_ANSWER_URL}/${id}.json`;

      await fetchPUT(url, data);

      history('../../private/audit-report-answers');
    } catch (error) {
      toast(error.message || 'Failed');
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
            Edit Audit Report Answers
            <NavLink to="/private/audit-report-answers">
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
          {auditReportAnswer && (
            <Card.Body>
              <Form
                noValidate
                validated={validated}
                onSubmit={onAuditReportAnswerSubmit}
              >
                <Row>
                  <Col md={6}>
                    {' '}
                    {/* Audit report Field */}{' '}
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label>Audit Report *</Form.Label>
                      <CustomSelect
                        params={{
                          url: URLConstants.AUDIT_REPORTS_URL,
                        }}
                        onChange={(value) => {
                          setAuditReportId(value);
                        }}
                        entity={auditReportAnswer.audit_report}
                      />
                      <Form.Control.Feedback type="invalid">
                        Please provide a valid Audit Report.
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    {/* question */}
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label>Question *</Form.Label>
                      <CustomSelect
                        params={{
                          url: URLConstants.QUESTIONS_URL,
                        }}
                        onChange={(value) => {
                          setQuestionId(value);
                        }}
                        entity={auditReportAnswer.question}
                      />
                      <Form.Control.Feedback type="invalid">
                        Please provide a valid questions.
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    {/* answers */}
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label>Answer *</Form.Label>
                      <CustomSelect
                        params={{
                          url: URLConstants.ANSWERS_URL,
                        }}
                        onChange={(value) => {
                          setAnswerId(value);
                        }}
                        entity={auditReportAnswer.answer}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    {/* answer Value */}
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label>Answer Value</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="question"
                        onChange={onAnswerValueChangeHandler}
                        value={answerValue}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    {' '}
                    {/* Comment */}
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label>Comments</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="comment"
                        onChange={onCommentsChangeHandler}
                        value={comments}
                      />
                    </Form.Group>
                  </Col>
                </Row>

                {/* {renderSelect()} */}

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

export default EditAuditReportAnswer;
