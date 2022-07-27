/* eslint-disable react/destructuring-assignment */
import { Form } from 'react-bootstrap';
import Select from 'react-select';
import React, { useEffect, useState } from 'react';
import { LOGIN_TYPE_DATA } from '../constants/Constants';

const CustomUserRoleComponent = (props) => {
  const [options, setOptions] = useState([]);

  useEffect(() => {
    console.log(`CustomUserRoleComponent ${props.value}`);
    const localOptions = [];
    props.value.forEach((type) => {
      localOptions.push({ value: type.id, label: type.name });
    });

    setOptions(localOptions);
  }, []);

  const onChangeHandler = (selectedOptions) => {
    console.log(`I am inside here${selectedOptions}`);

    setOptions(selectedOptions);
    const localTypes = [];

    selectedOptions.forEach((type) => {
      localTypes.push({ id: type.value });
    });
    props.onRoleChanged(localTypes);
  };

  return (
    <Form.Group className="mb-3" controlId="formBasicEmail">
      <Form.Label>User Roles</Form.Label>
      <Select
        isMulti
        required
        options={LOGIN_TYPE_DATA.map((type) => {
          return { value: type.id, label: type.name };
        })}
        value={options}
        onChange={onChangeHandler}
      />
      <Form.Control.Feedback type="invalid">
        Please provide a valid User Status.
      </Form.Control.Feedback>
    </Form.Group>
  );
};

export default CustomUserRoleComponent;
