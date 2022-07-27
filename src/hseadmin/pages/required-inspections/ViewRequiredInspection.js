import React, { useEffect, useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { renderTitleAndContent } from '../../constants/CustomFunction';
import URLConstants from '../../constants/URLConstants';
import { fetchGET } from '../../utils/NetworkUtils';

const ViewRequiredInspection = () => {
  const [requiredInspection, setRequiredInspection] = useState('');

  const { id } = useParams();

  useEffect(() => {
    // console.log('param is ' + params.id);
    console.log('useEffect ==> ViewRequiredInspection');
    loadRequiredInspection();
  }, []);

  const loadRequiredInspection = async () => {
    try {
      const url = `${URLConstants.GET_REQUIRED_INSPECTIONS_URL}/${id}.json`;

      console.log('getRequiredInspection url =', url);

      const response = await fetchGET(url);
      setRequiredInspection(response.data);
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
                &nbsp; Required Inspections Details
              </h3>
              <NavLink to="/private/required-inspections">
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
            {requiredInspection && (
              <div className="card-body">
                <dl className="row">
                  {renderTitleAndContent(
                    'Name : ',
                    // eslint-disable-next-line camelcase
                    requiredInspection !== null ? requiredInspection.name : ''
                  )}
                  {renderTitleAndContent(
                    'Short Desc: ',
                    requiredInspection !== null
                      ? requiredInspection.short_desc
                      : ''
                  )}
                  {renderTitleAndContent(
                    'Long Desc: ',
                    requiredInspection !== null
                      ? requiredInspection.long_desc
                      : ''
                  )}
                  {renderTitleAndContent(
                    'Company Name : ',
                    requiredInspection.company &&
                      requiredInspection.company.name
                  )}
                  {renderTitleAndContent(
                    'Division Name : ',
                    requiredInspection.division &&
                      requiredInspection.division.name
                  )}
                  {renderTitleAndContent(
                    'Project Name : ',
                    requiredInspection.job_site &&
                      requiredInspection.job_site.name
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
export default ViewRequiredInspection;
