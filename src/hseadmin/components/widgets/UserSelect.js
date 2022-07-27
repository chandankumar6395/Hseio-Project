/* eslint-disable react/destructuring-assignment */
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Select from 'react-select';
import { fetchGET } from '../../utils/NetworkUtils';
import URLConstants from '../../constants/URLConstants';

const UserSelect = (props) => {
  console.log('UseSelect', props.entity);
  const [users, setUsers] = useState([]);
  const [selectedOption, setSeletedOption] = useState(null);
  useEffect(() => {
    loadData().then();
    console.log('UseSelect useEffect', props.entity);
    if (props.entity !== undefined && props.entity !== null) {
      setSeletedOption({
        value: props.entity.id,
        label: `${props.entity.first_name} ${props.entity.last_name}`,
      });
    }
  }, [props.entity]);

  const onUserIdChangeHandler = (selectedOption) => {
    console.log(`UserSelect = ${selectedOption.value}`);
    props.onChange(selectedOption.value);
    setSeletedOption(selectedOption);
  };

  const loadData = async () => {
    try {
      const url = `${URLConstants.USERS_URL}?page=1&limit=1000`;
      const response = await fetchGET(url);
      if (response.success === true) {
        setUsers(response.data);
      }
    } catch (error) {
      toast(error.message || 'Failed');
    }
  };

  return (
    <>
      <Select
        required
        options={users.map((user) => {
          return {
            value: user.id,
            label: `${user.first_name} ${user.last_name}`,
          };
        })}
        onChange={onUserIdChangeHandler}
        value={selectedOption}
      />
    </>
  );
};

export default UserSelect;
