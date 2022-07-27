import React, { useEffect, useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { renderTitleAndContent } from '../../constants/CustomFunction';
import URLConstants from '../../constants/URLConstants';
import { fetchGET } from '../../utils/NetworkUtils';

const ViewInjuryClass = () => {
  const [injuryClass, setInjuryClass] = useState('');

  const { id } = useParams();

  useEffect(() => {
    // console.log('param is ' + params.id);
    console.log('useEffect ==> ViewEquipment');
    loadInjuryClass();
  }, []);

  const loadInjuryClass = async () => {
    try {
      const url = `${URLConstants.GET_INJURY_CLASS_URL}/${id}.json`;

      console.log('getInjuryClass url =', url);

      const response = await fetchGET(url);
      setInjuryClass(response.data);
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
                &nbsp; Injury Classes Details
              </h3>
              <NavLink to="/private/injury-classes">
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
            {injuryClass && (
              <div className="card-body">
                <dl className="row">
                  {renderTitleAndContent(
                    'Name : ',
                    // eslint-disable-next-line camelcase
                    injuryClass !== null ? injuryClass.name : ''
                  )}
                  {renderTitleAndContent(
                    'Short Desc: ',
                    injuryClass !== null ? injuryClass.short_desc : ''
                  )}
                  {renderTitleAndContent(
                    'Long Desc: ',
                    injuryClass !== null ? injuryClass.long_desc : ''
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
export default ViewInjuryClass;
