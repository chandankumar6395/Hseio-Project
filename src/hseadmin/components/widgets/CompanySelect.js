import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import Select from 'react-select';
import URLConstants from '../../constants/URLConstants';
import { fetchGET } from '../../utils/NetworkUtils';

const CompanySelect = (props) => {
  const { entity, onChange } = props;
  const [companies, setCompanies] = useState([]);
  const [selectedOption, setSeletedOption] = useState(null);
  useEffect(() => {
    loadData().then();
    if (entity !== undefined && entity !== null) {
      setSeletedOption({
        value: entity.id,
        label: entity.name,
      });
    }
  }, []);

  const onCompanyIdChangeHandler = (selectedOption) => {
    console.log(`CompanySelect = ${selectedOption.value}`);
    onChange(selectedOption.value);
    setSeletedOption(selectedOption);
  };

  const loadData = async () => {
    try {
      const url = `${URLConstants.COMPANIES_URL}?page=1&limit=1000`;
      const response = await fetchGET(url);
      if (response.success === true) {
        setCompanies(response.data);
      }
    } catch (error) {
      toast(error.message || 'Failed');
    }
  };

  return (
    <>
      <Select
        required
        options={companies.map((company) => {
          return { value: company.id, label: company.name };
        })}
        onChange={onCompanyIdChangeHandler}
        value={selectedOption}
      />
    </>
  );
};

export default CompanySelect;
