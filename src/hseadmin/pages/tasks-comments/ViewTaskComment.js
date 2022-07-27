// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { renderTitleAndContent } from '../../constants/CustomFunction';
import URLConstants from '../../constants/URLConstants';
import { fetchGET } from '../../utils/NetworkUtils';

const ViewTaskComment = () => {
  const [taskComment, setTaskComment] = useState(null);

  const history = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    // console.log('param is ' + params.id);
    loadTaskComment();
  }, []);

  const loadTaskComment = async () => {
    try {
      const url = `${URLConstants.GET_TASK_COMMENT_URL}/${id}.json`;

      console.log('getTaskComment url =', url);

      const response = await fetchGET(url);
      setTaskComment(response.data);
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
                &nbsp; Task Comment Details
              </h3>
              <NavLink to="/private/task-comments">
                <Button
                  className="btn-sm"
                  variant="primary"
                  type="button"
                  style={{ float: 'right' }}
                  onClick={() => {
                    history(-1);
                  }}
                >
                  Back
                </Button>
              </NavLink>
            </div>

            <div className="card-body">
              {taskComment && (
                <dl className="row">
                  {renderTitleAndContent(
                    'Notes : ',
                    // eslint-disable-next-line camelcase
                    taskComment !== null ? taskComment.notes : ''
                  )}
                  {renderTitleAndContent(
                    'Task : ',
                    // eslint-disable-next-line camelcase
                    taskComment !== null ? taskComment.task.name : ''
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

export default ViewTaskComment;
