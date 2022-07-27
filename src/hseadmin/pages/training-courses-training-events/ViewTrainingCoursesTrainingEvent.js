import React, { useEffect, useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { renderTitleAndContent } from '../../constants/CustomFunction';
import URLConstants from '../../constants/URLConstants';
import { fetchGET } from '../../utils/NetworkUtils';

const ViewAuditReportAnswer = () => {
  const [trainingCoursesTrainingEvent, setTrainingCoursesTrainingEvent] =
    useState(null);

  const { id } = useParams();

  useEffect(() => {
    // console.log('param is ' + params.id);
    console.log('useEffect ==> ViewTrainingCoursesTrainingEvents');
    loadTrainingCoursesTrainingEvent();
  }, []);

  const loadTrainingCoursesTrainingEvent = async () => {
    try {
      const url = `${URLConstants.GET_TRAINING_COURSES_TRAINING_EVENT_URL}/${id}.json`;

      console.log('getTrainingCoursesTrainingEvent url =', url);

      const response = await fetchGET(url);
      setTrainingCoursesTrainingEvent(response.data);
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
                &nbsp; Training Courses Training Event Details
              </h3>
              <NavLink to="/training-courses-training-events">
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
            {trainingCoursesTrainingEvent !== null && (
              <div className="card-body">
                <dl className="row">
                  {renderTitleAndContent(
                    'Audit Report Name : ',
                    // eslint-disable-next-line camelcase
                    trainingCoursesTrainingEvent.training_course !== null
                      ? trainingCoursesTrainingEvent.training_course.name
                      : ''
                  )}
                  {renderTitleAndContent(
                    'Question Name : ',
                    // eslint-disable-next-line camelcase
                    trainingCoursesTrainingEvent.training_event !== null
                      ? trainingCoursesTrainingEvent.training_event.name
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
export default ViewAuditReportAnswer;
