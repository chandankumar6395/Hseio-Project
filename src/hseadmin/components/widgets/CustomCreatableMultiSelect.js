import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import CreatableSelect from 'react-select/creatable';
import { fetchGET, fetchPOST } from '../../utils/NetworkUtils';

const CustomCreatableMultiSelect = (props) => {
  const { entities, onChange, params, customRef } = props;
  const [items, setItems] = useState([]);

  const [selectedOptions, setSelectedOptions] = useState([]);
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

  // const onChangeHandler = (selectedOption) => {
  //   setSelectedOptions(selectedOption);
  //
  //   const localTypes = [];
  //
  //   selectedOption.forEach((item) => {
  //     localTypes.push({ id: item.value });
  //   });
  //
  //   onChange(localTypes);
  // };

  const handleChange = (newValues, actionMeta) => {
    console.group('Value Changed');
    console.log(newValues);
    console.log(`action: ${actionMeta.action}`);
    console.groupEnd();

    if (
      actionMeta.action === 'select-option' ||
      actionMeta.action === 'remove-value'
    ) {
      setSelectedOptions(newValues);
      const localTypes = [];
      newValues.forEach((item) => {
        localTypes.push({ id: item.value });
      });
      onChange(localTypes);
    }

    if (actionMeta.action === 'create-option') createNew(newValues);
  };
  const handleInputChange = (inputValue, actionMeta) => {
    console.group('Input Changed');
    console.log(inputValue);
    console.log(`action: ${actionMeta.action}`);
    console.groupEnd();
  };

  const createNew = async (newValues) => {
    try {
      const url = `${params.url}`;

      const lastItem = newValues[newValues.length - 1];
      console.log('lastItem', lastItem);
      const response = await fetchPOST(url, { name: lastItem.label });

      if (response.success === true) {
        setSelectedOptions((prevState) => {
          const temp = [
            ...prevState,
            { value: response.data.id, label: lastItem.label },
          ];
          const localTypes = [];
          temp.forEach((item) => {
            localTypes.push({ id: item.value });
          });
          onChange(localTypes);

          return temp;
        });
        loadData();
      }
    } catch (error) {
      toast(error.message || 'Failed');
    }
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
      <CreatableSelect
        required
        isMulti
        options={items.map((item) => {
          return {
            value: item.id,
            label: `${item.name}`,
          };
        })}
        // onChange={onChangeHandler}
        // value={selectedOptions}
        onInputChange={handleInputChange}
        onChange={handleChange}
        value={selectedOptions}
      />
    </>
  );
};

export default CustomCreatableMultiSelect;
