import { Col, Form, Row } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import { Link, NavLink, useNavigate, useParams } from 'react-router-dom';

import { toast } from 'react-toastify';
import { Helmet } from 'react-helmet-async';
import { Button, Grid, Typography } from '@mui/material';
import URLConstants from '../../constants/URLConstants';
import { fetchGET, fetchPUT } from '../../utils/NetworkUtils';
import CustomMultiSelect from '../../components/widgets/CustomMultiSelect';
import { CustomBreadcrumbs, CustomDivider } from '../../utils/MUIStyle';

const EditAuditTaskCategoriesMUI = () => {
  const [validated, setValidated] = useState(false);

  const history = useNavigate();

  const [name, setName] = useState('');
  const [auditTaskCategory, setAuditTaskCategory] = useState(null);
  const params = useParams();
  const { id } = useParams();

  const [auditTasks, setAuditTasks] = useState([]);
  const [auditTasksOptions, setAuditTasksOptions] = useState([]);

  useEffect(() => {}, []);

  useEffect(() => {
    if (auditTaskCategory != null) {
      setName(auditTaskCategory.name);
      setAuditTasks(auditTaskCategory.audit_tasks);

      const localOptions = [];

      auditTaskCategory.audit_tasks.forEach((item) => {
        localOptions.push({
          id: item.id,
        });
      });

      setAuditTasksOptions(localOptions);
      console.log('localOptions ', localOptions);
    }
  }, [auditTaskCategory]);

  useEffect(() => {
    console.log(`param is ${params.id}`);
    loadAuditTaskCategory();
  }, []);

  const loadAuditTaskCategory = async () => {
    // await dispatch(getAuditTaskCategories(id));
    try {
      const url = `${URLConstants.GET_AUDIT_TASK_CATEGORY_URL}/${id}.json`;
      const response = await fetchGET(url);
      setAuditTaskCategory(response.data);
    } catch (error) {
      toast(error.message || 'Failed');
    }
  };

  const onAuditTaskCategoriesSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
    event.preventDefault();
    console.log('onAuditTaskCategoriesSubmit', auditTasks);
    if (name === '') {
      toast('Please Enter audit task categories Name');
    } else {
      const postData = {
        name,
        audit_tasks: auditTasksOptions,
      };
      postAuditTaskCategories(postData);
    }
  };

  const postAuditTaskCategories = async (data) => {
    try {
      const url = `${URLConstants.GET_AUDIT_TASK_CATEGORY_URL}/${id}.json`;

      await fetchPUT(url, data);

      history('../../private/audit-task-categories');
    } catch (error) {
      toast(error.message || 'Failed');
    }
  };
  const onNameChangeHandler = (event) => {
    // console.log(event.target.value);
    setName(event.target.value);
  };

  return (
    <>
      <Helmet title="Edit Audit Task Category" />

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
            <Typography>Edit Audit Task Category</Typography>
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
                    value={name}
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
                      setAuditTasksOptions(value);
                    }}
                    entities={auditTasks}
                  />

                  <Form.Control.Feedback type="invalid">
                    Please provide a valid Audit Task.
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>

            {/* {renderSelect()} */}

            <Button variant="contained" type="submit" color="primary">
              Submit
            </Button>
          </Form>
        </Grid>
      </Grid>
    </>
  );
};

export default EditAuditTaskCategoriesMUI;
