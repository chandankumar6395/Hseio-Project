import { Col, Form, Row } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { Button, Grid } from '@mui/material';
import Select from 'react-select';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilePdf } from '@fortawesome/free-regular-svg-icons';
import moment from 'moment';
import { toLocalDateTime, toServerDateTime } from '../../utils/Utils';
import { fetchGET, fetchPUT, uploadFile } from '../../utils/NetworkUtils';
import URLConstants from '../../constants/URLConstants';
import { ALCOHOL_DRUG_STATUSES, YES_NO_DATA } from '../../constants/Constants';

const EditAlcoholDrugs = (props) => {
  const { employeeId, alcoholDrugId, closeModal } = props;

  console.log('NewAlcoholDrug employeeId', employeeId);

  const [name, setName] = useState('');
  const [uploadDocId, setUploadDocId] = useState('');
  const [negativeTest, setNegativeTest] = useState('');
  const [testPerformedDate, setTestPerformedDate] = useState('');
  const [alcoholDrugStatusId, setAlcoholDrugStatusId] = useState('');
  const [validated, setValidated] = useState(false);
  const [document, setDocument] = useState(null);
  const [alcoholDrug, setAlcoholDrug] = useState(null);

  const [selectedNegativeTestOption, setSelectedNegativeTestOption] = useState(
    {}
  );
  const [selectedAlcoholDrugStatusOption, setSelectedAlcoholDrugStatusOption] =
    useState({});

  useEffect(() => {
    // eslint-disable-next-line camelcase
    if (alcoholDrug != null) {
      const date = new Date();
      const offset = date.getTimezoneOffset();
      console.log('time offset----->', offset);
      console.log('time----->', alcoholDrug.test_performed_date);
      const dt = moment(alcoholDrug.test_performed_date).format(
        'YYYY-MM-DDTHH:MM'
      );
      console.log('time----->', dt);
      console.log('time----->', dt);

      setName(alcoholDrug.name);
      setNegativeTest(alcoholDrug.negative_test);
      // setTestPerformedDate(alcoholDrug.test_performed_date);
      setTestPerformedDate(
        alcoholDrug.test_performed_date !== null
          ? toLocalDateTime(alcoholDrug.test_performed_date)
          : ''
      );
      setAlcoholDrugStatusId(alcoholDrug.alcohol_drug_status_id);
      // setUploadDocId(alcoholDrug.document_id);
      if (alcoholDrug.documents.length > 0) {
        setDocument(alcoholDrug.documents[0]);
        setUploadDocId(alcoholDrug.documents[0].id);
      }

      console.log('ashish', alcoholDrug.document);
      setSelectedNegativeTestOption({
        value: alcoholDrug.negative_test,
        label: YES_NO_DATA.find((x) => x.id === alcoholDrug.negative_test).name,
      });
      setSelectedAlcoholDrugStatusOption({
        value: alcoholDrug.alcohol_drug_status_id,
        label: ALCOHOL_DRUG_STATUSES.find(
          (x) => x.id === alcoholDrug.alcohol_drug_status_id
        ).name,
      });
    }
    // eslint-disable-next-line camelcase
  }, [alcoholDrug]);

  useEffect(() => {
    loadAlcoholDrugs();
  }, []);

  const loadAlcoholDrugs = async () => {
    try {
      const url = `${URLConstants.GET_ALCOHOL_DRUG_URL}/${alcoholDrugId}.json`;
      const response = await fetchGET(url);
      setAlcoholDrug(response.data);
    } catch (error) {
      toast(error.message || 'Failed');
    }
  };

  const onAlcoholDrugSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      console.log('form.checkValidity()');
      event.preventDefault();
      event.stopPropagation();
    } else if (document === null) {
      console.log('document === null');
      toast('Please select Substance Screening Document' || 'Failed');
    } else {
      const postData = {
        id: alcoholDrugId,
        name,
        negative_test: negativeTest,
        test_performed_date:
          testPerformedDate !== '' ? toServerDateTime(testPerformedDate) : null,
        alcohol_drug_status_id: alcoholDrugStatusId,
        documents: [{ id: uploadDocId }],
        employee_id: employeeId,
      };
      postAlcoholDrug(postData).then(() => {});
    }

    setValidated(true);
    event.preventDefault();
  };

  const postAlcoholDrug = async (data) => {
    console.log('Submit data===========>', data);
    try {
      const url = `${URLConstants.GET_ALCOHOL_DRUG_URL}/${alcoholDrugId}.json`;

      await fetchPUT(url, data);
      // positionTitleRef.current();
      // setName('');
      //   history('../../private/audit-task-categories');
      closeModal();
    } catch (error) {
      console.log(error);
    }
  };

  const onNameChangeHandler = (event) => {
    // console.log(event.target.value);
    setName(event.target.value);
  };

  const onNegativeTestChangeHandler = (selectedOption) => {
    // console.log(event.target.value);
    setNegativeTest(+selectedOption.value);
    setSelectedNegativeTestOption(selectedOption);
    // console.log('negative test', selectedOption);
  };

  const onTestPerformedDateChangeHandler = (event) => {
    // console.log(event.target.value);
    setTestPerformedDate(event.target.value);
  };

  const onAlcoholDrugStatusChangeHandler = (selectedOption) => {
    setAlcoholDrugStatusId(+selectedOption.value);
    setSelectedAlcoholDrugStatusOption(selectedOption);
    console.log(selectedOption.value);
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
    // console.log('12345', response);
    if (response.success === true) {
      setDocument(response.data);
      setName(response.data.name.replace(/\.[^/.]+$/, ''));
      setUploadDocId(response.data.id);
    } else {
      toast.error('Unable to upload file.' || 'Failed');
    }
  };

  const renderDocument = () => {
    if (document === null) {
      return (
        <>
          {alcoholDrug !== null && alcoholDrug.documents.length > 0 && (
            // eslint-disable-next-line jsx-a11y/img-redundant-alt
            <p>
              <a
                href={alcoholDrug.documents[0].url}
                target="_blank"
                rel="noreferrer"
              >
                <FontAwesomeIcon icon={faFilePdf} size="3x" />{' '}
                {alcoholDrug.documents[0].name}
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

  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Form noValidate validated={validated} onSubmit={onAlcoholDrugSubmit}>
            {renderDocument()}
            <Row>
              {/* Alcohol Drug Document */}
              <Col md={12}>
                <Form.Group controlId="formFile" className="mb-3">
                  <Form.Label>Substance Screening Document *</Form.Label>
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
              {/* <Col md={6}> */}
              {/*  /!* Issue Date *!/ */}
              {/*  <Form.Group className="mb-3" controlId="formBasicEmail"> */}
              {/*    <Form.Label>Employee</Form.Label> */}
              {/*    <EmployeeSelect */}
              {/*      onChange={(value) => { */}
              {/*        setEmployeeId(value); */}
              {/*      }} */}
              {/*    /> */}
              {/*  </Form.Group> */}
              {/* </Col> */}
              <Col md={6}>
                {/* Negative Test */}
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Negative Test *</Form.Label>
                  <Select
                    required
                    options={YES_NO_DATA.map((item) => {
                      return {
                        value: item.id,
                        label: item.name,
                      };
                    })}
                    onChange={onNegativeTestChangeHandler}
                    value={selectedNegativeTestOption}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                {/* Test Performed Date */}
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Test Performed Date</Form.Label>
                  <Form.Control
                    type="datetime-local"
                    placeholder="Test Performed Date"
                    onChange={onTestPerformedDateChangeHandler}
                    value={testPerformedDate}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                {/* Expiration Date */}
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Substance Screening Status *</Form.Label>
                  <Select
                    options={ALCOHOL_DRUG_STATUSES.map((item) => {
                      return {
                        value: item.id,
                        label: item.name,
                      };
                    })}
                    onChange={onAlcoholDrugStatusChangeHandler}
                    value={selectedAlcoholDrugStatusOption}
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
export default EditAlcoholDrugs;
