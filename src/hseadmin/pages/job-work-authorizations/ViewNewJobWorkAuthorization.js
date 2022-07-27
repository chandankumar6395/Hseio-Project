import React, { useEffect, useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { renderTitleAndContent } from '../../constants/CustomFunction';
import URLConstants from '../../constants/URLConstants';
import { fetchGET } from '../../utils/NetworkUtils';

const ViewNewJobWorkAuthorization = () => {
  const [jobWorkAuthorization, setJobWorkAuthorization] = useState('');

  const { id } = useParams();

  useEffect(() => {
    // console.log('param is ' + params.id);
    console.log('useEffect ==> ViewNewJobWorkAuthorization');
    loadJobWorkAuthorizations();
  }, []);

  const loadJobWorkAuthorizations = async () => {
    try {
      const url = `${URLConstants.GET_JOB_WORK_AUTHORIZATION_URL}/${id}.json`;

      console.log('getJobWorkAuthorizations url =', url);

      const response = await fetchGET(url);
      setJobWorkAuthorization(response.data);
    } catch (error) {
      toast(error.message || 'Failed');
    }
  };
  const renderSignature = () => {
    return (
      <>
        {jobWorkAuthorization !== null &&
          jobWorkAuthorization.signature !== null && (
            // eslint-disable-next-line jsx-a11y/img-redundant-alt
            <img
              src={jobWorkAuthorization.signature.url}
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
                &nbsp; Equipments Details
              </h3>
              <NavLink to="/private/job-work-authorizations">
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
            {jobWorkAuthorization && (
              <div className="card-body">
                <dl className="row">
                  {renderTitleAndContent(
                    'Name : ',
                    // eslint-disable-next-line camelcase
                    jobWorkAuthorization !== null
                      ? jobWorkAuthorization.name
                      : ''
                  )}
                  {renderTitleAndContent('Signature: ', renderSignature())}
                  {renderTitleAndContent(
                    'Job Id: ',
                    jobWorkAuthorization.job !== null
                      ? jobWorkAuthorization.job.name
                      : ''
                  )}
                  {renderTitleAndContent(
                    'Employee: ',
                    jobWorkAuthorization !== null
                      ? `${jobWorkAuthorization.employee.user.user.first_name} ${jobWorkAuthorization.employee.user.user.first_name}`
                      : ''
                  )}

                  {renderTitleAndContent(
                    'Company Id: ',
                    jobWorkAuthorization.company !== null
                      ? jobWorkAuthorization.company.name
                      : ''
                  )}
                  {renderTitleAndContent(
                    'Division Id: ',
                    jobWorkAuthorization.division !== null
                      ? jobWorkAuthorization.division.name
                      : ''
                  )}
                  {renderTitleAndContent(
                    'Project Id: ',
                    jobWorkAuthorization.job_site !== null
                      ? jobWorkAuthorization.job_site.name
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
export default ViewNewJobWorkAuthorization;
