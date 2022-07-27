import React, { useEffect, useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { renderTitleAndContent } from '../../constants/CustomFunction';
import URLConstants from '../../constants/URLConstants';
import { fetchGET } from '../../utils/NetworkUtils';

const ViewManufacturer = () => {
  const [manufacturer, setManufacturer] = useState('');

  const { id } = useParams();

  useEffect(() => {
    // console.log('param is ' + params.id);
    console.log('useEffect ==> ViewManufacturer');
    loadManufacturer();
  }, []);

  const loadManufacturer = async () => {
    try {
      const url = `${URLConstants.GET_MANUFACTURERS_URL}/${id}.json`;

      console.log('getManufacturer url =', url);

      const response = await fetchGET(url);
      setManufacturer(response.data);
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
                &nbsp; Manufacturer Details
              </h3>
              <NavLink to="/private/manufacturers">
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
            {manufacturer && (
              <div className="card-body">
                <dl className="row">
                  {renderTitleAndContent(
                    'Name : ',
                    // eslint-disable-next-line camelcase
                    manufacturer !== null ? manufacturer.name : ''
                  )}
                  {renderTitleAndContent(
                    'Short Desc: ',
                    manufacturer !== null ? manufacturer.short_desc : ''
                  )}
                  {renderTitleAndContent(
                    'Long Desc: ',
                    manufacturer !== null ? manufacturer.long_desc : ''
                  )}
                  {renderTitleAndContent(
                    'Company Name : ',
                    manufacturer.company && manufacturer.company.name
                  )}
                  {renderTitleAndContent(
                    'Division Name : ',
                    manufacturer.division && manufacturer.division.name
                  )}
                  {renderTitleAndContent(
                    'Project Name : ',
                    manufacturer.job_site && manufacturer.job_site.name
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
export default ViewManufacturer;
