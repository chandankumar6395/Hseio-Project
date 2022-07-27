import React, { useEffect, useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { renderTitleAndContent } from '../../constants/CustomFunction';
import URLConstants from '../../constants/URLConstants';
import { fetchGET } from '../../utils/NetworkUtils';
import { toast } from 'react-toastify';

const ViewAuditTaskCategoryQuestions = () => {
  const [auditTaskCategoryQuestion, setAuditTaskCategoryQuestion] =
    useState(null);

  const { id } = useParams();

  useEffect(() => {
    // console.log('param is ' + params.id);
    console.log('useEffect ==> ViewAuditReportAnswers');
    loadAuditTaskCategoryQuestion();
  }, []);

  const loadAuditTaskCategoryQuestion = async () => {
    try {
      const url = `${URLConstants.GET_AUDIT_TASK_CATEGORY_QUESTION_URL}/${id}.json`;

      console.log('getAuditTaskCategoryQuestions url =', url);

      const response = await fetchGET(url);
      setAuditTaskCategoryQuestion(response.data);
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
                &nbsp; Audit Task Category Question Details
              </h3>
              <NavLink to="/audit-task-category-questions">
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
                  'Question Name : ',
                  // eslint-disable-next-line camelcase
                  auditTaskCategoryQuestion !== null
                    ? auditTaskCategoryQuestion.question.name
                    : ''
                )}
                {renderTitleAndContent(
                  'Audit Task Category Name : ',
                  // eslint-disable-next-line camelcase
                  auditTaskCategoryQuestion !== null
                    ? auditTaskCategoryQuestion.audit_task_category.name
                    : ''
                )}
              </dl>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default ViewAuditTaskCategoryQuestions;
