import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { renderTitleAndContent } from '../../constants/CustomFunction';
import URLConstants from '../../constants/URLConstants';
import { fetchGET } from '../../utils/NetworkUtils';

const ViewAuditReport = () => {
  const history = useNavigate();
  const [auditReport, setAuditReport] = useState(null);

  const { id } = useParams();

  useEffect(() => {
    // console.log('param is ' + params.id);
    loadAuditReport();
  }, []);

  const loadAuditReport = async () => {
    try {
      const url = `${URLConstants.GET_AUDIT_REPORT_URL}/${id}.json`;

      console.log('getAuditReport url =', url);

      const response = await fetchGET(url);
      setAuditReport(response.data);
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
                &nbsp; Audit Report Details
              </h3>
              <>
                <Button
                  className="btn-sm"
                  variant="primary"
                  type="button"
                  style={{
                    float: 'right',
                  }}
                  onClick={() => {
                    history(-1);
                  }}
                >
                  Back
                </Button>
              </>
            </div>
            {auditReport && (
              <div className="card-body">
                <dl className="row">
                  {renderTitleAndContent(
                    'Name: ',
                    auditReport !== null ? auditReport.name : ''
                  )}
                  {renderTitleAndContent(
                    'Audit Task: ',
                    auditReport !== null ? auditReport.audit_task.name : ''
                  )}
                  {renderTitleAndContent(
                    'Contactor Name: ',
                    auditReport !== null ? auditReport.contactor_name : ''
                  )}
                  {renderTitleAndContent(
                    'City: ',
                    auditReport !== null ? auditReport.city_name : ''
                  )}
                  {renderTitleAndContent(
                    'Auditor Id: ',
                    auditReport.auditor !== null
                      ? `${auditReport.auditor.first_name} ${auditReport.auditor.last_name}`
                      : ''
                  )}
                  {renderTitleAndContent(
                    'Auditor Name: ',
                    auditReport !== null ? auditReport.auditor_name : ''
                  )}
                  {/* {renderTitleAndContent( */}
                  {/*  'Audit Type: ', */}
                  {/*  auditReport.audit_type !== null */}
                  {/*    ? auditReport.audit_type.name */}
                  {/*    : '' */}
                  {/* )} */}
                </dl>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewAuditReport;
