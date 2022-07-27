import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Select from 'react-select';
import { useParams } from 'react-router-dom';
import { fetchGET } from '../../utils/NetworkUtils';
import URLConstants from '../../constants/URLConstants';

const TaskListSelect = (props) => {
  const { entity, onChange } = props;
  const [taskList, settaskList] = useState([]);
  const [selectedOption, setSeletedOption] = useState(null);
  const { id } = useParams();
  useEffect(() => {
    loadData().then();
    if (entity !== undefined && entity !== null) {
      setSeletedOption({
        value: entity.id,
        label: entity.notes,
      });
    }
  }, []);

  const onTaskListIdChangeHandler = (selectedOption) => {
    console.log(`TaskListSelect = ${selectedOption.value}`);
    onChange(selectedOption.value);
    setSeletedOption(selectedOption);
  };

  const loadData = async () => {
    try {
      const url = `${URLConstants.AUDIT_TASKS_URL}?audit_type_id=${id}`;
      const response = await fetchGET(url);
      if (response.success === true) {
        settaskList(response.data);
      }
    } catch (error) {
      toast(error.message || 'Failed');
    }
  };

  return (
    <>
      <Select
        required
        options={taskList.map((taskList) => {
          return { value: taskList.id, label: taskList.name };
        })}
        onChange={onTaskListIdChangeHandler}
        value={selectedOption}
      />
    </>
  );
};

export default TaskListSelect;
