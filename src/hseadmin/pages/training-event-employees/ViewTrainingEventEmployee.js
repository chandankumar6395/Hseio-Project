import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { renderTitleAndContent } from '../../constants/CustomFunction';
import URLConstants from '../../constants/URLConstants';
import { fetchGET } from '../../utils/NetworkUtils';
import { toMMMDDYYHHMM } from '../../utils/Utils';

const ViewTrainingEventEmployee = () => {
  const [trainingEventEmployee, setTrainingEventEmployee] = useState('');

  const history = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    // console.log('param is ' + params.id);
    loadTrainingEventEmployee();
  }, []);

  const loadTrainingEventEmployee = async () => {
    try {
      const url = `${URLConstants.GET_TRAINING_EVENT_EMPLOYEE_URL}/${id}.json`;

      console.log('getTrainingEventEmployee url =', url);

      const response = await fetchGET(url);
      setTrainingEventEmployee(response.data);
    } catch (error) {
      toast(error.message || 'Failed');
    }
  };

  const renderPhoto = () => {
    return (
      <>
        {trainingEventEmployee !== null &&
          trainingEventEmployee.primary_photo !== null && (
            // eslint-disable-next-line jsx-a11y/img-redundant-alt
            <img
              src={trainingEventEmployee.primary_photo.url}
              width={100}
              height={100}
              style={{ backgroundColor: '#35363A', padding: '2px' }}
              alt="company logo"
            />
          )}
      </>
    );
  };

  const renderSignature = () => {
    return (
      <>
        {trainingEventEmployee !== null &&
          trainingEventEmployee.signature !== null && (
            // eslint-disable-next-line jsx-a11y/img-redundant-alt
            <img
              src={trainingEventEmployee.signature.url}
              width={100}
              height={100}
              style={{ backgroundColor: '#35363A', padding: '2px' }}
              alt="company logo"
            />
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
                &nbsp; Training Event Employee Details
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

            {trainingEventEmployee && (
              <div className="card-body">
                <dl className="row">
                  {renderTitleAndContent('Photo: ', renderPhoto())}
                  {renderTitleAndContent('Signature: ', renderSignature())}
                  {renderTitleAndContent(
                    'Training Event: ',
                    trainingEventEmployee.training_event !== null
                      ? trainingEventEmployee.training_event.name
                      : ''
                  )}
                  {renderTitleAndContent(
                    'Employee: ',
                    trainingEventEmployee.employee !== null
                      ? `${trainingEventEmployee.employee.user.first_name} ${trainingEventEmployee.employee.user.last_name}`
                      : ''
                  )}
                  {/* {renderTitleAndContent( */}
                  {/*  'User: ', */}
                  {/*  trainingEventEmployee.user !== null */}
                  {/*    ? trainingEventEmployee.user_id */}
                  {/*    : '' */}
                  {/* )} */}

                  {renderTitleAndContent(
                    'Training Course: ',
                    trainingEventEmployee.training_course &&
                      trainingEventEmployee.training_course.name
                  )}
                  {renderTitleAndContent(
                    'Certificate: ',
                    trainingEventEmployee.certificate &&
                      trainingEventEmployee.certificate.name
                  )}

                  {renderTitleAndContent(
                    'Training Event Employee Status: ',
                    trainingEventEmployee.training_event_employee_status !==
                      null
                      ? trainingEventEmployee.training_event_employee_status
                          .name
                      : ''
                  )}
                  {renderTitleAndContent(
                    'Completion Date: ',
                    trainingEventEmployee &&
                      toMMMDDYYHHMM(trainingEventEmployee.completion_date)
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

export default ViewTrainingEventEmployee;
