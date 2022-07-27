import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Select from 'react-select';
import { fetchGET } from '../../utils/NetworkUtils';
import URLConstants from '../../constants/URLConstants';

const ManagerSelect = ({ entities, onChange, companyId }) => {
  const [items, setItems] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState(null);
  console.log('ManagerSelect companyId=', companyId);
  useEffect(() => {
    loadData().then();
    if (entities !== undefined) {
      const localOptions = [];
      console.log('ManagerSelect', entities);
      entities.forEach((manager) => {
        localOptions.push({
          value: manager.id,
          label: `${manager.first_name} ${manager.last_name}`,
        });
      });

      setSelectedOptions(localOptions);
    }
  }, [entities, companyId]);

  const onChangeHandler = (selectedOption) => {
    setSelectedOptions(selectedOption);

    const localTypes = [];

    selectedOption.forEach((item) => {
      localTypes.push({ id: item.value });
    });

    onChange(localTypes);
  };

  const loadData = async () => {
    console.log('ManagerSelect loadData', entities);

    try {
      if (companyId !== undefined && companyId !== null) {
        let url = `${URLConstants.USERS_URL}?page=1&limit=1000`;

        // if (companyId !== undefined && companyId !== null) {
        url = `${url}&company_id=${companyId}`;
        // }
        console.log('ManagerSelect loadData', url);

        const response = await fetchGET(url);
        if (response.success === true) {
          setItems(response.data);
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
        isMulti
        options={items.map((user) => {
          return {
            value: user.id,
            label: `${user.first_name} ${user.last_name}`,
          };
        })}
        onChange={onChangeHandler}
        value={selectedOptions}
      />
    </>
  );
};

export default ManagerSelect;
