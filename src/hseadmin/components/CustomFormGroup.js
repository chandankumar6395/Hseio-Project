import { Form } from 'react-bootstrap';
import React from 'react';

const CustomFormGroup = (props) => {
  const { type, onChange, value, placeholder, label } = props;
  return (
    <Form.Group className="mb-3" controlId="formBasicEmail">
      <Form.Label>{label}</Form.Label>
      <Form.Control
        type={type}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
      />
    </Form.Group>
  );
};

export default CustomFormGroup;
