import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import CreatableSelect from 'react-select/creatable';
import { fetchGET, fetchPOST } from '../../utils/NetworkUtils';
import { KEY_COMPANY_ID } from '../../constants/Constants';

const CustomCreatableSelect = (props) => {
  const localCompanyId = localStorage.getItem(KEY_COMPANY_ID);
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

  const handleChange = (newValue, actionMeta) => {
    console.group('Value Changed');
    console.log(newValue);
    console.log(`action: ${actionMeta.action}`);
    console.groupEnd();
    onChange(newValue.value);
    setSelectedOption(newValue);
    if (actionMeta.action === 'create-option') createNew(newValue);
  };
  const handleInputChange = (inputValue, actionMeta) => {
    console.group('Input Changed');
    console.log(inputValue);
    console.log(`action: ${actionMeta.action}`);
    console.groupEnd();
  };

  // const onChangeHandler = (selectedOption) => {
  //   onChange(selectedOption.value);
  //   setSelectedOption(selectedOption);
  // };

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

  const createNew = async (inputValue) => {
    try {
      const url = `${params.url}`;

      const response = await fetchPOST(url, {
        name: inputValue.label,
        company_id: localCompanyId,
      });

      if (response.success === true) {
        await loadData();
        setSelectedOption({
          value: response.data.id,
          label: inputValue.label,
        });

        // if (entity !== undefined && entity !== null) {
        //   await setNewOption({
        //     value: response.data.id,
        //     label: inputValue.label,
        //   });
        // }

        onChange(response.data.id);
      }
    } catch (error) {
      toast(error.message || 'Failed');
    }
  };

  return (
    <>
      <CreatableSelect
        required
        options={items.map((item) => {
          return { value: item.id, label: item.name };
        })}
        onInputChange={handleInputChange}
        onChange={handleChange}
        value={selectedOption}
      />
    </>
  );
};

export default CustomCreatableSelect;
