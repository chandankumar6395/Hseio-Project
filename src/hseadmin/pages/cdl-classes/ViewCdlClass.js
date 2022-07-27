import React, { useEffect, useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { renderTitleAndContent } from '../../constants/CustomFunction';
import URLConstants from '../../constants/URLConstants';
import { fetchGET } from '../../utils/NetworkUtils';

const ViewCdlClass = () => {
  const [cdlClass, setCdlClass] = useState('');

  const { id } = useParams();

  useEffect(() => {
    // console.log('param is ' + params.id);
    console.log('useEffect ==> ViewCdlClass');
    loadCdlClass();
  }, []);

  const loadCdlClass = async () => {
    try {
      const url = `${URLConstants.GET_CDL_CLASS_URL}/${id}.json`;

      console.log('getCdlClass url =', url);

      const response = await fetchGET(url);
      setCdlClass(response.data);
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
                &nbsp; Cdl Classes Details
              </h3>
              <NavLink to="/private/cdl-classes">
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
            {cdlClass && (
              <div className="card-body">
                <dl className="row">
                  {renderTitleAndContent(
                    'Name : ',
                    // eslint-disable-next-line camelcase
                    cdlClass !== null ? cdlClass.name : ''
                  )}
                  {renderTitleAndContent(
                    'Short Desc: ',
                    cdlClass !== null ? cdlClass.short_desc : ''
                  )}
                  {renderTitleAndContent(
                    'Description: ',
                    cdlClass !== null ? cdlClass.long_desc : ''
                  )}
                  {renderTitleAndContent(
                    'Company Name : ',
                    cdlClass.company && cdlClass.company.name
                  )}
                  {renderTitleAndContent(
                    'Division Name : ',
                    cdlClass.division && cdlClass.division.name
                  )}
                  {renderTitleAndContent(
                    'Project Name : ',
                    cdlClass.job_site && cdlClass.job_site.name
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
export default ViewCdlClass;
