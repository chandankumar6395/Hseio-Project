import React, { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Button, Grid, Typography } from '@mui/material';
import { Col, Form, Row } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { CustomBreadcrumbs, CustomDivider } from '../../utils/MUIStyle';
import { fetchPOST } from '../../utils/NetworkUtils';
import URLConstants from '../../constants/URLConstants';

const NewEquipmentTypeMUI = () => {
  const [validated, setValidated] = useState(false);
  const history = useNavigate();

  const [name, setName] = useState('');
  const [shortDesc, setShortDesc] = useState('');
  const [longDesc, setLongDesc] = useState('');

  useEffect(() => {}, []);

  const onEquipmentTypeSubmit = (event) => {
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
      postEquipmentType(postData);
    }
  };

  const postEquipmentType = async (data) => {
    try {
      await fetchPOST(URLConstants.EQUIPMENT_TYPES_URL, data);
      history('../../private/equipment-types');
    } catch (error) {
      console.log(error);
    }
  };

  const onNameChangeHandler = (event) => {
    // console.log(event.target.value);
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
      <Helmet title="Add Equipment Type" />

      <Grid justifyContent="space-between" container spacing={10}>
        <Grid item>
          <Typography variant="h3" gutterBottom display="inline">
            Equipment Type
          </Typography>

          <CustomBreadcrumbs aria-label="Breadcrumb" mt={2}>
            <Link component={NavLink} to="/">
              Dashboard
            </Link>
            <Link component={NavLink} to="/private/equipment-types">
              Equipment
            </Link>
            <Typography>Add Equipment Type</Typography>
          </CustomBreadcrumbs>
        </Grid>
        <Grid item>
          <div>
            <NavLink to="/private/equipment-types">
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
            onSubmit={onEquipmentTypeSubmit}
          >
            <Row>
              <Col md={6}>
                {/* Name Field */}
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Name *</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    placeholder="Name *"
                    onChange={onNameChangeHandler}
                  />
                  <Form.Control.Feedback type="invalid">
                    Please provide a valid Name.
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col md={6}>
                {/* Short Desc Field */}
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
              <Col md={6}>
                {/* Long Desc Field */}
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
export default NewEquipmentTypeMUI;
