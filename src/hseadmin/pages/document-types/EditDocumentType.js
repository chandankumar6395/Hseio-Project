import React, { useEffect, useState } from 'react';
import { Link, NavLink, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Col, Form, Row } from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';
import { Button, Grid, Typography } from '@mui/material';
import URLConstants from '../../constants/URLConstants';
import { fetchGET, fetchPUT } from '../../utils/NetworkUtils';
import { CustomBreadcrumbs, CustomDivider } from '../../utils/MUIStyle';

const EditDocumentType = () => {
  const [validated, setValidated] = useState(false);

  const history = useNavigate();

  const [name, setName] = useState('');
  const [shortDesc, setShortDesc] = useState('');
  const [longDesc, setLongDesc] = useState('');

  const [documentType, setDocumentType] = useState(null);

  const { id } = useParams();
  const params = useParams();
  useEffect(() => {
    if (documentType != null) {
      setName(documentType.name);
      setShortDesc(documentType.short_desc);
      setLongDesc(documentType.long_desc);
    }
  }, [documentType]);

  useEffect(() => {
    console.log(`param is ${params.id}`);
    loadDocumentTypes();
  }, []);

  const loadDocumentTypes = async () => {
    try {
      const url = `${URLConstants.GET_DOCUMENT_TYPE_URL}/${id}.json`;

      console.log('getDocumentTypes url =', url);

      const response = await fetchGET(url);

      console.log('getDocumentTypes -->', response.data);

      setDocumentType(response.data);
    } catch (error) {
      toast(error.message || 'Failed');
    }
  };

  const onDocumentTypeSubmit = (event) => {
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
      short_desc: shortDesc,
      long_desc: longDesc,
    };
    postDocumentType(postData);
  };
  const postDocumentType = async (data) => {
    try {
      const url = `${URLConstants.GET_DOCUMENT_TYPE_URL}/${id}.json`;

      await fetchPUT(url, data);

      history('../../private/document-types');
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
  return (
    <>
      <Helmet title="Edit Document Type" />

      <Grid justifyContent="space-between" container spacing={10}>
        <Grid item>
          <Typography variant="h3" gutterBottom display="inline">
            Document Type
          </Typography>

          <CustomBreadcrumbs aria-label="Breadcrumb" mt={2}>
            <Link component={NavLink} to="/">
              Dashboard
            </Link>
            <Link component={NavLink} to="/private/document-types">
              Document
            </Link>
            <Typography>Edit Document Type</Typography>
          </CustomBreadcrumbs>
        </Grid>
        <Grid item>
          <div>
            <NavLink to="/private/document-types">
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
          {documentType && (
            <Form
              noValidate
              validated={validated}
              onSubmit={onDocumentTypeSubmit}
            >
              {/* Name Field */}
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      required
                      as="textarea"
                      rows={2}
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
                    <Form.Label>Short Desc</Form.Label>
                    <Form.Control
                      type="text"
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
                      type="text"
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
export default EditDocumentType;
