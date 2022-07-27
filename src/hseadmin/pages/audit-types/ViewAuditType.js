import React, { useEffect, useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { renderTitleAndContent } from '../../constants/CustomFunction';
import URLConstants from '../../constants/URLConstants';
import { fetchGET } from '../../utils/NetworkUtils';

const ViewAuditType = () => {
  const [auditType, setAuditType] = useState(null);

  const { id } = useParams();

  useEffect(() => {
    // console.log('param is ' + params.id);
    loadAuditType();
  }, []);

  const loadAuditType = async () => {
    try {
      const url = `${URLConstants.GET_AUDIT_TYPE_URL}/${id}.json`;

      console.log('getAuditTaskCategory url =', url);

      const response = await fetchGET(url);
      setAuditType(response.data);
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
                &nbsp; Audit Type Details
              </h3>
              <NavLink to="/private/audit-types">
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
                  auditType !== null ? auditType.name : ''
                )}
                {renderTitleAndContent(
                  'Short Desc: ',
                  auditType !== null ? auditType.short_desc : ''
                )}
                {renderTitleAndContent(
                  'Description: ',
                  auditType !== null ? auditType.long_desc : ''
                )}
              </dl>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewAuditType;
