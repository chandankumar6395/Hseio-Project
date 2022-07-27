import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { renderTitleAndContent } from '../../constants/CustomFunction';
import URLConstants from '../../constants/URLConstants';
import { fetchGET } from '../../utils/NetworkUtils';

const ViewTrainingEventStatus = () => {
  const history = useNavigate();
  const [trainingEventStatus, setTrainingEventStatus] = useState(null);

  const { id } = useParams();

  useEffect(() => {
    // console.log('param is ' + params.id);
    loadTrainingEventStatus();
  }, []);

  const loadTrainingEventStatus = async () => {
    try {
      const url = `${URLConstants.GET_TRAINING_EVENT_STATUS_URL}/${id}.json`;

      console.log('getTrainingEventStatus url =', url);

      const response = await fetchGET(url);
      setTrainingEventStatus(response.data);
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
                &nbsp; Training Event Status Details
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
            {trainingEventStatus && (
              <div className="card-body">
                <dl className="row">
                  {renderTitleAndContent(
                    'Name : ',
                    trainingEventStatus !== null ? trainingEventStatus.name : ''
                  )}
                  {renderTitleAndContent(
                    'Short Desc : ',
                    trainingEventStatus !== null
                      ? trainingEventStatus.short_desc
                      : ''
                  )}
                  {renderTitleAndContent(
                    ' Long Desc : ',
                    trainingEventStatus !== null
                      ? trainingEventStatus.long_desc
                      : ''
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

export default ViewTrainingEventStatus;
