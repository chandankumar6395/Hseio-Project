/* eslint-disable react/destructuring-assignment */
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Select from 'react-select';
import { useSelector } from 'react-redux';
import { fetchGET } from '../../utils/NetworkUtils';
import URLConstants from '../../constants/URLConstants';
import { KEY_COMPANY_ID } from '../../constants/Constants';

const EmployeeSelect = (props) => {
  console.log('EmployeeSelect', props.entity);
  const localCompanyId = localStorage.getItem(KEY_COMPANY_ID);
  const localDivisionId = useSelector((state) => state.auth.selectedDivision);
  const localJobSiteId = useSelector((state) => state.auth.selectedJobSite);

  console.log('EmployeeSelect localCompanyId', localCompanyId);
  console.log('EmployeeSelect localDivisionId', localDivisionId);
  console.log('EmployeeSelect localJobSiteId', localJobSiteId);
  const [employees, setEmployees] = useState([]);
  const [selectedOption, setSeletedOption] = useState(null);
  useEffect(() => {
    loadData().then();

    console.log('EmployeeSelect useEffect', props.entity);
    if (props.entity !== undefined && props.entity !== null) {
      setSeletedOption({
        value: props.entity.id,
        label: `${props.entity.user.first_name} ${props.entity.user.last_name}`,
      });
    }
  }, [localCompanyId, localDivisionId, props.entity]);

  const onEmployeeIdChangeHandler = (selectedOption) => {
    console.log(`EmployeeSelect = ${selectedOption.value}`);
    props.onChange(selectedOption.value);
    setSeletedOption(selectedOption);
  };

  const loadData = async () => {
    try {
      let url = `${URLConstants.EMPLOYEES_URL}?page=1&limit=1000&filter=list`;

      if (localCompanyId !== null) {
        url = `${url}&company_id=${localCompanyId}`;
      }

      if (localDivisionId !== -1) {
        url = `${url}&division_id=${localDivisionId}`;
      }

      const response = await fetchGET(url);
      if (response.success === true) {
        setEmployees(response.data);
      }
    } catch (error) {
      toast(error.message || 'Failed');
    }
  };

  return (
    <>
      <Select
        required
        options={employees.map((employee) => {
          return {
            value: employee.id,
            label: `${employee.user.first_name} ${employee.user.last_name}`,
          };
        })}
        onChange={onEmployeeIdChangeHandler}
        value={selectedOption}
      />
    </>
  );
};

export default EmployeeSelect;
