import React, { useEffect } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'react-bootstrap';
import { renderTitleAndContent } from '../../constants/CustomFunction';
import { getAddress } from '../../store/actions/addresses';

const ViewAddress = () => {
  // const history = useNavigate();

  const dispatch = useDispatch();

  const address = useSelector((state) => state.address.address);

  // const params = useParams();
  const { id } = useParams();

  useEffect(() => {
    // console.log('param is ' + params.id);
    loadAddress();
  }, []);

  const loadAddress = async () => {
    await dispatch(getAddress(id));
  };

  return (
    <>
      <div className="row">
        <div className="col-md-12">
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">
                <i className="fas fa-text-width" />
                &nbsp; Address Details
              </h3>
              <NavLink to="/private/addresses">
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

            <div className="card-body">
              <dl className="row">
                {renderTitleAndContent(
                  'Name: ',
                  address !== null ? address.name : ''
                )}
                {renderTitleAndContent(
                  'Address: ',
                  address !== null ? address.address1 : ''
                )}
                {renderTitleAndContent(
                  'Address2: ',
                  address !== null ? address.address2 : ''
                )}
                {renderTitleAndContent(
                  'Zip: ',
                  address !== null ? address.zipcode : ''
                )}
                {renderTitleAndContent(
                  'City: ',
                  address !== null ? address.city_name : ''
                )}
                {renderTitleAndContent(
                  'Country: ',
                  address !== null ? address.country_name : ''
                )}
                {renderTitleAndContent(
                  'State: ',
                  address !== null ? address.state_name : ''
                )}
                {renderTitleAndContent(
                  'Latitude: ',
                  address !== null ? address.latitude : ''
                )}
                {renderTitleAndContent(
                  'Longitude: ',
                  address !== null ? address.longitude : ''
                )}
              </dl>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewAddress;
