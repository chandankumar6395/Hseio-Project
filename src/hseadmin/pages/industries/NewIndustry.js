import { Col, Form, Row } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import Select from 'react-select';
import { Helmet } from 'react-helmet-async';
import { Grid, Typography, Button } from '@mui/material';
import { toast } from 'react-toastify';
import { addIndustries, loadIndustries } from '../../store/actions/industries';
import { CustomBreadcrumbs, CustomDivider } from '../../utils/MUIStyle';

const NewIndustry = () => {
  const [validated, setValidated] = useState(false);

  const history = useNavigate();

  const [name, setName] = useState('');
  const [parentId, setParentId] = useState(-1);

  const dispatch = useDispatch();
  const industries = useSelector((state) => state.industry.industries);

  useEffect(() => {
    fetchIndustries();
  }, []);

  const fetchIndustries = async () => {
    await dispatch(loadIndustries());
  };

  const onIndustrySubmit = (event) => {
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
        parent_id: parentId === -1 ? null : parentId,
      };
      postIndustry(postData);
    }
  };

  const postIndustry = async (data) => {
    await dispatch(addIndustries(data));
    history('../../private/industries');
  };

  const onNameChangeHandler = (event) => {
    setName(event.target.value);
  };
  const onParentChangeHandler = (selectedOption) => {
    setParentId(+selectedOption.value);
  };

  return (
    <>
      <Helmet title="Add Industry" />

      <Grid justifyContent="space-between" container spacing={10}>
        <Grid item>
          <Typography variant="h3" gutterBottom display="inline">
            Industries
          </Typography>

          <CustomBreadcrumbs aria-label="Breadcrumb" mt={2}>
            <Link component={NavLink} to="/">
              Dashboard
            </Link>
            <Link component={NavLink} to="/private/industries">
              Industries
            </Link>
            <Typography>Add Industry</Typography>
          </CustomBreadcrumbs>
        </Grid>
        <Grid item>
          <div>
            <NavLink to="/private/industries">
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
          <Form noValidate validated={validated} onSubmit={onIndustrySubmit}>
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
              <Col md={6}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Parent Industry</Form.Label>
                  <Select
                    options={industries.map((industry) => {
                      return { value: industry.id, label: industry.name };
                    })}
                    onChange={onParentChangeHandler}
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

export default NewIndustry;
