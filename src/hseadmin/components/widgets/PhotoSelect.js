import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { Form } from 'react-bootstrap';
import CloseIcon from '@mui/icons-material/Close';
import { fetchDELETE, uploadFile } from '../../utils/NetworkUtils';
import URLConstants from '../../constants/URLConstants';
// import EditIcon from '@mui/icons-material/Edit';

const PhotoSelect = (props) => {
  const { entities, onChange, onOriginalChange } = props;
  const [photos, setPhotos] = useState([]);

  // only for sending array back to parent
  const [selectedPhotoOptions, setSelectedPhotoOptions] = useState([]);

  useEffect(() => {
    // onLogoFileUpload().then();
    if (entities !== undefined) {
      const localOptions = [];
      // console.log('PhotoSelect', entities);
      entities.forEach((item) => {
        localOptions.push({
          value: item.id,
          label: `${item.name}`,
        });
      });

      setSelectedPhotoOptions(localOptions);
      setPhotos(entities);
    }
  }, [entities]);

  const onLogoFileChange = (event) => {
    setSelectedPhotoOptions(selectedPhotoOptions);
    // console.log(validated);
    onLogoFileUpload(event.target.files[0]);

    const array = [];

    selectedPhotoOptions.forEach((item) => {
      array.push({ id: item.value });
    });

    // onChange(array);
  };

  // On file upload (click the upload button)
  const onLogoFileUpload = async (value) => {
    // Create an object of formData
    const formData = new FormData();

    // Update the formData object
    formData.append('photo', value, value.name);
    console.log(value);

    try {
      const response = await uploadFile(
        `${URLConstants.PHOTOS_URL}/upload.json`,
        formData
      );

      const tempPhotos = [...photos, response.data];
      setPhotos((prevState) => [...prevState, response.data]);

      const localPhotoArray = [];
      photos.forEach((photo) => {
        localPhotoArray.push({ id: photo.id });
      });
      localPhotoArray.push({ id: response.data.id });
      onChange(localPhotoArray);
      if (onOriginalChange) {
        onOriginalChange(tempPhotos);
      }
    } catch (error) {
      console.log(error);
      toast.error('Unable to upload file ' || 'Failed');
    }
  };

  const deletePhoto = async (id) => {
    // console.log(id);
    try {
      const url = `${URLConstants.PHOTOS_URL}/${id}.json`;
      await fetchDELETE(url);
      // console.log(response.data);

      const s = photos.filter((item) => item.id !== id);
      setPhotos(s);

      const localPhotoArray = [];
      s.forEach((photo) => {
        localPhotoArray.push({ id: photo.id });
      });
      onChange(localPhotoArray);
      // console.log(s);

      // fetchPhotos();
    } catch (error) {
      toast(error.message || 'Failed');
    }
  };

  // const fetchPhotos = async () => {
  //   try {
  //     // setLoading(true);
  //     // console.log(employeeId);
  //     const url = `${URLConstants.PHOTOS_URL}?limit=100&page=1`;
  //
  //     // if (employeeId !== -1 && employeeId !== undefined) {
  //     //   url = `${url}&employee_id=${employeeId}`;
  //     // }
  //     const response = await fetchGET(url);
  //
  //     setPhotos(response.data);
  //     // setLoading(false);
  //     // props.resetReloadItems();
  //   } catch (error) {
  //     toast(error.message || 'Failed');
  //     // setLoading(false);
  //   }
  // };
  //
  // function deleteFile(e) {
  //   const s = photos.filter((item, index) => index !== e);
  //   setPhotos(s);
  //   console.log(s);
  // }

  return (
    <>
      {/* <Col md={12} className="form-group multi-preview"> */}
      <Form.Group controlId="formFile" className="mb-3">
        <Form.Label>Upload Photo</Form.Label>
        <Form.Control
          type="file"
          onChange={onLogoFileChange}
          // onSubmit={onPhotoSubmit}
          photos={photos}
        />
      </Form.Group>
      <div className="photoselbox">
        {photos.map((photo) => {
          return (
            <div className="photoselitembox" key={photo.id}>
              <span
                data-fancybox
                data-src={photo.url}
                style={{ cusor: 'pointer' }}
              >
                {/* eslint-disable-next-line jsx-a11y/img-redundant-alt */}
                <img
                  style={{
                    alignItems: 'center',
                    backgroundColor: 'white',
                    width: '150px',
                    height: 'auto',
                  }}
                  src={photo.url !== null ? photo.url : ''}
                  alt=""
                />
              </span>
              <CloseIcon
                className="delphotobtn"
                onClick={() => deletePhoto(photo.id)}
                value={selectedPhotoOptions}
              />
            </div>
          );
        })}
      </div>
      {/* </Col> */}
    </>
  );
};

export default PhotoSelect;
