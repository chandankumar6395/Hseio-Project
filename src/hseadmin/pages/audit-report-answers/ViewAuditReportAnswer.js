import React, { useEffect, useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { renderTitleAndContent } from '../../constants/CustomFunction';
import URLConstants from '../../constants/URLConstants';
import { fetchGET } from '../../utils/NetworkUtils';

const ViewAuditReportAnswer = () => {
  const [auditReportAnswer, setAuditReportAnswer] = useState(null);

  const { id } = useParams();

  useEffect(() => {
    // console.log('param is ' + params.id);
    console.log('useEffect ==> ViewAuditReportAnswers');
    loadAuditReportAnswer();
  }, []);

  const loadAuditReportAnswer = async () => {
    try {
      const url = `${URLConstants.GET_AUDIT_REPORT_ANSWER_URL}/${id}.json`;

      console.log('getAuditReportAnswer url =', url);

      const response = await fetchGET(url);
      setAuditReportAnswer(response.data);
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
                &nbsp; Audit Report Answer Details
              </h3>
              <NavLink to="/private/audit-report-answers">
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
            {auditReportAnswer !== null && (
              <div className="card-body">
                <dl className="row">
                  {renderTitleAndContent(
                    'Audit Report Name : ',
                    // eslint-disable-next-line camelcase
                    auditReportAnswer.audit_report !== null
                      ? auditReportAnswer.audit_report.name
                      : ''
                  )}
                  {renderTitleAndContent(
                    'Question Name : ',
                    // eslint-disable-next-line camelcase
                    auditReportAnswer.question !== null
                      ? auditReportAnswer.question.name
                      : ''
                  )}
                  {renderTitleAndContent(
                    'Answer Name : ',
                    // eslint-disable-next-line camelcase
                    auditReportAnswer.answer !== null
                      ? auditReportAnswer.answer.name
                      : ''
                  )}
                  {renderTitleAndContent(
                    'Answer Value : ',
                    auditReportAnswer.answer_value
                  )}
                  {renderTitleAndContent(
                    'Comment : ',
                    auditReportAnswer.comments
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
export default ViewAuditReportAnswer;
