// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilePdf } from '@fortawesome/free-regular-svg-icons';
import { renderTitleAndContent } from '../../constants/CustomFunction';
import { fetchGET } from '../../utils/NetworkUtils';
import URLConstants from '../../constants/URLConstants';

const ViewTaskCommentDocument = () => {
  const history = useNavigate();

  const [taskCommentDocument, setTaskCommentDocument] = useState(null);

  const { id } = useParams();

  useEffect(() => {
    // console.log('param is ' + params.id);
    loadTaskCommentDocument();
  }, []);

  const loadTaskCommentDocument = async () => {
    try {
      const response = await fetchGET(
        `${URLConstants.GET_TASK_COMMENT_DOCUMENT_URL}/${id}.json`
      );
      setTaskCommentDocument(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const renderDocument = () => {
    return (
      <>
        {taskCommentDocument !== null && taskCommentDocument.document !== null && (
          // eslint-disable-next-line jsx-a11y/img-redundant-alt
          <p>
            <a
              href={taskCommentDocument.document.url}
              target="_blank"
              rel="noreferrer"
            >
              <FontAwesomeIcon icon={faFilePdf} size="3x" />{' '}
              {taskCommentDocument.document.name}
            </a>
          </p>
        )}
      </>
    );
  };

  return (
    <>
      <div className="row">
        <div className="col-md-12">
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">
                <i className="fas fa-text-width" />
                &nbsp; Task Comment Document Details
              </h3>
              <NavLink to="/private/task-comment-documents">
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
              {taskCommentDocument !== null && (
                <dl className="row">
                  {renderTitleAndContent(
                    'Task Comment: ',
                    // eslint-disable-next-line camelcase
                    taskCommentDocument.task_comment !== null
                      ? taskCommentDocument.task_comment.notes
                      : ''
                  )}
                  {renderTitleAndContent('Document: ', renderDocument())}
                </dl>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewTaskCommentDocument;
