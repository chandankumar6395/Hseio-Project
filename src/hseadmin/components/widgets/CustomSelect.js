import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Select from 'react-select';
import { fetchGET } from '../../utils/NetworkUtils';

const CustomSelect = (props) => {
  const { params, entity, onChange, customRef } = props;
  const [items, setItems] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  useEffect(() => {
    console.log('CustomSelect --->', entity);
    loadData().then();
    if (entity !== undefined && entity !== null) {
      setSelectedOption({
        value: entity.id,
        label: entity.name,
      });
    }

    if (customRef !== undefined && customRef !== null) {
      customRef.current = loadData;
    }
  }, []);

  const onChangeHandler = (selectedOption) => {
    onChange(selectedOption.value);
    setSelectedOption(selectedOption);
  };

  const loadData = async () => {
    try {
      let url = `${params.url}?page=1&limit=1000&sort=name&direction=asc`;

      const keys = Object.keys(params);

      for (let i = 0; i < keys.length; i += 1) {
        if (keys[i] !== 'url' && params[keys[i]] !== null) {
          url = `${url}&${keys[i]}=${params[keys[i]]}`;
        }
      }

      const response = await fetchGET(url);

      if (response.success === true) {
        setItems(response.data);
        if (response.data.length === 0) {
          setSelectedOption({});
        }
      }

      if (entity !== undefined && entity !== null) {
        setSelectedOption({
          value: entity.id,
          label: entity.name,
        });
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

export default CustomSelect;
