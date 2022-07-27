import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Button, Grid, Typography } from '@mui/material';
import { Col, Form, Row } from 'react-bootstrap';
import { CustomBreadcrumbs, CustomDivider } from '../../utils/MUIStyle';
import { fetchPOST } from '../../utils/NetworkUtils';
import URLConstants from '../../constants/URLConstants';

const NewLogos = () => {
  const [validated, setValidated] = useState(false);
  const history = useNavigate();

  const [name, setName] = useState('');
  const [fileName, setFiletName] = useState('');
  const [mimeType, setMimeType] = useState('');
  const [extension, setExtension] = useState('');
  const [size, setSize] = useState('');
  const [path, setPath] = useState('');
  const [url, setUrl] = useState('');

  const onLogoSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);
    event.preventDefault();

    const postData = {
      name,
      file_name: fileName,
      mime_type: mimeType,
      extension,
      size,
      path,
      url,
    };
    postLogo(postData);
  };

  const postLogo = async (data) => {
    try {
      await fetchPOST(URLConstants.LOGOS_URL, data);
      history('../../private/logos');
    } catch (error) {
      console.log(error);
    }
  };

  const onNameChangeHandler = (event) => {
    // console.log(event.target.value);
    setName(event.target.value);
  };
  const onFileNameChangeHandler = (event) => {
    // console.log(event.target.value);
    setFiletName(event.target.value);
  };
  const onMimeTypeChangeHandler = (event) => {
    // console.log(event.target.value);
    setMimeType(event.target.value);
  };
  const onExtensionChangeHandler = (event) => {
    // console.log(event.target.value);
    setExtension(event.target.value);
  };
  const onSizeChangeHandler = (event) => {
    // console.log(event.target.value);
    setSize(event.target.value);
  };
  const onPathChangeHandler = (event) => {
    // console.log(event.target.value);
    setPath(event.target.value);
  };
  const onUrlChangeHandler = (event) => {
    // console.log(event.target.value);
    setUrl(event.target.value);
  };
  return (
    <>
      <Helmet title="Add Logos Type" />

      <Grid justifyContent="space-between" container spacing={10}>
        <Grid item>
          <Typography variant="h3" gutterBottom display="inline">
            Logos
          </Typography>

          <CustomBreadcrumbs aria-label="Breadcrumb" mt={2}>
            <Link component={NavLink} to="/">
              Dashboard
            </Link>
            <Link component={NavLink} to="/private/logos">
              Document
            </Link>
            <Typography>Add Logos</Typography>
          </CustomBreadcrumbs>
        </Grid>
        <Grid item>
          <div>
            <NavLink to="/private/logos">
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
          <Form noValidate validated={validated} onSubmit={onLogoSubmit}>
            <Row>
              <Col md={6}>
                {/* Name Field */}
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    placeholder="Name"
                    onChange={onNameChangeHandler}
                  />
                  <Form.Control.Feedback type="invalid">
                    Please provide a valid Name.
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col md={6}>
                {/* File Name */}
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>File Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="File Name"
                    onChange={onFileNameChangeHandler}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                {/* Mime Type */}
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Mime Type</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Mime Type"
                    onChange={onMimeTypeChangeHandler}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                {/* extension */}
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Extension</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Extension"
                    onChange={onExtensionChangeHandler}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                {/* Size */}
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Size</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Size"
                    onChange={onSizeChangeHandler}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                {/* Path */}
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Path</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Path"
                    onChange={onPathChangeHandler}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                {/* URL */}
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>URL</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={2}
                    placeholder="URL"
                    onChange={onUrlChangeHandler}
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
export default NewLogos;
