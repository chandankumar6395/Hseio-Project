/* eslint-disable react/destructuring-assignment */
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Select from 'react-select';
import { fetchGET } from '../../utils/NetworkUtils';
import URLConstants from '../../constants/URLConstants';

const StateSelect = (props) => {
  const { countryId } = props;

  const [items, setItems] = useState([]);
  const [selectedOption, setSeletedOption] = useState(null);
  useEffect(() => {
    if (countryId !== undefined && countryId !== -1 && countryId !== null)
      loadData().then();
    if (props.entity !== undefined && props.entity !== null) {
      setSeletedOption({
        value: props.entity.id,
        label: props.entity.name,
      });
    }
  }, [countryId]);

  const onChangeHandler = (selectedOption) => {
    props.onChange(selectedOption.value);
    setSeletedOption(selectedOption);
  };

  const loadData = async () => {
    try {
      let url = `${URLConstants.STATES_URL}?page=1&limit=1000&sort=name&direction=asc`;

      url = `${url}&country_id=${countryId}`;

      const response = await fetchGET(url);
      if (response.success === true) {
        setItems(response.data);
        if (response.data.length === 0) {
          setSeletedOption({});
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

export default StateSelect;
