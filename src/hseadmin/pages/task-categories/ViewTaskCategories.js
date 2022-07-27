import React, { useEffect, useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { renderTitleAndContent } from '../../constants/CustomFunction';
import URLConstants from '../../constants/URLConstants';
import { fetchGET } from '../../utils/NetworkUtils';

const ViewTaskCategories = () => {
  const [taskCategory, setTaskCategory] = useState(null);

  const { id } = useParams();

  useEffect(() => {
    loadTaskCategory();
  }, []);

  const loadTaskCategory = async () => {
    try {
      const url = `${URLConstants.GET_TASK_CATEGORY_URL}/${id}.json`;

      console.log('getTaskCategory url =', url);

      const response = await fetchGET(url);
      setTaskCategory(response.data);
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
                &nbsp; Task Category Details
              </h3>
              <NavLink to="/private/task-categories">
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
            {taskCategory && (
              <div className="card-body">
                <dl className="row">
                  {renderTitleAndContent('Name: ', taskCategory.name)}
                  {renderTitleAndContent(
                    'Industry Name : ',
                    taskCategory.industry && taskCategory.industry.name
                  )}
                  {renderTitleAndContent(
                    'Company Name : ',
                    taskCategory.company && taskCategory.company.name
                  )}
                  {renderTitleAndContent(
                    'Division Name : ',
                    taskCategory.division && taskCategory.division.name
                  )}
                  {renderTitleAndContent(
                    'Project Name : ',
                    taskCategory.job_site && taskCategory.job_site.name
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

export default ViewTaskCategories;
