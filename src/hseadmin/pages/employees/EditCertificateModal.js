import React, { useEffect, useState } from 'react';
// import { useDispatch } from 'react-redux';
import { Col, Form, Row } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { Button, Grid } from '@mui/material';
// import { addCertificates } from '../../store/actions/certificates';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilePdf } from '@fortawesome/free-regular-svg-icons';
import URLConstants from '../../constants/URLConstants';
import { fetchGET, fetchPUT, uploadFile } from '../../utils/NetworkUtils';
import { toLocalDate, toServerDate } from '../../utils/Utils';

const EditCertificateModal = (props) => {
  const { employeeId, certificateId, closeModal } = props;
  console.log('EditCertificate employeeId', employeeId);
  // const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [certificate, setCertificate] = useState(null);
  const [uploadDocId, setUploadDocId] = useState('');
  const [startDate, setStartDate] = useState('');
  // const [prevEmployeeId, setPrevEmployeeId] = useState('');
  const [endDate, setEndDate] = useState('');
  const [validated, setValidated] = useState(false);

  const [document, setDocument] = useState(null);

  useEffect(() => {
    console.log(setUploadDocId, uploadDocId);
    loadCertificate();
  }, []);

  useEffect(() => {
    if (certificate != null) {
      setName(certificate.name);
      setStartDate(
        certificate.start_date !== null
          ? toLocalDate(certificate.start_date)
          : ''
      );
      setEndDate(
        certificate.end_date !== null ? toLocalDate(certificate.end_date) : ''
      );
      setUploadDocId(certificate.document_id);
      setDocument(certificate.document);
      console.log(uploadDocId);
    }
  }, [certificate]);

  const loadCertificate = async () => {
    try {
      console.log('i am load certificate');
      const url = `${URLConstants.GET_CERTIFICATE_URL}/${certificateId}.json`;

      // if (certificateId !== -1 && certificateId !== undefined) {
      //   url = `${url}&certificate_id=${certificateId}`;
      // }
      const response = await fetchGET(url);
      setCertificate(response.data);
    } catch (error) {
      toast(error.message || 'Failed');
    }
  };

  const onCertificateSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      console.log('form.checkValidity()');
      event.preventDefault();
      event.stopPropagation();
    } else if (document === null) {
      console.log('document === null');
      toast('Please select Certificate Document' || 'Failed');
    } else {
      console.log('startDate', startDate, typeof startDate);
      console.log('endDate', endDate, typeof endDate);

      const postData = {
        id: certificateId,
        name,
        start_date: startDate !== '' ? toServerDate(startDate) : null,
        end_date: endDate !== '' ? toServerDate(endDate) : null,
        document_id: uploadDocId,
        employee_id: employeeId,
      };
      postCertificate(postData).then(() => {});
    }

    setValidated(true);
    event.preventDefault();
  };

  const postCertificate = async (data) => {
    try {
      const url = `${URLConstants.GET_CERTIFICATE_URL}/${certificateId}.json`;

      await fetchPUT(url, data);
      // setCertificate(response.data);
      closeModal();
      // history('../../private/answers');
    } catch (error) {
      toast(error.message || 'Failed');
    }
  };

  const onNameChangeHandler = (event) => {
    // console.log(event.target.value);
    setName(event.target.value);
  };

  const onIssueDateChangeHandler = (event) => {
    console.log(event.target.value);
    setStartDate(event.target.value);
  };

  const onExpirationDateChangeHandler = (event) => {
    console.log(event.target.value);
    setEndDate(event.target.value);
  };

  const onDocumentFileChange = (event) => {
    onDocumentFileUpload(event.target.files[0]);
  };

  const renderDocument = () => {
    if (document === null) {
      return (
        <>
          {certificate !== null && certificate.document !== null && (
            // eslint-disable-next-line jsx-a11y/img-redundant-alt
            <p>
              <a
                href={certificate.document.url}
                target="_blank"
                rel="noreferrer"
              >
                <FontAwesomeIcon icon={faFilePdf} size="3x" />{' '}
                {certificate.document.name}
              </a>
            </p>
          )}
        </>
      );
    }
    return (
      <>
        <p>
          <a href={document.url}>
            <FontAwesomeIcon icon={faFilePdf} size="3x" /> {document.name}
          </a>
        </p>
      </>
    );
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
      setDocument(response.data);
      setName(response.data.name.replace(/\.[^/.]+$/, ''));
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
            {renderDocument()}
            <Row>
              {/* Employee Certificate Document */}
              <Col md={12}>
                <Form.Group controlId="formFile" className="mb-3">
                  <Form.Label>Employee Certificate Document</Form.Label>
                  <Form.Control
                    type="file"
                    accept="application/pdf"
                    onChange={onDocumentFileChange}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                {/* Name Field */}
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Certificate Name *</Form.Label>
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
                {/* Issue Date */}
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Issue Date</Form.Label>
                  <Form.Control
                    type="Date"
                    placeholder="Start Date"
                    onChange={onIssueDateChangeHandler}
                    value={startDate}
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
                    value={endDate}
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

export default EditCertificateModal;
