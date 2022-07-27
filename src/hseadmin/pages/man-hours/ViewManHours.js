import React, { useEffect, useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { renderTitleAndContent } from '../../constants/CustomFunction';
import URLConstants from '../../constants/URLConstants';
import { fetchGET } from '../../utils/NetworkUtils';

const ViewManHours = () => {
  const [manHours, setManHours] = useState('');

  const { id } = useParams();

  useEffect(() => {
    // console.log('param is ' + params.id);
    console.log('useEffect ==> ViewManHours');
    loadManHours();
  }, []);

  const loadManHours = async () => {
    try {
      const url = `${URLConstants.GET_MAN_HOURS_URL}/${id}.json`;

      console.log('getManHours url =', url);

      const response = await fetchGET(url);
      setManHours(response.data);
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
                &nbsp; Man Hours Details
              </h3>
              <NavLink to="/private/man-Hours">
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
            {manHours && (
              <div className="card-body">
                <dl className="row">
                  {renderTitleAndContent(
                    'Years : ',
                    // eslint-disable-next-line camelcase
                    manHours !== null ? manHours.year : ''
                  )}
                  {renderTitleAndContent(
                    'Month: ',
                    manHours !== null ? manHours.month : ''
                  )}
                  {renderTitleAndContent(
                    'Hours Value: ',
                    manHours !== null ? manHours.hours_value : ''
                  )}
                  {renderTitleAndContent(
                    'Company Name : ',
                    manHours.company && manHours.company.name
                  )}
                  {renderTitleAndContent(
                    'Division Name : ',
                    manHours.division && manHours.division.name
                  )}
                  {renderTitleAndContent(
                    'Project Name : ',
                    manHours.job_site && manHours.job_site.name
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
export default ViewManHours;
