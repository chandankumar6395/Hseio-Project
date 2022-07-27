import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { renderTitleAndContent } from '../../constants/CustomFunction';
import URLConstants from '../../constants/URLConstants';
import { fetchGET } from '../../utils/NetworkUtils';

const ViewTrainingEventEmployeeStatus = () => {
  const history = useNavigate();
  const [trainingEventEmployeeStatus, setTrainingEventEmployeeStatus] =
    useState(null);

  const { id } = useParams();

  useEffect(() => {
    // console.log('param is ' + params.id);
    loadTrainingEventEmployeeStatus();
  }, []);

  const loadTrainingEventEmployeeStatus = async () => {
    try {
      const url = `${URLConstants.GET_TRAINING_EVENT_EMPLOYEE_STATUS_URL}/${id}.json`;

      console.log('getTrainingEventEmployeeStatus url =', url);

      const response = await fetchGET(url);
      setTrainingEventEmployeeStatus(response.data);
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
                &nbsp; Employee Status Details
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
            {trainingEventEmployeeStatus && (
              <div className="card-body">
                <dl className="row">
                  {renderTitleAndContent(
                    'Name : ',
                    trainingEventEmployeeStatus !== null
                      ? trainingEventEmployeeStatus.name
                      : ''
                  )}
                  {renderTitleAndContent(
                    'Short Desc : ',
                    trainingEventEmployeeStatus !== null
                      ? trainingEventEmployeeStatus.short_desc
                      : ''
                  )}
                  {renderTitleAndContent(
                    ' Long Desc : ',
                    trainingEventEmployeeStatus !== null
                      ? trainingEventEmployeeStatus.long_desc
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

export default ViewTrainingEventEmployeeStatus;
