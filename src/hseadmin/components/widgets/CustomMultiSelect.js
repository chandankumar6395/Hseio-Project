import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Select from 'react-select';
import { fetchGET } from '../../utils/NetworkUtils';

const CustomMultiSelect = (props) => {
  const { entities, onChange, params, customRef } = props;
  const [items, setItems] = useState([]);

  const [selectedOptions, setSelectedOptions] = useState(null);
  useEffect(() => {
    loadData().then();
    if (entities !== undefined) {
      const localOptions = [];
      console.log('CustomMultiSelect', entities);
      entities.forEach((entity) => {
        localOptions.push({
          value: entity.id,
          label: `${entity.name}`,
        });
      });

      setSelectedOptions(localOptions);
    }

    if (customRef !== undefined && customRef !== null) {
      customRef.current = loadData;
    }
  }, [entities]);

  const onChangeHandler = (selectedOption) => {
    setSelectedOptions(selectedOption);

    const localTypes = [];

    selectedOption.forEach((item) => {
      localTypes.push({ id: item.value });
    });

    onChange(localTypes);
  };

  const loadData = async () => {
    try {
      let url = `${params.url}?page=1&limit=1000`;

      const keys = Object.keys(params);

      for (let i = 0; i < keys.length; i += 1) {
        if (keys[i] !== 'url') url = `${url}&${keys[i]}=${params[keys[i]]}`;
      }
      const response = await fetchGET(url);
      if (response.success === true) {
        setItems(response.data);
      }
    } catch (error) {
      toast(error.message || 'Failed');
    }
  };

  return (
    <>
      <Select
        required
        isMulti
        options={items.map((item) => {
          return {
            value: item.id,
            label: `${item.name}`,
          };
        })}
        onChange={onChangeHandler}
        value={selectedOptions}
      />
    </>
  );
};

export default CustomMultiSelect;
