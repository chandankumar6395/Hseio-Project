import React, { useEffect } from 'react';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'react-bootstrap';
import { renderTitleAndContent } from '../../constants/CustomFunction';
import { getJobSiteCrew } from '../../store/actions/jobSiteCrews';

const ViewJobSiteCrew = () => {
  const dispatch = useDispatch();
  const history = useNavigate();

  const jobSiteCrew = useSelector((state) => state.jobSiteCrew.jobSiteCrew);

  const { id } = useParams();

  useEffect(() => {
    // console.log('param is ' + params.id);
    loadJobSiteCrew();
  }, []);

  const loadJobSiteCrew = async () => {
    await dispatch(getJobSiteCrew(id));
  };

  return (
    <>
      <div className="row">
        <div className="col-md-12">
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">
                <i className="fas fa-text-width" />
                &nbsp; Project Crew Details
              </h3>
              <NavLink to="private/job-site-crews">
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
              <dl className="row">
                {renderTitleAndContent(
                  'Name: ',
                  // eslint-disable-next-line camelcase
                  jobSiteCrew !== null ? jobSiteCrew.name : ''
                )}
                {renderTitleAndContent(
                  'Short Desc: ',
                  // eslint-disable-next-line camelcase
                  jobSiteCrew !== null ? jobSiteCrew.short_desc : ''
                )}
                {renderTitleAndContent(
                  'Long Desc: ',
                  // eslint-disable-next-line camelcase
                  jobSiteCrew !== null ? jobSiteCrew.long_desc : ''
                )}
                {renderTitleAndContent(
                  'Project Id: ',
                  // eslint-disable-next-line camelcase
                  jobSiteCrew !== null ? jobSiteCrew.job_site_id : ''
                )}
              </dl>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewJobSiteCrew;
