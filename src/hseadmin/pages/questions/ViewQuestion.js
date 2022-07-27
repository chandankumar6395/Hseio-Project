import React, { useEffect, useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { renderTitleAndContent } from '../../constants/CustomFunction';
import URLConstants from '../../constants/URLConstants';
import { fetchGET } from '../../utils/NetworkUtils';

const ViewQuestion = () => {
  const [question, setQuestion] = useState(null);

  const { id } = useParams();

  useEffect(() => {
    loadQuestions();
  }, []);

  const loadQuestions = async () => {
    try {
      const url = `${URLConstants.GET_QUESTION_URL}/${id}.json`;

      console.log('getAuditTaskCategory url =', url);

      const response = await fetchGET(url);
      setQuestion(response.data);
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
                &nbsp; Question Details
              </h3>
              <NavLink to="/private/questions">
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
            {question !== null && (
              <div className="card-body">
                <dl className="row">
                  {renderTitleAndContent('Name: ', question.name)}
                  {renderTitleAndContent(
                    'Company: ',
                    question.company !== null ? question.company.name : ''
                  )}
                  {renderTitleAndContent(
                    'Division: ',
                    question.division !== null ? question.division.name : ''
                  )}
                  {renderTitleAndContent(
                    'Project: ',
                    question.jobSite !== null ? question.job_site.name : ''
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

export default ViewQuestion;
