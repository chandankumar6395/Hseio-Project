/* eslint-disable camelcase */
import { Col, Form, Row } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';

import { Link, NavLink, useNavigate, useParams } from 'react-router-dom';

import { toast } from 'react-toastify';
import { Helmet } from 'react-helmet-async';
import { Grid, Typography, Button } from '@mui/material';
// import {
//   getTrainingCourseType,
//   updateTrainingCourseType,
// } from '../../store/actions/training_courses_type';
import { CustomBreadcrumbs, CustomDivider } from '../../utils/MUIStyle';
import URLConstants from '../../constants/URLConstants';
import { fetchGET, fetchPUT } from '../../utils/NetworkUtils';

const EditTrainingCourseType = () => {
  const [validated, setValidated] = useState(false);

  const history = useNavigate();

  const [name, setName] = useState('');
  const [shortDesc, setShortDesc] = useState('');
  const [longDesc, setLongDesc] = useState('');

  const [trainingCourseType, setTrainingCourseType] = useState(null);

  // const dispatch = useDispatch();
  // const training_course_type = useSelector(
  //   (state) => state.trainingCourseType.training_course_type
  // );

  const params = useParams();
  const { id } = useParams();

  useEffect(() => {
    if (trainingCourseType != null) {
      setName(trainingCourseType.name);
      setShortDesc(trainingCourseType.short_desc);
      setLongDesc(trainingCourseType.long_desc);
    }
  }, [trainingCourseType]);

  useEffect(() => {
    console.log(`param is ${params.id}`);
    loadTrainingCourseType();
  }, []);

  const loadTrainingCourseType = async () => {
    // await dispatch(getTrainingCourseType(id));
    try {
      const url = `${URLConstants.GET_TRAINING_COURSE_TYPE_URL}/${id}.json`;

      console.log('getTrainingCourseType url =', url);

      const response = await fetchGET(url);

      console.log('EditTrainingCourseType -->', response.data);

      setTrainingCourseType(response.data);
    } catch (error) {
      toast(error.message || 'Failed');
    }
  };

  const onTrainingCourseTypeSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
    event.preventDefault();
    if (name === '') {
      toast('Please enter Name');
    } else {
      const postData = {
        id,
        name,
        short_desc: shortDesc,
        long_desc: longDesc,
      };
      postTrainingCourseType(postData);
    }
  };

  const postTrainingCourseType = async (data) => {
    // await dispatch(updateTrainingCourseType(data));
    // history('/private/training-course-types');
    try {
      const url = `${URLConstants.GET_TRAINING_COURSE_TYPE_URL}/${id}.json`;

      await fetchPUT(url, data);

      history('../../private/training-course-types');
    } catch (error) {
      toast(error.message || 'Failed');
    }
  };

  const onNameChangeHandler = (event) => {
    console.log(event.target.value);
    setName(event.target.value);
  };
  const onShortDescChangeHandler = (event) => {
    console.log(event.target.value);
    setShortDesc(event.target.value);
  };
  const onLongDescChangeHandler = (event) => {
    console.log(event.target.value);
    setLongDesc(event.target.value);
  };

  const maxLongDescCheck = (object) => {
    if (object.target.value.length > object.target.maxLength) {
      object.target.value = object.target.value.slice(
        0,
        object.target.maxLength
      );
    }
  };

  const maxShortDescCheck = (object) => {
    if (object.target.value.length > object.target.maxLength) {
      object.target.value = object.target.value.slice(
        0,
        object.target.maxLength
      );
    }
  };

  return (
    <>
      <Helmet title="Edit Training Material Type" />

      <Grid justifyContent="space-between" container spacing={10}>
        <Grid item>
          <Typography variant="h3" gutterBottom display="inline">
            Training Material Types
          </Typography>

          <CustomBreadcrumbs aria-label="Breadcrumb" mt={2}>
            <Link component={NavLink} to="/">
              Dashboard
            </Link>
            <Link component={NavLink} to="/private/training-course-types">
              Training Material Types
            </Link>
            <Typography>Edit Training Material Type</Typography>
          </CustomBreadcrumbs>
        </Grid>
        <Grid item>
          <div>
            <NavLink to="/private/training-course-types">
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
          <Form
            noValidate
            validated={validated}
            onSubmit={onTrainingCourseTypeSubmit}
          >
            {/* Name Field */}
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Name *</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    placeholder="Name *"
                    onChange={onNameChangeHandler}
                    value={name}
                  />
                  <Form.Control.Feedback type="invalid">
                    Please provide a valid name.
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>

              {/* Short Desc Field */}
              <Col md={6}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Short Desc</Form.Label>
                  <Form.Control
                    type="text"
                    maxLength="255"
                    onInput={maxShortDescCheck}
                    placeholder="Short Desc"
                    onChange={onShortDescChangeHandler}
                    value={shortDesc}
                  />
                </Form.Group>
              </Col>

              {/* Long Desc Field */}
              <Col md={6}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Long Desc</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={2}
                    maxLength="500"
                    onInput={maxLongDescCheck}
                    placeholder="Long Desc"
                    onChange={onLongDescChangeHandler}
                    value={longDesc}
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

export default EditTrainingCourseType;
