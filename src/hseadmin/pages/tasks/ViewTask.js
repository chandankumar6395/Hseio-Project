import React, { useEffect, useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { renderTitleAndContent } from '../../constants/CustomFunction';
import URLConstants from '../../constants/URLConstants';
import { fetchGET } from '../../utils/NetworkUtils';
import { toMMMDDYYHHMM } from '../../utils/Utils';

const ViewTask = () => {
  const [task, setTask] = useState('');

  const { id } = useParams();

  useEffect(() => {
    // console.log('param is ' + params.id);
    // console.log('useEffect ==> ViewTask');
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      const url = `${URLConstants.GET_TASK_URL}/${id}.json`;

      console.log('getTask url =', url);

      const response = await fetchGET(url);
      setTask(response.data);
    } catch (error) {
      toast(error.message || 'Failed');
    }
  };

  return (
    <>
      <div className="row">
        <div className="col-md-12">
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">
                <i className="fas fa-text-width" />
                &nbsp; Task Details
              </h3>
              <NavLink to="/private/tasks">
                <Button
                  className="btn-sm"
                  variant="primary"
                  type="button"
                  style={{ float: 'right' }}
                >
                  Back
                </Button>
              </NavLink>
            </div>
            {task && (
              <div className="card-body">
                <dl className="row">
                  {renderTitleAndContent('Name : ', task.name)}
                  {renderTitleAndContent('Description: ', task.long_desc)}
                  {renderTitleAndContent('Short Desc: ', task.short_desc)}
                  {renderTitleAndContent('Priority : ', task.priority)}
                  {renderTitleAndContent(
                    'Start Date Time: ',
                    task.start_date_time !== null
                      ? toMMMDDYYHHMM(task.start_date_time)
                      : ''
                  )}
                  {renderTitleAndContent(
                    'End Date Time: ',
                    task.end_date_time !== null
                      ? toMMMDDYYHHMM(task.end_date_time)
                      : ''
                  )}
                  {renderTitleAndContent('Manpower: ', task.manpower)}
                  {renderTitleAndContent('Cost: ', task.cost)}
                  {renderTitleAndContent('Parent Id: ', task.parent_id)}
                  {renderTitleAndContent(
                    'Completed Date time: ',
                    task.completed_date_time !== null
                      ? toMMMDDYYHHMM(task.completed_date_time)
                      : ''
                  )}
                  {renderTitleAndContent(
                    'Industry: ',
                    task.industry !== null ? task.industry.name : ''
                  )}
                  {renderTitleAndContent(
                    'Company: ',
                    task.company !== null ? task.company.name : ''
                  )}
                  {renderTitleAndContent(
                    'Division: ',
                    task.division !== null ? task.division.name : ''
                  )}
                  {renderTitleAndContent(
                    'Project: ',
                    task.job_site !== null ? task.job_site.name : ''
                  )}
                </dl>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
export default ViewTask;
