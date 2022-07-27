import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Col, Form, Row } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { Button, Grid } from '@mui/material';
import { addCertificates } from '../../store/actions/certificates';
import URLConstants from '../../constants/URLConstants';
import { uploadFile } from '../../utils/NetworkUtils';
import { toServerDate } from '../../utils/Utils';

const NewCertificate = (props) => {
  const { employeeId, closeModal } = props;

  console.log('NewCertificate employeeId', employeeId);
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [uploadDocId, setUploadDocId] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [validated, setValidated] = useState(false);

  useEffect(() => {
    console.log(setUploadDocId, uploadDocId);
  }, []);

  const onCertificateSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else if (document === null) {
      toast('Please select Certificate Document' || 'Failed');
    } else {
      const postData = {
        name,
        // start_date: startDate,
        start_date: startDate !== '' ? toServerDate(startDate) : null,
        // end_date: endDate,
        end_date: endDate !== '' ? toServerDate(endDate) : null,
        document_id: uploadDocId,
        employee_id: employeeId,
        company_id: props.companyId,
      };
      postCertificate(postData).then(() => {});
    }

    setValidated(true);
    event.preventDefault();
  };

  const postCertificate = async (data) => {
    try {
      await dispatch(addCertificates(data));
      closeModal();
    } catch (error) {
      toast(error.message || 'Failed');
    }
  };

  const onNameChangeHandler = (event) => {
    // console.log(event.target.value);
    setName(event.target.value);
  };

  const onIssueDateChangeHandler = (event) => {
    // console.log(event.target.value);
    setStartDate(event.target.value);
  };

  const onExpirationDateChangeHandler = (event) => {
    // console.log(event.target.value);
    setEndDate(event.target.value);
  };

  const onDocumentFileChange = (event) => {
    onDocumentFileUpload(event.target.files[0]);
  };

  // On file upload (click the upload button)
  const onDocumentFileUpload = async (value) => {
    // Create an object of formData
    const formData = new FormData();

    // Update the formData object
    formData.append('document', value, value.name);
    const response = await uploadFile(
      `${URLConstants.DOCUMENTS_URL}/upload.json`,
      formData
    );
    console.log('12345', response);
    if (response.success === true) {
      // setName(response.data.name.replace(/\.[^/.]+$/, ''));
      setUploadDocId(response.data.id);
    } else {
      toast.error('Unable to upload file.' || 'Failed');
    }
  };

  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Form noValidate validated={validated} onSubmit={onCertificateSubmit}>
            <Row>
              {/* Employee Certificate Document */}
              <Col md={12}>
                <Form.Group controlId="formFile" className="mb-3">
                  <Form.Label>Employee Certificate Document *</Form.Label>
                  <Form.Control
                    required
                    type="file"
                    accept="application/pdf"
                    onChange={onDocumentFileChange}
                  />
                  <Form.Control.Feedback type="invalid">
                    Please provide a valid Document.
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col md={6}>
                {/* Name Field */}
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Certificate Name *</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    placeholder="Certificate Name *"
                    onChange={onNameChangeHandler}
                    value={name}
                  />
                  <Form.Control.Feedback type="invalid">
                    Please provide a valid name.
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col md={6}>
                {/* Issue Date */}
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Issue Date</Form.Label>
                  <Form.Control
                    type="Date"
                    placeholder="Start Date"
                    onChange={onIssueDateChangeHandler}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                {/* Expiration Date */}
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Expiration Date</Form.Label>
                  <Form.Control
                    type="Date"
                    placeholder="End Date"
                    onChange={onExpirationDateChangeHandler}
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

export default NewCertificate;
