import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { renderTitleAndContent } from '../../constants/CustomFunction';
import URLConstants from '../../constants/URLConstants';
import { fetchGET } from '../../utils/NetworkUtils';

const ViewAnswer = () => {
  const [answer, setAnswer] = useState(null);

  const history = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    // console.log('param is ' + params.id);
    console.log('useEffect ==> ViewAnswer');
    loadAnswer();
  }, []);

  const loadAnswer = async () => {
    try {
      const url = `${URLConstants.GET_ANSWER_URL}/${id}.json`;

      console.log('getAnswer url =', url);

      const response = await fetchGET(url);
      setAnswer(response.data);
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
                &nbsp; Answer Details
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
              <dl className="row">
                {renderTitleAndContent(
                  'Name: ',
                  answer !== null ? answer.name : ''
                )}
                {renderTitleAndContent(
                  'Question: ',
                  answer !== null ? answer.question.name : ''
                )}
                {renderTitleAndContent(
                  'Label: ',
                  answer !== null ? answer.label : ''
                )}
                {renderTitleAndContent(
                  'Value: ',
                  answer !== null ? answer.value : ''
                )}
                {renderTitleAndContent(
                  'Correct Value: ',
                  answer !== null ? answer.correct_value : ''
                )}
              </dl>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewAnswer;
