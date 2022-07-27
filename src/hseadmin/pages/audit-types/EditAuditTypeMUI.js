// import { Col, Form, Row } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';

import { Link, NavLink, useNavigate, useParams } from 'react-router-dom';
import {
  Button as MuiButton,
  Card as MuiCard,
  CardContent,
  Grid,
  TextField as MuiTextField,
  Typography,
  Paper as MuiPaper,
} from '@mui/material';
import { spacing } from '@mui/system';
import styled from '@emotion/styled';
import { toast } from 'react-toastify';
import { Helmet } from 'react-helmet-async';
// import { Button, Grid, Typography } from '@mui/material';
import URLConstants from '../../constants/URLConstants';
import { fetchGET, fetchPUT } from '../../utils/NetworkUtils';
import { CustomBreadcrumbs, CustomDivider } from '../../utils/MUIStyle';

const Card = styled(MuiCard)(spacing);

const TextField = styled(MuiTextField)(spacing);

const Button = styled(MuiButton)(spacing);

const Paper = styled(MuiPaper)(spacing);

const EditAuditTypeMUI = () => {
  const [validated, setValidated] = useState(false);

  const history = useNavigate();

  const [name, setName] = useState('');
  const [shortDesc, setShortDesc] = useState('');
  const [longDesc, setLongDesc] = useState('');

  // eslint-disable-next-line camelcase
  const [auditType, setAuditType] = useState(null);

  const params = useParams();
  const { id } = useParams();

  useEffect(() => {
    // eslint-disable-next-line camelcase
    if (auditType != null) {
      setName(auditType.name);
      setShortDesc(auditType.short_desc !== null ? auditType.short_desc : '');
      setLongDesc(auditType.long_desc !== null ? auditType.long_desc : '');
    }
    // eslint-disable-next-line camelcase
  }, [auditType]);

  useEffect(() => {
    console.log(`param is ${params.id}`);
    loadAuditType();
  }, []);

  const loadAuditType = async () => {
    // await dispatch(getAuditType(id));

    try {
      const url = `${URLConstants.GET_AUDIT_TYPE_URL}/${id}.json`;
      const response = await fetchGET(url);
      setAuditType(response.data);
    } catch (error) {
      toast(error.message || 'Failed');
    }
  };

  const onAuditTypeSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
    event.preventDefault();
    const postData = {
      id,
      name,
      short_desc: shortDesc,
      long_desc: longDesc,
    };
    postAuditType(postData);
  };

  const postAuditType = async (data) => {
    try {
      const url = `${URLConstants.GET_AUDIT_TYPE_URL}/${id}.json`;

      await fetchPUT(url, data);

      history('../../private/audit-types');
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

  return (
    <>
      <Helmet title="Edit Audit Type" />

      <Grid justifyContent="space-between" container spacing={10}>
        <Grid item>
          <Typography variant="h3" gutterBottom display="inline">
            Audit Types
          </Typography>

          <CustomBreadcrumbs aria-label="Breadcrumb" mt={2}>
            <Link component={NavLink} to="/">
              Dashboard
            </Link>
            <Link component={NavLink} to="/private/audit-types">
              Audit Types
            </Link>
            <Typography>Edit Audit Type</Typography>
          </CustomBreadcrumbs>
        </Grid>
        <Grid item>
          <div>
            <NavLink to="/private/audit-types">
              <Button variant="contained" color="primary">
                Back
              </Button>
            </NavLink>
          </div>
        </Grid>
      </Grid>

      <CustomDivider my={6} />
      {/* <Grid container spacing={6}> */}
      {/*  <Grid item xs={12}> */}
      {/*    <Form noValidate validated={validated} onSubmit={onAuditTypeSubmit}> */}
      {/*      /!* Name Field *!/ */}
      {/*      <Row> */}
      {/*        <Col md={6}> */}
      {/*          <Form.Group className="mb-3" controlId="formBasicEmail"> */}
      {/*            <Form.Label>Name</Form.Label> */}
      {/*            <Form.Control */}
      {/*              required */}
      {/*              type="text" */}
      {/*              placeholder="Name" */}
      {/*              onChange={onNameChangeHandler} */}
      {/*              value={name} */}
      {/*            /> */}
      {/*            <Form.Control.Feedback type="invalid"> */}
      {/*              Please provide a valid name. */}
      {/*            </Form.Control.Feedback> */}
      {/*          </Form.Group> */}
      {/*        </Col> */}

      {/*        /!* Short Desc *!/ */}
      {/*        <Col md={6}> */}
      {/*          <Form.Group className="mb-3" controlId="formBasicEmail"> */}
      {/*            <Form.Label>Short Desc</Form.Label> */}
      {/*            <Form.Control */}
      {/*              type="text" */}
      {/*              placeholder="Short Desc" */}
      {/*              onChange={onShortDescChangeHandler} */}
      {/*              value={shortDesc} */}
      {/*            /> */}
      {/*          </Form.Group> */}
      {/*        </Col> */}

      {/*        /!* Description *!/ */}
      {/*        <Col md={6}> */}
      {/*          <Form.Group className="mb-3" controlId="formBasicEmail"> */}
      {/*            <Form.Label>Description</Form.Label> */}
      {/*            <Form.Control */}
      {/*              as="textarea" */}
      {/*              rows={2} */}
      {/*              placeholder="Description" */}
      {/*              onChange={onLongDescChangeHandler} */}
      {/*              value={longDesc} */}
      {/*            /> */}
      {/*          </Form.Group> */}
      {/*        </Col> */}
      {/*      </Row> */}
      {/*      <Button variant="contained" type="submit" color="primary"> */}
      {/*        Submit */}
      {/*      </Button> */}
      {/*    </Form> */}
      {/*  </Grid> */}
      {/* </Grid> */}
      <Card mb={6}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Basic info
          </Typography>

          <Paper mt={3}>
            <form noValidate validated={validated} onSubmit={onAuditTypeSubmit}>
              <Grid container spacing={6}>
                <Grid item md={6}>
                  <TextField
                    required
                    id="Name"
                    label="Name"
                    variant="outlined"
                    size="small"
                    // defaultValue="Lucy"
                    fullWidth
                    my={2}
                    onChange={onNameChangeHandler}
                    value={name}
                  />
                </Grid>
                <Grid item md={6}>
                  <TextField
                    id="Short desc"
                    label="Short desc"
                    variant="outlined"
                    size="small"
                    // defaultValue="Lavender"
                    fullWidth
                    my={2}
                    onChange={onShortDescChangeHandler}
                    value={shortDesc}
                  />
                </Grid>

                <Grid item md={6}>
                  <TextField
                    id="Description"
                    label="Description"
                    multiline
                    rows={2}
                    variant="outlined"
                    size="small"
                    // defaultValue="Lavender"
                    fullWidth
                    my={2}
                    onChange={onLongDescChangeHandler}
                    value={longDesc}
                  />
                </Grid>
              </Grid>

              <Button variant="contained" type="submit" color="primary" mt={3}>
                Submit
              </Button>
            </form>
          </Paper>
        </CardContent>
      </Card>
    </>
  );
};

export default EditAuditTypeMUI;
