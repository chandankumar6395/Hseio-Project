/* eslint-disable react/destructuring-assignment */
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Select from 'react-select';
import { fetchGET } from '../../utils/NetworkUtils';
import URLConstants from '../../constants/URLConstants';

const JobSiteSelect = (props) => {
  const { companyId, divisionId } = props;
  const [items, setItems] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  useEffect(() => {
    if (
      companyId !== undefined &&
      companyId !== -1 &&
      divisionId !== undefined &&
      divisionId !== -1 &&
      divisionId !== null
    )
      loadData().then();
    if (props.entity !== undefined && props.entity !== null) {
      setSelectedOption({
        value: props.entity.id,
        label: props.entity.name,
      });
    }
  }, [divisionId]);

  const onChangeHandler = (selectedOption) => {
    props.onChange(selectedOption.value);
    setSelectedOption(selectedOption);
  };

  const loadData = async () => {
    try {
      let url = `${URLConstants.JOB_SITES_URL}?page=1&limit=1000&sort=name&direction=asc`;

      url = `${url}&company_id=${companyId}`;
      url = `${url}&division_id=${divisionId}`;

      const response = await fetchGET(url);
      if (response.success === true) {
        setItems(response.data);
        if (props.entity !== undefined && props.entity !== null) {
          const division = response.data.find((x) => x.id === props.entity.id);
          if (division) {
            setSelectedOption({
              value: props.entity.id,
              label: props.entity.name,
            });
          } else {
            setSelectedOption({});
          }
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

export default JobSiteSelect;
