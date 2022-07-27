import { Form } from 'react-bootstrap';
import React from 'react';

const CustomFormGroupRequired = (props) => {
  const { type, onChange, value, placeholder, label, validate } = props;
  return (
    <Form.Group className="mb-3" controlId="formBasicEmail">
      <Form.Label>{label}</Form.Label>
      <Form.Control
        required
        type={type}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
      />
      {validate && (
        <Form.Control.Feedback type="invalid">
          Please provide a valid name.
        </Form.Control.Feedback>
      )}
    </Form.Group>
  );
};

export default CustomFormGroupRequired;
