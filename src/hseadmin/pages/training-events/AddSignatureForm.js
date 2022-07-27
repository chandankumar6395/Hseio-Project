import { Col, Row } from 'react-bootstrap';
import React, { useEffect, useRef } from 'react';
import { toast } from 'react-toastify';

import { Button } from '@mui/material';
import { useSelector } from 'react-redux';
import SignaturePad from 'react-signature-canvas';

import URLConstants from '../../constants/URLConstants';
import { fetchPUT, uploadFile } from '../../utils/NetworkUtils';
import { KEY_COMPANY_ID } from '../../constants/Constants';

const AddSignatureForm = ({ trainingEventEmployeeId, closeModal }) => {
  console.log('trainingEventEmployeeId', trainingEventEmployeeId);
  const signaturePadRef = useRef();
  const localCompanyId = localStorage.getItem(KEY_COMPANY_ID);
  const localDivisionId = useSelector((state) => state.auth.selectedDivision);
  const localJobSiteId = useSelector((state) => state.auth.selectedJobSite);

  console.log('NewJobWorkAuthorization localCompanyId', localCompanyId);
  console.log('NewJobWorkAuthorization localDivisionId', localDivisionId);
  console.log('NewJobWorkAuthorization localJobSiteId', localJobSiteId);

  useEffect(() => {}, []);

  const postSignature = async (signatureId) => {
    try {
      const postData = {
        id: trainingEventEmployeeId,
        signature_id: signatureId,
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

  return (
    <>
      <Row>
        <Col md={12} style={{ border: '1px solid #000' }}>
          <SignaturePad
            ref={signaturePadRef}
            penColor="black"
            canvasProps={{ width: 500, height: 200, className: 'sigCanvas' }}
          />
        </Col>
        <Col md={6}>
          <Button
            style={{ marginTop: '10px' }}
            variant="contained"
            type="button"
            color="primary"
            onClick={async () => {
              const value = signaturePadRef;

              console.log(
                signaturePadRef.current
                  .getTrimmedCanvas()
                  .toDataURL('image/png')
              );
              console.log(value);

              const canvas = signaturePadRef.current.getTrimmedCanvas();

              canvas.toBlob(async (blob) => {
                // Create an object of formData
                const formData = new FormData();

                // Update the formData object
                formData.append('photo', blob, 'signature.png');

                try {
                  const response = await uploadFile(
                    `${URLConstants.PHOTOS_URL}/upload.json`,
                    formData
                  );
                  postSignature(response.data.id);
                } catch (error) {
                  toast.error('Unable to upload file ' || 'Failed');
                }
              });
            }}
          >
            Upload Signature
          </Button>
        </Col>
      </Row>
    </>
  );
};

export default AddSignatureForm;
