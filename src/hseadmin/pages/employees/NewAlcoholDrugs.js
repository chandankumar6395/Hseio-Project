import React, { useEffect, useState } from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { Button, Grid } from '@mui/material';
import Select from 'react-select';
import URLConstants from '../../constants/URLConstants';
import { fetchPOST, uploadFile } from '../../utils/NetworkUtils';
// import EmployeeSelect from '../../components/widgets/EmployeeSelect';
import { ALCOHOL_DRUG_STATUSES, YES_NO_DATA } from '../../constants/Constants';
import { toServerDateTime } from '../../utils/Utils';

const NewAlcoholDrugs = (props) => {
  const { employeeId, closeModal } = props;

  // console.log('NewAlcoholDrug employeeId', employeeId);
  // const dispatch = useDispatch();

  const [name, setName] = useState('');
  const [uploadDocId, setUploadDocId] = useState('');
  // const [employeeId, setEmployeeId] = useState('');
  const [negativeTest, setNegativeTest] = useState(0);
  const [testPerformedDate, setTestPerformedDate] = useState('');
  const [alcoholDrugStatusId, setAlcoholDrugStatusId] = useState(null);
  const [validated, setValidated] = useState(false);

  useEffect(() => {
    console.log(setUploadDocId, uploadDocId);
  }, []);

  const onAlcoholDrugSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else if (document === null) {
      toast('Please select Alcohol Drug Document' || 'Failed');
    } else {
      const postData = {
        name,
        negative_test: negativeTest,
        test_performed_date:
          testPerformedDate !== '' ? toServerDateTime(testPerformedDate) : null,
        alcohol_drug_status_id: alcoholDrugStatusId,
        // document_id: uploadDocId,
        documents: [{ id: uploadDocId }],
        employee_id: +employeeId,
      };
      postAlcoholDrug(postData).then(() => {});
    }

    setValidated(true);
    event.preventDefault();
  };

  const postAlcoholDrug = async (data) => {
    console.log('Submit data===========>', data);
    try {
      await fetchPOST(URLConstants.ALCOHOL_DRUG_URL, data);
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
  };

  const onTestPerformedDateChangeHandler = (event) => {
    // console.log(event.target.value);
    setTestPerformedDate(event.target.value);
  };

  const onAlcoholDrugStatusChangeHandler = (selectedOption) => {
    setAlcoholDrugStatusId(+selectedOption.value);
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
    console.log('12345', response);
    if (response.success === true) {
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
          <Form noValidate validated={validated} onSubmit={onAlcoholDrugSubmit}>
            <Row>
              {/* Employee Certificate Document */}
              <Col md={12}>
                <Form.Group controlId="formFile" className="mb-3">
                  <Form.Label>Substance Screening Document *</Form.Label>
                  <Form.Control
                    required
                    type="file"
                    accept="application/pdf"
                    onChange={onDocumentFileChange}
                  />
                  <Form.Control.Feedback type="invalid">
                    Please provide a file.
                  </Form.Control.Feedback>
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
                {/* Expiration Date */}
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
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                {/* Expiration Date */}
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Test Performed Date</Form.Label>
                  <Form.Control
                    type="datetime-local"
                    placeholder="Test Performed Date"
                    onChange={onTestPerformedDateChangeHandler}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                {/* Expiration Date */}
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Alcohol Drug Status *</Form.Label>
                  <Select
                    required
                    options={ALCOHOL_DRUG_STATUSES.map((item) => {
                      return {
                        value: item.id,
                        label: item.name,
                      };
                    })}
                    onChange={onAlcoholDrugStatusChangeHandler}
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

export default NewAlcoholDrugs;
