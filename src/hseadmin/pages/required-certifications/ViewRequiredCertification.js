import React, { useEffect, useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { renderTitleAndContent } from '../../constants/CustomFunction';
import URLConstants from '../../constants/URLConstants';
import { fetchGET } from '../../utils/NetworkUtils';

const ViewRequiredCertification = () => {
  const [requiredCertification, setRequiredCertification] = useState('');

  const { id } = useParams();

  useEffect(() => {
    // console.log('param is ' + params.id);
    console.log('useEffect ==> ViewRequiredCertification');
    loadRequiredCertification();
  }, []);

  const loadRequiredCertification = async () => {
    try {
      const url = `${URLConstants.GET_REQUIRED_CERTIFICATION_URL}/${id}.json`;

      console.log('getRequiredCertification url =', url);

      const response = await fetchGET(url);
      setRequiredCertification(response.data);
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
                &nbsp; Required Certification Details
              </h3>
              <NavLink to="/private/required-certifications">
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
            {requiredCertification && (
              <div className="card-body">
                <dl className="row">
                  {renderTitleAndContent(
                    'Name : ',
                    // eslint-disable-next-line camelcase
                    requiredCertification !== null
                      ? requiredCertification.name
                      : ''
                  )}
                  {renderTitleAndContent(
                    'Short Desc: ',
                    requiredCertification !== null
                      ? requiredCertification.short_desc
                      : ''
                  )}
                  {renderTitleAndContent(
                    'Long Desc: ',
                    requiredCertification !== null
                      ? requiredCertification.long_desc
                      : ''
                  )}
                  {renderTitleAndContent(
                    'Company Name : ',
                    requiredCertification.company &&
                      requiredCertification.company.name
                  )}
                  {renderTitleAndContent(
                    'Division Name : ',
                    requiredCertification.division &&
                      requiredCertification.division.name
                  )}
                  {renderTitleAndContent(
                    'Project Name : ',
                    requiredCertification.job_site &&
                      requiredCertification.job_site.name
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
export default ViewRequiredCertification;
