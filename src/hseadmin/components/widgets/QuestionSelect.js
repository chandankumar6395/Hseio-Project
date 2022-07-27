import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Select from 'react-select';
import { fetchGET } from '../../utils/NetworkUtils';
import URLConstants from '../../constants/URLConstants';


const QuestionSelect = (props) => {
  const {companyId, divisionId, jobSiteId} = props;
  const [items, setItems] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  useEffect(() => {
    if (
      companyId !== undefined &&
      companyId !== -1 &&
      divisionId !== undefined &&
      divisionId !== -1 &&
      jobSiteId !== undefined &&
      jobSiteId !== -1
    )
      loadData().then();
    if (props.entity !== undefined) {
      setSelectedOption({
        value: props.entity.id,
        label: props.entity.name
      });
    }
  }, [companyId]);

  const onChangeHandler = (selectedOption) => {
    props.onChange(selectedOption.value);
    setSelectedOption(selectedOption);
  };

  const loadData = async () => {
    try {
      let url = `${URLConstants.QUESTIONS_URL}?page=1&limit=1000&sort=name&direction=asc`;

      url = `${url}&company_id=${companyId}`;
      url = `${url}&division_id=${divisionId}`;
      url = `${url}&job_site_id=${jobSiteId}`;

      const response = await fetchGET(url);
      if (response.success === true) {
        setItems(response.data);
        if (response.data.length === 0) {
          setSelectedOption({});
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
          return {value: item.id, label: item.name};
        })}
        onChange={onChangeHandler}
        value={selectedOption}
      />
    </>
  );
};

export default QuestionSelect;
