import React, { useEffect, useState } from 'react';
import { Link, NavLink, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Col, Form, Row } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { Helmet } from 'react-helmet-async';
import { Button, Grid, Typography } from '@mui/material';
import URLConstants from '../../constants/URLConstants';
import { fetchGET, fetchPUT } from '../../utils/NetworkUtils';
import { getEquipmentType } from '../../store/actions/equipment_types';
import { CustomBreadcrumbs, CustomDivider } from '../../utils/MUIStyle';

const EditEquipment = () => {
  const [validated, setValidated] = useState(false);

  const history = useNavigate();

  const [name, setName] = useState('');
  const [shortDesc, setShortDesc] = useState('');
  const [longDesc, setLongDesc] = useState('');

  const dispatch = useDispatch();

  const [equipmentType, setEquipmentType] = useState(null);

  const { id } = useParams();
  const params = useParams();
  useEffect(() => {
    if (equipmentType != null) {
      setName(equipmentType.name);
      setShortDesc(equipmentType.short_desc);
      setLongDesc(equipmentType.long_desc);
    }
  }, [equipmentType]);

  useEffect(() => {
    console.log(`param is ${params.id}`);
    loadEquipmentTypes();
  }, []);

  const loadEquipmentTypes = async () => {
    try {
      const url = `${URLConstants.GET_EQUIPMENT_TYPE_URL}/${id}.json`;

      console.log('getEquipmentTypes url =', url);

      const response = await fetchGET(url);

      console.log('getEquipmentTypes -->', response.data);

      setEquipmentType(response.data);
    } catch (error) {
      toast(error.message || 'Failed');
    }
    await dispatch(getEquipmentType(id));
  };

  const onEquipmentTypeSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);
    event.preventDefault();
    // @ts-ignore
    if (name === '') {
      toast('Please enter Name');
    } else {
      const postData = {
        id,
        name,
        short_desc: shortDesc,
        long_desc: longDesc,
      };
      postEquipmentType(postData);
    }
  };
  const postEquipmentType = async (data) => {
    try {
      const url = `${URLConstants.GET_EQUIPMENT_TYPE_URL}/${id}.json`;

      await fetchPUT(url, data);

      history('../../private/equipment-types');
    } catch (error) {
      toast(error.message || 'Failed');
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
      <Helmet title="Edit Equipment Type" />

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
            <Typography>Edit Equipment Type</Typography>
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
          {equipmentType && (
            <Form
              noValidate
              validated={validated}
              onSubmit={onEquipmentTypeSubmit}
            >
              {/* Name Field */}
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Name *</Form.Label>
                    <Form.Control
                      required
                      as="textarea"
                      rows={2}
                      placeholder="Name *"
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
                {/* Long Desc */}
                <Col md={6}>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Long Desc</Form.Label>
                    <Form.Control
                      as="textarea"
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
          )}
        </Grid>
      </Grid>
    </>
  );
};
export default EditEquipment;
