import { Button, Card, Col, Form, Row } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import URLConstants from '../../constants/URLConstants';
import { fetchGET, fetchPUT } from '../../utils/NetworkUtils';
import CustomSelect from '../../components/widgets/CustomSelect';

const EditAnswer = () => {
  const [validated, setValidated] = useState(false);

  const history = useNavigate();

  const [name, setName] = useState('');
  const [questionId, setQuestionId] = useState(-1);
  const [label, setLabel] = useState('');
  const [value, setValue] = useState('');
  const [correctValue, setCorrectValue] = useState('');

  const params = useParams();
  const { id } = useParams();

  const [answer, setAnswer] = useState(null);

  useEffect(() => {
    if (answer != null) {
      setName(answer.name);
      setQuestionId(answer.question_id);
      setLabel(answer.label);
      setValue(answer.value);
      setCorrectValue(answer.correct_value);
    }
  }, [answer]);

  useEffect(() => {
    console.log(`param is ${params.id}`);
    loadAnswer();
  }, []);

  const loadAnswer = async () => {
    try {
      const url = `${URLConstants.GET_ANSWER_URL}/${id}.json`;
      const response = await fetchGET(url);
      setAnswer(response.data);
    } catch (error) {
      toast(error.message || 'Failed');
    }
  };

  const onAnswerSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
    event.preventDefault();
    const postData = {
      name,
      question_id: questionId,
      label,
      value,
      correct_value: correctValue,
    };
    postAnswer(postData);
  };

  const postAnswer = async (data) => {
    try {
      const url = `${URLConstants.GET_ANSWER_URL}/${id}.json`;

      await fetchPUT(url, data);

      history('../../private/answers');
    } catch (error) {
      toast(error.message || 'Failed');
    }
  };

  const onNameChangeHandler = (event) => {
    console.log(event.target.value);
    setName(event.target.value);
  };

  const onLabelChangeHandler = (event) => {
    console.log(event.target.value);
    setLabel(event.target.value);
  };

  const onValueChangeHandler = (event) => {
    console.log(event.target.value);
    setValue(event.target.value);
  };

  const onCorrectValueChangeHandler = (event) => {
    console.log(event.target.value);
    setCorrectValue(event.target.value);
  };

  return (
    <Row>
      <Col>
        <Card>
          <Card.Header>
            Add Answer
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
          {answer != null && (
            <Card.Body>
              <Form noValidate validated={validated} onSubmit={onAnswerSubmit}>
                <Row>
                  {/* Name Field */}
                  <Col md={6}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label>Name</Form.Label>
                      <Form.Control
                        required
                        type="text"
                        placeholder="Name"
                        onChange={onNameChangeHandler}
                        value={name}
                      />
                      <Form.Control.Feedback type="invalid">
                        Please provide a valid name.
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>

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
                        entity={answer.question}
                      />
                    </Form.Group>
                  </Col>

                  {/* Short Desc */}
                  <Col md={6}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label>Label</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Label"
                        onChange={onLabelChangeHandler}
                        value={label}
                      />
                    </Form.Group>
                  </Col>

                  {/* Value */}
                  <Col md={6}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label>Value</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Value"
                        onChange={onValueChangeHandler}
                        value={value}
                      />
                    </Form.Group>
                  </Col>

                  <Col md={6}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label>Correct Value</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Correct Value"
                        onChange={onCorrectValueChangeHandler}
                        value={correctValue}
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

export default EditAnswer;
