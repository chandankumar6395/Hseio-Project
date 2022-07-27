import React, { useEffect, useState } from 'react';
import { Link, NavLink, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Col, Form, Row } from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';
import { Button, Grid, Typography } from '@mui/material';
import URLConstants from '../../constants/URLConstants';
import { fetchGET, fetchPUT } from '../../utils/NetworkUtils';
import { CustomBreadcrumbs, CustomDivider } from '../../utils/MUIStyle';

const EditLogo = () => {
  const [validated, setValidated] = useState(false);

  const history = useNavigate();

  const [name, setName] = useState('');
  const [fileName, setFiletName] = useState('');
  const [mimeType, setMimeType] = useState('');
  const [extension, setExtension] = useState('');
  const [size, setSize] = useState('');
  const [path, setPath] = useState('');
  const [url, setUrl] = useState('');

  const [logo, setLogo] = useState(null);

  const { id } = useParams();
  const params = useParams();
  useEffect(() => {
    if (logo != null) {
      setName(logo.name);
      setFiletName(logo.file_name);
      setMimeType(logo.mime_type);
      setExtension(logo.extension);
      setSize(logo.size);
      setPath(logo.path);
      setUrl(logo.url);
    }
  }, [logo]);

  useEffect(() => {
    // console.log(`param is ${params.id}`);
    loadLogos();
  }, []);

  const loadLogos = async () => {
    try {
      const url = `${URLConstants.GET_LOGOS_URL}/${id}.json`;

      // console.log('getLogos url =', url);

      const response = await fetchGET(url);

      // console.log('getLogos -->', response.data);

      setLogo(response.data);
    } catch (error) {
      toast(error.message || 'Failed');
    }
  };

  const onLogoSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);
    event.preventDefault();
    // @ts-ignore
    const postData = {
      id,
      name,
      file_name: fileName,
      mime_type: mimeType,
      extension,
      size,
      path,
      url,
    };
    postLogos(postData);
  };
  const postLogos = async (data) => {
    try {
      const url = `${URLConstants.GET_LOGOS_URL}/${id}.json`;

      await fetchPUT(url, data);

      history('../../private/logos');
    } catch (error) {
      toast(error.message || 'Failed');
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
    console.log(event.target.value);
    setSize(event.target.value);
  };
  const onPathChangeHandler = (event) => {
    console.log(event.target.value);
    setPath(event.target.value);
  };
  const onUrlChangeHandler = (event) => {
    console.log(event.target.value);
    setUrl(event.target.value);
  };
  return (
    <>
      <Helmet title="Edit Logo" />

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
              Logos
            </Link>
            <Typography>Edit Logos</Typography>
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
          {logo && (
            <Form noValidate validated={validated} onSubmit={onLogoSubmit}>
              {/* Name Field */}
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      required
                      placeholder="Name"
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
                    <Form.Label>File Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Short Desc"
                      onChange={onFileNameChangeHandler}
                      value={fileName}
                    />
                  </Form.Group>
                </Col>
                {/* Mime Type */}
                <Col md={6}>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Mime Type</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Mime Type"
                      onChange={onMimeTypeChangeHandler}
                      value={mimeType}
                    />
                  </Form.Group>
                </Col>
                {/* Extension */}
                <Col md={6}>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Extension</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Extension"
                      onChange={onExtensionChangeHandler}
                      value={extension}
                    />
                  </Form.Group>
                </Col>
                {/* Size */}
                <Col md={6}>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Size</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Size"
                      onChange={onSizeChangeHandler}
                      value={size}
                    />
                  </Form.Group>
                </Col>
                {/* Path */}
                <Col md={6}>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Path</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Path"
                      onChange={onPathChangeHandler}
                      value={path}
                    />
                  </Form.Group>
                </Col>
                {/* URL */}
                <Col md={6}>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>URL</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={2}
                      placeholder="URL"
                      onChange={onUrlChangeHandler}
                      value={url}
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
export default EditLogo;
