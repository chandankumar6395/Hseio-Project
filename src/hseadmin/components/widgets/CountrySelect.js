/* eslint-disable react/destructuring-assignment */
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Select from 'react-select';
import { fetchGET } from '../../utils/NetworkUtils';
import URLConstants from '../../constants/URLConstants';

const CountrySelect = (props) => {
  const [items, setItems] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  useEffect(() => {
    loadData().then();
    if (props.entity !== undefined && props.entity !== null) {
      setSelectedOption({
        value: props.entity.id,
        label: props.entity.name,
      });
    }
  }, []);

  const onChangeHandler = (selectedOption) => {
    props.onChange(selectedOption.value);
    setSelectedOption(selectedOption);
  };

  const loadData = async () => {
    try {
      const url = `${URLConstants.COUNTRIES_URL}?page=1&limit=1000&sort=name&direction=asc`;

      const response = await fetchGET(url);
      if (response.success === true) {
        setItems(response.data);
        if (response.data.length === 0) {
          setSelectedOption({});
        }
      }
    } catch (error) {
      toast(error.message || 'Failed');
    }
  };

  return (
    <>
      <Select
        required
        options={items.map((item) => {
          return { value: item.id, label: item.name };
        })}
        onChange={onChangeHandler}
        value={selectedOption}
      />
    </>
  );
};

export default CountrySelect;
