import React, { useEffect, useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { renderTitleAndContent } from '../../constants/CustomFunction';
import URLConstants from '../../constants/URLConstants';
import { fetchGET } from '../../utils/NetworkUtils';

const ViewDesignation = () => {
  const [designation, setDesignation] = useState('');

  const { id } = useParams();

  useEffect(() => {
    // console.log('param is ' + params.id);
    console.log('useEffect ==> ViewDesignation');
    loadDesignation();
  }, []);

  const loadDesignation = async () => {
    try {
      const url = `${URLConstants.GET_DESIGNATION_URL}/${id}.json`;

      console.log('getDesignation url =', url);

      const response = await fetchGET(url);
      setDesignation(response.data);
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
                &nbsp; Designation Details
              </h3>
              <NavLink to="/private/designations">
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
            {designation && (
              <div className="card-body">
                <dl className="row">
                  {renderTitleAndContent(
                    'Name : ',
                    // eslint-disable-next-line camelcase
                    designation !== null ? designation.name : ''
                  )}
                  {renderTitleAndContent(
                    'Short Desc: ',
                    designation !== null ? designation.short_desc : ''
                  )}
                  {renderTitleAndContent(
                    'Long Desc: ',
                    designation !== null ? designation.long_desc : ''
                  )}
                  {renderTitleAndContent(
                    'Company Name : ',
                    designation.company && designation.company.name
                  )}
                  {renderTitleAndContent(
                    'Division Name : ',
                    designation.division && designation.division.name
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
export default ViewDesignation;
