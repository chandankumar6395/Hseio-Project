import { Col, Form } from 'react-bootstrap';
import React, { useState } from 'react';
import CustomCreatableSelect from './CustomCreatableSelect';

const CustomManualDropDownSelect = (props) => {
  const { title, entity, url, onSelect } = props;
  const [id, setId] = useState(null);
  const [localEntity, setLocalEntity] = useState(null);
  const customSelectRef = React.useRef(null);
  console.log('i am id ', id);
  // const onNewDesignationNameSubmit = (event) => {
  //   const form = event.currentTarget;
  //   if (form.checkValidity() === false) {
  //     console.log('I am here too');
  //
  //     event.preventDefault();
  //     event.stopPropagation();
  //   } else {
  //     console.log('I am here');
  //     console.log('i am id = ', id);
  //     event.preventDefault();
  //     const data = {
  //       name: name,
  //     };
  //     postData(data);
  //   }
  //   // setValidated(true);
  // };

  // const postData = async (data) => {
  //   console.log('Submit data===========>', data);
  //   try {
  //     const response = await fetchPOST(url, data);
  //     customSelectRef.current();
  //     setLocalEntity(response.data);
  //
  //     setName('');
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  return (
    <>
      {' '}
      {/* Designation Id Field */}
      <Col md={6}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>{title}</Form.Label>
          <CustomCreatableSelect
            params={{
              url: url,
            }}
            onChange={(value) => {
              setId(value);
              onSelect(value);
              setLocalEntity(value);
            }}
            entity={localEntity === null ? entity : localEntity}
            customRef={customSelectRef}
          />
        </Form.Group>
      </Col>
      {/* Add Position Title */}
      {/* <Col md={6} className="adgrp"> */}
      {/*  <Form.Group className="mb-3" noValidate> */}
      {/*    <Form.Label>Add {title}</Form.Label> */}
      {/*    <Form.Control */}
      {/*      type="text" */}
      {/*      placeholder={`Add ${title}`} */}
      {/*      value={name} */}
      {/*      onChange={(event) => { */}
      {/*        setName(event.target.value); */}
      {/*      }} */}
      {/*    /> */}
      {/*  </Form.Group> */}
      {/*  <Button */}
      {/*    className="mt-10" */}
      {/*    variant="contained" */}
      {/*    color="info" */}
      {/*    type="button" */}
      {/*    onClick={onNewDesignationNameSubmit} */}
      {/*  > */}
      {/*    <AddIcon /> */}
      {/*  </Button> */}
      {/* </Col> */}
    </>
  );
};

export default CustomManualDropDownSelect;
