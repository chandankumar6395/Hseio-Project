import React, { useEffect, useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { renderTitleAndContent } from '../../constants/CustomFunction';
import URLConstants from '../../constants/URLConstants';
import { fetchGET } from '../../utils/NetworkUtils';

const ViewContactPeople = () => {
  const [contactPeople, setContactPeople] = useState('');

  const { id } = useParams();

  useEffect(() => {
    // console.log('param is ' + params.id);
    console.log('useEffect ==> ViewContactPeople');
    loadContactPeople();
  }, []);

  const loadContactPeople = async () => {
    try {
      const url = `${URLConstants.GET_CONTACT_PEOPLE_URL}/${id}.json`;

      console.log('getContactPeople url =', url);

      const response = await fetchGET(url);
      setContactPeople(response.data);
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
                &nbsp; Contact Peoples Details
              </h3>
              <NavLink to="/private/contact-peoples">
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
            {contactPeople && (
              <div className="card-body">
                <dl className="row">
                  {renderTitleAndContent(
                    'First Name : ',
                    // eslint-disable-next-line camelcase
                    contactPeople !== null ? contactPeople.first_name : ''
                  )}
                  {renderTitleAndContent(
                    'Last Name: ',
                    contactPeople !== null ? contactPeople.last_name : ''
                  )}
                  {renderTitleAndContent(
                    'Email Address: ',
                    contactPeople !== null ? contactPeople.email_address : ''
                  )}
                  {renderTitleAndContent(
                    'Landline: ',
                    contactPeople !== null ? contactPeople.landline : ''
                  )}
                  {renderTitleAndContent(
                    'Mobile: ',
                    contactPeople !== null ? contactPeople.mobile : ''
                  )}
                  {renderTitleAndContent(
                    'Designation Name: ',
                    contactPeople !== null ? contactPeople.designation_name : ''
                  )}
                  {renderTitleAndContent(
                    'Notes: ',
                    contactPeople !== null ? contactPeople.notes : ''
                  )}
                  {renderTitleAndContent(
                    'Status :',
                    contactPeople !== null ? contactPeople.status.name : ''
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
export default ViewContactPeople;
