import React, { useEffect, useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { renderTitleAndContent } from '../../constants/CustomFunction';
import URLConstants from '../../constants/URLConstants';
import { fetchGET } from '../../utils/NetworkUtils';

const ViewJobItem = () => {
  const [jobItem, setJobItem] = useState('');

  const { id } = useParams();

  useEffect(() => {
    // console.log('param is ' + params.id);
    console.log('useEffect ==> ViewJobItem');
    loadJobItems();
  }, []);

  const loadJobItems = async () => {
    try {
      const url = `${URLConstants.GET_JOB_ITEM_URL}/${id}.json`;

      console.log('getJobItem url =', url);

      const response = await fetchGET(url);
      setJobItem(response.data);
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
                &nbsp; Job Item Details
              </h3>
              <NavLink to="/private/job-items">
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
            {jobItem && (
              <div className="card-body">
                <dl className="row">
                  {renderTitleAndContent(
                    'Job Id: ',
                    jobItem !== null ? jobItem.job.name : ''
                  )}
                  {renderTitleAndContent(
                    'Job Stages : ',
                    // eslint-disable-next-line camelcase
                    jobItem !== null ? jobItem.job_stages : ''
                  )}
                  {renderTitleAndContent(
                    'Hazard Consequence: ',
                    jobItem !== null ? jobItem.hazard_consequence : ''
                  )}
                  {renderTitleAndContent(
                    'Controls: ',
                    jobItem !== null ? jobItem.controls : ''
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
export default ViewJobItem;
