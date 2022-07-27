import { Col, Form, Row } from 'react-bootstrap';
import React, { useState } from 'react';
// import { useDispatch } from 'react-redux';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Grid, Typography, Button } from '@mui/material';
import { toast } from 'react-toastify';
// import {
//   loadTrainingCourseTypeList,
//   addTrainingCourseType,
// } from '../../store/actions/training_courses_type';
import { CustomBreadcrumbs, CustomDivider } from '../../utils/MUIStyle';
import { fetchPOST } from '../../utils/NetworkUtils';
import URLConstants from '../../constants/URLConstants';

const NewTrainingCourseType = () => {
  const [validated, setValidated] = useState(false);
  const history = useNavigate();

  const [name, setName] = useState('');
  const [shortDesc, setShortDesc] = useState('');
  const [longDesc, setLongDesc] = useState('');

  // const dispatch = useDispatch();

  // useEffect(() => {
  //   fetchTrainingCourseTypes();
  // }, []);
  //
  // const fetchTrainingCourseTypes = async () => {
  //   await dispatch(loadTrainingCourseTypeList());
  // };

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
        name,
        short_desc: shortDesc,
        long_desc: longDesc,
      };
      postTrainingCourseType(postData);
    }
  };

  const postTrainingCourseType = async (data) => {
    // await dispatch(addTrainingCourseType(data));
    // history('/private/training-course-types');
    try {
      await fetchPOST(URLConstants.TRAINING_COURSE_TYPES_URL, data);
      history('../../private/training-course-types');
    } catch (error) {
      console.log(error);
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
      <Helmet title="Add Training Material Type" />

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
            <Typography>Add Training Material Type</Typography>
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
            <Row>
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

export default NewTrainingCourseType;
