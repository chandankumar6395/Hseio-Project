import { FormControl, InputGroup } from 'react-bootstrap';
import React from 'react';

const CustomSearchComponent = ({ onSearch }) => {
  return (
    <>
      <InputGroup className="mb-3">
        <InputGroup.Text
          id="basic-addon1"
          style={{ borderRadius: '0.25rem 0px 0px 0.25rem', borderLeft: '0px' }}
        >
          <i className="nav-icon fas fa-search" style={{ color: '#007bff' }} />
        </InputGroup.Text>
        <FormControl
          placeholder="Search"
          aria-label="Username"
          aria-describedby="basic-addon1"
          onChange={onSearch}
        />
      </InputGroup>
    </>
  );
};

export default CustomSearchComponent;
