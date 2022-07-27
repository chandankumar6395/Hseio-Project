import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Select from 'react-select';
import { fetchGET } from '../../utils/NetworkUtils';
import URLConstants from '../../constants/URLConstants';

const EmployeeMultiSelect = (props) => {
  const { entities, companyId } = props;
  const [items, setItems] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState(null);
  useEffect(() => {
    loadData().then();
    if (entities !== undefined) {
      const localOptions = [];
      console.log('EmployeeMultiSelect', entities);
      entities.forEach((employee) => {
        localOptions.push({
          value: employee.id,
          label: `${employee.user.first_name} ${employee.user.last_name}`,
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

    props.onChange(localTypes);
  };

  const loadData = async () => {
    console.log('EmployeeMultiSelect loadData', entities);
    try {
      let url = `${URLConstants.EMPLOYEES_URL}?page=1&limit=1000`;
      if (companyId !== undefined) {
        url = `${url}&company_id=${companyId}`;
      }

      const response = await fetchGET(url);
      console.log('EmployeeMultiSelect ', response.data);
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
        options={items.map((employee) => {
          return {
            value: employee.id,
            label: `${employee.user.first_name} ${employee.user.last_name}`,
          };
        })}
        onChange={onChangeHandler}
        value={selectedOptions}
      />
    </>
  );
};

export default EmployeeMultiSelect;
