import React, { useState } from 'react';
import axios from 'axios';
import URLConstants from '../../constants/URLConstants';

const NewBanner = () => {
  const [selectedFile, setSelectedFile] = useState('');

  // On file select (from the pop up)
  const onFileChange = (event) => {
    const { files } = event.target;

    Object.values(files).forEach(function (file, index) {
      // myformData.append(index, file);
      console.log('index = ', index, ` file = ${file}`);
    });
    console.log(event.target.files[0]);
    // Update the state
    setSelectedFile(event.target.files[0]);
  };

  // On file upload (click the upload button)
  const onFileUpload = () => {
    // Create an object of formData
    const formData = new FormData();

    // Update the formData object
    formData.append('banner', selectedFile, selectedFile.name);

    // Details of the uploaded file
    console.log(selectedFile);

    const token = localStorage.getItem('TOKEN');
    const bearer = `Bearer ${token}`;
    // Request made to the backend api
    // Send formData object
    axios.post(URLConstants.BANNER_UPLOAD_URL, formData, {
      headers: {
        Authorization: bearer,
      },
    });
  };

  // File content to be displayed after
  // file upload is complete
  const fileData = () => {
    if (selectedFile) {
      return (
        <div>
          <h2>File Details:</h2>
          <p>File Name: {selectedFile.name}</p>
          <p>File Type: {selectedFile.type}</p>
          <p>Last Modified: {selectedFile.lastModifiedDate.toDateString()}</p>
        </div>
      );
    }
    return (
      <div>
        <br />
        <h4>Choose before Pressing the Upload button</h4>
      </div>
    );
  };

  return (
    <div>
      <h1>GeeksforGeeks</h1>
      <h3>File Upload using React!</h3>
      <div>
        <input type="file" onChange={onFileChange} />
        <button onClick={onFileUpload}>Upload!</button>
      </div>
      {fileData()}
    </div>
  );
};

export default NewBanner;
