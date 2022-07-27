import { Col, Form, Row } from 'react-bootstrap';
import React, { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Button, Grid, Typography } from '@mui/material';
import { toast } from 'react-toastify';
import { fetchPOST } from '../../utils/NetworkUtils';
import URLConstants from '../../constants/URLConstants';
import CustomMultiSelect from '../../components/widgets/CustomMultiSelect';
import { CustomBreadcrumbs, CustomDivider } from '../../utils/MUIStyle';

const NewAuditTaskCategoriesMUI = () => {
  const [validated, setValidated] = useState(false);

  const history = useNavigate();

  const [name, setName] = useState('');

  const [auditTasks, setAuditTasks] = useState([]);

  useEffect(() => {}, []);

  const onAuditTaskCategoriesSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
    event.preventDefault();
    if (name === '') {
      toast('Please Enter audit task categories Name');
    } else {
      const postData = {
        name,
        audit_tasks: auditTasks,
      };
      postAuditTaskCategories(postData);
    }
    setValidated(true);
  };

  const postAuditTaskCategories = async (data) => {
    console.log('Submit data===========>', data);
    try {
      await fetchPOST(URLConstants.AUDIT_TASK_CATEGORIES_URL, data);
      history('../../private/audit-task-categories');
    } catch (error) {
      console.log(error);
    }
  };

  const onNameChangeHandler = (event) => {
    setName(event.target.value);
  };

  return (
    <>
      <Helmet title="Add Audit Task Category" />

      <Grid justifyContent="space-between" container spacing={10}>
        <Grid item>
          <Typography variant="h3" gutterBottom display="inline">
            Audit Task Categories
          </Typography>

          <CustomBreadcrumbs aria-label="Breadcrumb" mt={2}>
            <Link component={NavLink} to="/">
              Dashboard
            </Link>
            <Link component={NavLink} to="/private/audit-task-categories">
              Audit Task Categories
            </Link>
            <Typography>Add Audit Task Category</Typography>
          </CustomBreadcrumbs>
        </Grid>
        <Grid item>
          <div>
            <NavLink to="/private/audit-task-categories">
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
            onSubmit={onAuditTaskCategoriesSubmit}
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
              <Col md={6}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Audit Task</Form.Label>
                  <CustomMultiSelect
                    params={{ url: URLConstants.AUDIT_TASKS_URL }}
                    onChange={(value) => {
                      setAuditTasks(value);
                    }}
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

export default NewAuditTaskCategoriesMUI;
