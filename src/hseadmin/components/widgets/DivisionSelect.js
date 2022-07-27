/* eslint-disable react/destructuring-assignment */
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Select from 'react-select';
import { fetchGET } from '../../utils/NetworkUtils';
import URLConstants from '../../constants/URLConstants';

const DivisionSelect = (props) => {
  const { companyId } = props;
  const [items, setItems] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  useEffect(() => {
    console.log('DivisionSelect.useEffect');
    if (props.companyId !== undefined && props.companyId !== -1)
      loadData().then();
    if (props.entity !== undefined && props.entity !== null) {
      setSelectedOption({
        value: props.entity.id,
        label: props.entity.name,
      });
    }
  }, [companyId]);

  useEffect(() => {
    console.log('I am here ---', items.length);
    if (items.length === 0) {
      setSelectedOption({});
    }
  }, [items]);

  const onChangeHandler = (selectedOption) => {
    props.onChange(selectedOption.value);
    setSelectedOption(selectedOption);
  };

  const loadData = async () => {
    try {
      let url = `${URLConstants.DIVISIONS_URL}?page=1&limit=1000&sort=name&direction=asc`;

      if (props.companyId !== undefined && props.companyId !== null) {
        url = `${url}&company_id=${props.companyId}`;
      }

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

export default DivisionSelect;
