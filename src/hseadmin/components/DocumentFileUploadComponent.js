/* eslint-disable react/destructuring-assignment */
import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { uploadFile } from '@app/hseadmin/utils/NetworkUtils';
import URLConstants from '@app/hseadmin/constants/URLConstants';

const DocumentFileUploadComponent = (props) => {
  const [document, setDocument] = useState(null);
  // On file select (from the pop up)
  const onDocumentFileChange = (event) => {
    const file = event.target.files[0];

    if (file.type !== 'application/pdf') {
      toast.error('Please select PDF file.' || 'Failed');
    } else {
      onDocumentFileUpload(event.target.files[0]);
    }
  };

  // On file upload (click the upload button)
  const onDocumentFileUpload = async (value) => {
    // Create an object of formData
    const formData = new FormData();

    // Update the formData object
    formData.append('document', value, value.name);

    try {
      const url = `${URLConstants.DOCUMENTS_URL}/upload.json`;
      const response = await uploadFile(url, formData);
      setDocument(response.data);
      props.onFileUpload(response.data.id);
      console.log(document);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <Form.Group controlId="formFile" className="mb-3">
      <Form.Label>Employee Certificate Document</Form.Label>
      <Form.Control
        type="file"
        accept="application/pdf"
        onChange={onDocumentFileChange}
      />
    </Form.Group>
  );
};

export default DocumentFileUploadComponent;
