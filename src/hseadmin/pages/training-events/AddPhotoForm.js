import { Col, Form, Row } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import { Button } from '@mui/material';
import { useSelector } from 'react-redux';

import URLConstants from '../../constants/URLConstants';
import { fetchPUT, uploadFile } from '../../utils/NetworkUtils';
import { KEY_COMPANY_ID } from '../../constants/Constants';

const AddPhotoForm = ({ trainingEventEmployeeId, closeModal }) => {
  console.log('trainingEventEmployeeId', trainingEventEmployeeId);
  const localCompanyId = localStorage.getItem(KEY_COMPANY_ID);
  const localDivisionId = useSelector((state) => state.auth.selectedDivision);
  const localJobSiteId = useSelector((state) => state.auth.selectedJobSite);

  console.log('NewJobWorkAuthorization localCompanyId', localCompanyId);
  console.log('NewJobWorkAuthorization localDivisionId', localDivisionId);
  console.log('NewJobWorkAuthorization localJobSiteId', localJobSiteId);

  useEffect(() => {}, []);
  const [photo, setPhoto] = useState(null);
  const postPhoto = async () => {
    try {
      const postData = {
        id: trainingEventEmployeeId,
        primary_photo_id: photo.id,
      };
      // await dispatch(addJobWorkAuthorizations(data));
      const url = `${URLConstants.GET_TRAINING_EVENT_EMPLOYEE_URL}/${trainingEventEmployeeId}.json`;

      console.log('addJobWorkAuthorizations url =', url);

      const response = await fetchPUT(url, postData);

      if (closeModal) {
        closeModal();
      }
      console.log('addJobWorkAuthorizations --->', response);
    } catch (error) {
      toast(error.message || 'Failed');
    }
  };

  // On file select (from the pop up)
  const onLogoFileChange = (event) => {
    onLogoFileUpload(event.target.files[0]);
  };

  // On file upload (click the upload button)
  const onLogoFileUpload = async (value) => {
    // Create an object of formData
    const formData = new FormData();

    // Update the formData object
    formData.append('photo', value, value.name);

    try {
      const response = await uploadFile(
        `${URLConstants.PHOTOS_URL}/upload.json`,
        formData
      );
      console.log(response.data);
      setPhoto(response.data);
    } catch (error) {
      toast.error('Unable to upload file ' || 'Failed');
    }

    // await dispatch(addPhoto(formData));
  };

  return (
    <>
      <Row>
        <Col md={12} style={{ border: '1px solid #000' }}>
          {photo && (
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                width: '100%',
              }}
            >
              <img
                style={{
                  width: '300px',
                  height: 'auto',
                  alignItems: 'center',
                  backgroundColor: 'lightgrey',
                }}
                src={photo ? photo.url : ''}
                alt=""
              />
            </div>
          )}
        </Col>
        <Form.Group controlId="formFile" className="mb-3">
          <Form.Label>Employee Photo</Form.Label>
          <Form.Control type="file" onChange={onLogoFileChange} />
        </Form.Group>
        <Col md={6}>
          <Button
            style={{ marginTop: '10px' }}
            variant="contained"
            type="button"
            color="primary"
            onClick={async () => {
              try {
                postPhoto();
              } catch (error) {
                toast.error('Unable to upload file ' || 'Failed');
              }
            }}
          >
            Upload Photo
          </Button>
        </Col>
      </Row>
    </>
  );
};

export default AddPhotoForm;
