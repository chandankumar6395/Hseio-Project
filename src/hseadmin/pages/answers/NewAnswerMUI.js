import { Col, Form, Row } from 'react-bootstrap';
import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Helmet } from 'react-helmet-async';
import { Button, Grid, Typography } from '@mui/material';
import URLConstants from '../../constants/URLConstants';
import { fetchPOST } from '../../utils/NetworkUtils';
import CustomSelect from '../../components/widgets/CustomSelect';
import { CustomBreadcrumbs, CustomDivider } from '../../utils/MUIStyle';

const NewAnswerMUI = () => {
  const [validated, setValidated] = useState(false);

  const history = useNavigate();

  const [name, setName] = useState('');
  const [questionId, setQuestionId] = useState(-1);
  const [label, setLabel] = useState('');
  const [value, setValue] = useState('');
  const [correctValue, setCorrectValue] = useState('');

  const onAnswerSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
    event.preventDefault();
    if (name === '') {
      toast('Please Enter Answer name');
    } else if (questionId === -1) {
      toast('Please select question');
    } else {
      const postData = {
        name,
        question_id: questionId,
        label,
        value,
        correct_value: correctValue,
      };
      postAnswer(postData);
    }
  };

  const postAnswer = async (data) => {
    try {
      const url = URLConstants.ANSWERS_URL;
      await fetchPOST(url, data);
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
    <>
      <Helmet title="Add Answer" />

      <Grid justifyContent="space-between" container spacing={10}>
        <Grid item>
          <Typography variant="h3" gutterBottom display="inline">
            Answers
          </Typography>

          <CustomBreadcrumbs aria-label="Breadcrumb" mt={2}>
            <Link component={NavLink} to="/">
              Dashboard
            </Link>
            <Link component={NavLink} to="/private/answers">
              Answers
            </Link>
            <Typography>Add Answer</Typography>
          </CustomBreadcrumbs>
        </Grid>
        <Grid item>
          <div>
            <NavLink to="/private/answers">
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
          <Form noValidate validated={validated} onSubmit={onAnswerSubmit}>
            <Row>
              {/* Name Field */}
              <Col md={6}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Name *</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    placeholder="Name *"
                    onChange={onNameChangeHandler}
                  />
                  <Form.Control.Feedback type="invalid">
                    Please provide a valid name.
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Question *</Form.Label>
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

              {/* Short Desc */}
              <Col md={6}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Label</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Label"
                    onChange={onLabelChangeHandler}
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

export default NewAnswerMUI;
