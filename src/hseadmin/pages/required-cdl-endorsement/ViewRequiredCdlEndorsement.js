import React, { useEffect, useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { renderTitleAndContent } from '../../constants/CustomFunction';
import URLConstants from '../../constants/URLConstants';
import { fetchGET } from '../../utils/NetworkUtils';

const ViewRequiredCdlEndorsement = () => {
  const [requiredCdlEndorsement, setRequiredCdlEndorsement] = useState('');

  const { id } = useParams();

  useEffect(() => {
    // console.log('param is ' + params.id);
    console.log('useEffect ==> ViewIncident');
    loadRequiredCdlEndorsement();
  }, []);

  const loadRequiredCdlEndorsement = async () => {
    try {
      const url = `${URLConstants.GET_REQUIRED_CDL_ENDORSEMENT_URL}/${id}.json`;

      console.log('getRequiredCdlEndorsement url =', url);

      const response = await fetchGET(url);
      setRequiredCdlEndorsement(response.data);
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
                &nbsp; Required Cdl Endorsement Details
              </h3>
              <NavLink to="/private/required-cdl-endorsements">
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
            {requiredCdlEndorsement && (
              <div className="card-body">
                <dl className="row">
                  {renderTitleAndContent(
                    'Name : ',
                    // eslint-disable-next-line camelcase
                    requiredCdlEndorsement !== null
                      ? requiredCdlEndorsement.name
                      : ''
                  )}
                  {renderTitleAndContent(
                    'Short Desc: ',
                    requiredCdlEndorsement !== null
                      ? requiredCdlEndorsement.short_desc
                      : ''
                  )}
                  {renderTitleAndContent(
                    'Long Desc: ',
                    requiredCdlEndorsement !== null
                      ? requiredCdlEndorsement.long_desc
                      : ''
                  )}
                  {renderTitleAndContent(
                    'Company Name : ',
                    requiredCdlEndorsement.company &&
                      requiredCdlEndorsement.company.name
                  )}
                  {renderTitleAndContent(
                    'Division Name : ',
                    requiredCdlEndorsement.division &&
                      requiredCdlEndorsement.division.name
                  )}
                  {renderTitleAndContent(
                    'Project Name : ',
                    requiredCdlEndorsement.job_site &&
                      requiredCdlEndorsement.job_site.name
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
export default ViewRequiredCdlEndorsement;
