import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import {
  FormControl,
  InputLabel,
  MenuItem,
  Select as MuiSelect,
} from '@mui/material';
import styled from '@emotion/styled';
import { spacing } from '@mui/system';
import URLConstants from '../../constants/URLConstants';
import { fetchGET } from '../../utils/NetworkUtils';

const CustomSelect = styled(MuiSelect)(spacing);
const CompanySelectMUI = (props) => {
  const { entity, onChange } = props;
  const [companies, setCompanies] = useState([]);

  const [selectedId, setSelectedId] = useState(-1);
  useEffect(() => {
    loadData().then();
    if (entity !== undefined && entity !== null) {
      setSelectedId(entity.id);
    }
  }, []);

  const onCompanyIdChangeHandler = (value) => {
    console.log(`CompanySelect = ${value}`);
    onChange(value);
    // setSelectedId(value);
  };

  const loadData = async () => {
    try {
      const url = `${URLConstants.COMPANIES_URL}?page=1&limit=1000`;
      const response = await fetchGET(url);
      if (response.success === true) {
        setCompanies(response.data);
        console.log(companies);
      }
    } catch (error) {
      toast(error.message || 'Failed');
    }
  };

  return (
    <>
      <FormControl>
        <InputLabel id="demo-simple-select-label">Age</InputLabel>
        <CustomSelect
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={selectedId}
          label="Age"
          onChange={onCompanyIdChangeHandler}
        >
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </CustomSelect>
      </FormControl>
      {/* <Select */}
      {/*  name="company id" */}
      {/*  label="Select Company" */}
      {/*  value={selectedId} */}
      {/*  fullWidth */}
      {/*  variant="outlined" */}
      {/*  onChange={onCompanyIdChangeHandler} */}
      {/* > */}
      {/*  {companies.map((company) => { */}
      {/*    return ( */}
      {/*      <MenuItem key={company.id} value={company.id}> */}
      {/*        {company.name} */}
      {/*      </MenuItem> */}
      {/*    ); */}
      {/*  })} */}
      {/* </Select> */}
      {/* <Select */}
      {/*  required */}
      {/*  options={companies.map((company) => { */}
      {/*    return { value: company.id, label: company.name }; */}
      {/*  })} */}
      {/*  onChange={onCompanyIdChangeHandler} */}
      {/*  value={selectedOption} */}
      {/* /> */}
    </>
  );
};

export default CompanySelectMUI;
