import React, { useEffect, useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { renderTitleAndContent } from '../../constants/CustomFunction';
import URLConstants from '../../constants/URLConstants';
import { fetchGET } from '../../utils/NetworkUtils';

const ViewEquipmentDesignation = () => {
  const [equipmentDesignation, setEquipmentDesignation] = useState('');

  const { id } = useParams();

  useEffect(() => {
    // console.log('param is ' + params.id);
    console.log('useEffect ==> ViewEquipmentDesignation');
    loadEquipmentDesignation();
  }, []);

  const loadEquipmentDesignation = async () => {
    try {
      const url = `${URLConstants.GET_EQUIPMENT_DESIGNATIONS_URL}/${id}.json`;

      console.log('getEquipmentDesignation url =', url);

      const response = await fetchGET(url);
      setEquipmentDesignation(response.data);
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
                &nbsp; Equipment Designation Details
              </h3>
              <NavLink to="/private/equipment-designations">
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
            {equipmentDesignation && (
              <div className="card-body">
                <dl className="row">
                  {renderTitleAndContent(
                    'Name : ',
                    // eslint-disable-next-line camelcase
                    equipmentDesignation !== null
                      ? equipmentDesignation.name
                      : ''
                  )}
                  {renderTitleAndContent(
                    'Short Desc: ',
                    equipmentDesignation !== null
                      ? equipmentDesignation.short_desc
                      : ''
                  )}
                  {renderTitleAndContent(
                    'Long Desc: ',
                    equipmentDesignation !== null
                      ? equipmentDesignation.long_desc
                      : ''
                  )}
                  {renderTitleAndContent(
                    'Company Name : ',
                    equipmentDesignation.company &&
                      equipmentDesignation.company.name
                  )}
                  {renderTitleAndContent(
                    'Division Name : ',
                    equipmentDesignation.division &&
                      equipmentDesignation.division.name
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
export default ViewEquipmentDesignation;
