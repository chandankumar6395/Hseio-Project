import React, { useEffect } from 'react';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'react-bootstrap';
import { getJobSiteCrewMember } from '../../store/actions/job_site_crew_members';
import { renderTitleAndContent } from '../../constants/CustomFunction';

const ViewJobSiteCrewMember = () => {
  const dispatch = useDispatch();
  const history = useNavigate();

  const jobSiteCrewMember = useSelector(
    (state) => state.jobSiteCrewMember.jobSiteCrewMember
  );

  const { id } = useParams();

  useEffect(() => {
    // console.log('param is ' + params.id);
    loadJobSiteCrewMembers();
  }, []);

  const loadJobSiteCrewMembers = async () => {
    await dispatch(getJobSiteCrewMember(id));
  };

  return (
    <>
      <div className="row">
        <div className="col-md-12">
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">
                <i className="fas fa-text-width" />
                &nbsp; Project Crew Member Details
              </h3>
              <NavLink to="/private/job-site-crew-members">
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
            {jobSiteCrewMember && (
              <div className="card-body">
                <dl className="row">
                  {renderTitleAndContent(
                    'JobSiteCrew Name: ',
                    // eslint-disable-next-line camelcase
                    jobSiteCrewMember !== null
                      ? jobSiteCrewMember.job_site_crew.name
                      : ''
                  )}
                  {renderTitleAndContent(
                    'Project Name: ',
                    // eslint-disable-next-line camelcase
                    jobSiteCrewMember !== null
                      ? jobSiteCrewMember.job_site.name
                      : ''
                  )}
                  {renderTitleAndContent(
                    'Employee Name: ',
                    // eslint-disable-next-line camelcase
                    jobSiteCrewMember !== null
                      ? `${jobSiteCrewMember.employee.user.first_name} ${jobSiteCrewMember.employee.user.last_name}`
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

export default ViewJobSiteCrewMember;
