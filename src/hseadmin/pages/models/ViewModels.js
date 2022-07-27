import React, { useEffect, useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { renderTitleAndContent } from '../../constants/CustomFunction';
import URLConstants from '../../constants/URLConstants';
import { fetchGET } from '../../utils/NetworkUtils';

const ViewModel = () => {
  const [model, setModel] = useState('');

  const { id } = useParams();

  useEffect(() => {
    // console.log('param is ' + params.id);
    console.log('useEffect ==> ViewModel');
    loadModel();
  }, []);

  const loadModel = async () => {
    try {
      const url = `${URLConstants.GET_MODEL_URL}/${id}.json`;

      console.log('getModels url =', url);

      const response = await fetchGET(url);
      setModel(response.data);
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
                &nbsp; Models Details
              </h3>
              <NavLink to="/private/models">
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
            {model && (
              <div className="card-body">
                <dl className="row">
                  {renderTitleAndContent(
                    'Name : ',
                    // eslint-disable-next-line camelcase
                    model !== null ? model.name : ''
                  )}
                  {renderTitleAndContent(
                    'Short Desc: ',
                    model !== null ? model.short_desc : ''
                  )}
                  {renderTitleAndContent(
                    'Description: ',
                    model !== null ? model.long_desc : ''
                  )}
                  {renderTitleAndContent(
                    'Company Name : ',
                    model.company && model.company.name
                  )}
                  {renderTitleAndContent(
                    'Division Name : ',
                    model.division && model.division.name
                  )}
                  {renderTitleAndContent(
                    'Project Name : ',
                    model.job_site && model.job_site.name
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
export default ViewModel;
