import React, { useEffect, useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { renderTitleAndContent } from '../../constants/CustomFunction';
import URLConstants from '../../constants/URLConstants';
import { fetchGET } from '../../utils/NetworkUtils';
import { toast } from 'react-toastify';

const ViewTasksManagers = () => {
  const [tasksManager, setTasksManager] = useState(null);

  const { id } = useParams();

  useEffect(() => {
    // console.log('param is ' + params.id);
    console.log('useEffect ==> ViewTasksManagers');
    loadTasksManagers();
  }, []);

  const loadTasksManagers = async () => {
    try {
      const url = `${URLConstants.GET_TASKS_MANAGER_URL}/${id}.json`;

      console.log('getTasksManagers url =', url);

      const response = await fetchGET(url);
      setTasksManager(response.data);
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
                &nbsp; Audit Tasks Managers Details
              </h3>
              <NavLink to="/tasks-managers">
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
            {tasksManager && (
              <div className="card-body">
                <dl className="row">
                  {renderTitleAndContent('Task Id : ', tasksManager.task.name)}
                  {renderTitleAndContent(
                    'Manager Id : ',
                    tasksManager.manager_id
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
export default ViewTasksManagers;
