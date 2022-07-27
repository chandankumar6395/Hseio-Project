// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { renderTitleAndContent } from '../../constants/CustomFunction';
import URLConstants from '../../constants/URLConstants';
import { fetchGET } from '../../utils/NetworkUtils';
import { STATUSES_DATA } from '../../constants/Constants';
import { toMMMDDYYHHMM } from '../../utils/Utils';

const ViewTaskUser = () => {
  const [taskUser, setTaskUser] = useState('');
  const history = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    // console.log('param is ' + params.id);
    loadTaskUser();
  }, []);

  const loadTaskUser = async () => {
    try {
      const url = `${URLConstants.GET_TASK_USER_URL}/${id}.json`;

      console.log('getTaskUser url =', url);

      const response = await fetchGET(url);
      setTaskUser(response.data);
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
                &nbsp; Task User Details
              </h3>
              <>
                <Button
                  className="btn-sm"
                  variant="primary"
                  type="button"
                  style={{
                    float: 'right',
                  }}
                  onClick={() => {
                    history(-1);
                  }}
                >
                  Back
                </Button>
              </>
            </div>

            <div className="card-body">
              {taskUser && (
                <dl className="row">
                  {renderTitleAndContent(
                    'Task: ',
                    // eslint-disable-next-line camelcase
                    taskUser.task !== null ? taskUser.task.name : ''
                  )}
                  {renderTitleAndContent(
                    'User Name: ',
                    // eslint-disable-next-line camelcase
                    taskUser !== null
                      ? `${taskUser.user.first_name} ${taskUser.user.last_name}`
                      : ''
                  )}
                  {renderTitleAndContent(
                    'Status: ',

                    STATUSES_DATA.find((x) => x.id === taskUser.status_id).name
                  )}
                  {renderTitleAndContent(
                    'Project Crew: ',
                    // eslint-disable-next-line camelcase
                    taskUser.job_site_crew !== null
                      ? taskUser.job_site_crew.name
                      : ''
                  )}
                  {renderTitleAndContent(
                    'Start Date Time: ',
                    // eslint-disable-next-line camelcase
                    taskUser !== null
                      ? toMMMDDYYHHMM(taskUser.start_date_time)
                      : ''
                  )}
                  {renderTitleAndContent(
                    'Start Date Time: ',
                    // eslint-disable-next-line camelcase
                    taskUser !== null
                      ? toMMMDDYYHHMM(taskUser.end_date_time)
                      : ''
                  )}
                  {renderTitleAndContent(
                    'Completed Date Time: ',
                    // eslint-disable-next-line camelcase
                    taskUser !== null
                      ? toMMMDDYYHHMM(taskUser.completed_date_time)
                      : ''
                  )}
                </dl>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewTaskUser;
