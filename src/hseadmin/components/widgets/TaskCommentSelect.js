import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Select from 'react-select';
import { fetchGET } from '../../utils/NetworkUtils';
import URLConstants from '../../constants/URLConstants';

const TaskCommentSelect = (props) => {
  const { entity, onChange } = props;
  const [taskComments, setTaskComments] = useState([]);
  const [selectedOption, setSeletedOption] = useState(null);
  useEffect(() => {
    loadData().then();
    if (entity !== undefined && entity !== null) {
      setSeletedOption({
        value: entity.id,
        label: entity.notes,
      });
    }
  }, []);

  const onTaskCommentIdChangeHandler = (selectedOption) => {
    console.log(`TaskCommentSelect = ${selectedOption.value}`);
    onChange(selectedOption.value);
    setSeletedOption(selectedOption);
  };

  const loadData = async () => {
    try {
      const url = `${URLConstants.TASK_COMMENTS_URL}?page=1&limit=1000`;
      const response = await fetchGET(url);
      if (response.success === true) {
        setTaskComments(response.data);
      }
    } catch (error) {
      toast(error.message || 'Failed');
    }
  };

  return (
    <>
      <Select
        required
        options={taskComments.map((taskComment) => {
          return { value: taskComment.id, label: taskComment.notes };
        })}
        onChange={onTaskCommentIdChangeHandler}
        value={selectedOption}
      />
    </>
  );
};

export default TaskCommentSelect;
