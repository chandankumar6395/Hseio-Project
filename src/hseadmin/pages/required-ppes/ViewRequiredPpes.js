import React, { useEffect, useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { renderTitleAndContent } from '../../constants/CustomFunction';
import URLConstants from '../../constants/URLConstants';
import { fetchGET } from '../../utils/NetworkUtils';

const ViewRequiredPpes = () => {
  const [requiredPpes, setRequiredPpes] = useState('');

  const { id } = useParams();

  useEffect(() => {
    // console.log('param is ' + params.id);
    console.log('useEffect ==> ViewRequiredPpes');
    loadRequiredPpes();
  }, []);

  const loadRequiredPpes = async () => {
    try {
      const url = `${URLConstants.GET_REQUIRED_PPES_URL}/${id}.json`;

      console.log('getRequiredPpes url =', url);

      const response = await fetchGET(url);
      setRequiredPpes(response.data);
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
                &nbsp; Required Ppes Details
              </h3>
              <NavLink to="/private/required-ppes">
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
            {requiredPpes && (
              <div className="card-body">
                <dl className="row">
                  {renderTitleAndContent(
                    'Name : ',
                    // eslint-disable-next-line camelcase
                    requiredPpes !== null ? requiredPpes.name : ''
                  )}
                  {renderTitleAndContent(
                    'Short Desc: ',
                    requiredPpes !== null ? requiredPpes.short_desc : ''
                  )}
                  {renderTitleAndContent(
                    'Long Desc: ',
                    requiredPpes !== null ? requiredPpes.long_desc : ''
                  )}
                  {renderTitleAndContent(
                    'Company Name : ',
                    requiredPpes.company && requiredPpes.company.name
                  )}
                  {renderTitleAndContent(
                    'Division Name : ',
                    requiredPpes.division && requiredPpes.division.name
                  )}
                  {renderTitleAndContent(
                    'Project Name : ',
                    requiredPpes.job_site && requiredPpes.job_site.name
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
export default ViewRequiredPpes;
