import React, { useState, useEffect } from 'react';
import { Col, Form } from 'react-bootstrap';
// import { Button } from '@mui/material';
// import AddIcon from '@mui/icons-material/Add';
// import { fetchPOST } from '../../utils/NetworkUtils';
import CustomCreatableMultiSelect from './CustomCreatableMultiSelect';

const CustomManualDropDownMultiSelect = (props) => {
  const { title, entities, url, onSelect } = props;
  const [localEntities, setLocalEntities] = useState([]);
  const [ids, setIds] = useState([]);
  // const [idSelectOptions, setIdSelectOptions] = useState([]);
  const customMultiSelectRef = React.useRef(null);
  // const [name, setName] = useState('');

  useEffect(() => {
    console.log(ids);
    setLocalEntities([]);
  }, []);

  // const onNameSubmit = (event) => {
  //   const form = event.currentTarget;
  //   if (form.checkValidity() === false) {
  //     console.log('I am here too');
  //
  //     event.preventDefault();
  //     event.stopPropagation();
  //   } else {
  //     console.log('I am here');
  //     console.log(ids);
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
  //     await fetchPOST(url, data);
  //     customMultiSelectRef.current();
  //     setName('');
  //     //   history('../../private/audit-task-categories');
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  return (
    <>
      {/* Cdl Id Field */}
      <Col md={6}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>{title}</Form.Label>
          <CustomCreatableMultiSelect
            params={{
              url: url,
            }}
            onChange={(value) => {
              setIds(value);
              onSelect(value);
            }}
            entities={localEntities.length === 0 ? entities : localEntities}
            customRef={customMultiSelectRef}
          />
        </Form.Group>
      </Col>

      {/* Add cdl Title */}
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
      {/*    onClick={onNameSubmit} */}
      {/*  > */}
      {/*    <AddIcon /> */}
      {/*  </Button> */}
      {/* </Col> */}
    </>
  );
};

export default CustomManualDropDownMultiSelect;
