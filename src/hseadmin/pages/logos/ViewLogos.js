import React, { useEffect, useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { renderTitleAndContent } from '../../constants/CustomFunction';
import URLConstants from '../../constants/URLConstants';
import { fetchGET } from '../../utils/NetworkUtils';

const ViewLogo = () => {
  const [logo, setLogo] = useState('');

  const { id } = useParams();

  useEffect(() => {
    // console.log('param is ' + params.id);
    // console.log('useEffect ==> ViewLogo');
    loadLogo();
  }, []);

  const loadLogo = async () => {
    try {
      const url = `${URLConstants.GET_LOGOS_URL}/${id}.json`;

      // console.log('getLogo url =', url);

      const response = await fetchGET(url);
      setLogo(response.data);
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
                &nbsp; Logos Details
              </h3>
              <NavLink to="/private/logos">
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
            {logo && (
              <div className="card-body">
                <dl className="row">
                  {renderTitleAndContent(
                    'Name : ',
                    // eslint-disable-next-line camelcase
                    logo !== null ? logo.name : ''
                  )}
                  {renderTitleAndContent(
                    'File Name: ',
                    logo !== null ? logo.file_name : ''
                  )}
                  {renderTitleAndContent(
                    'Mime Type ',
                    logo !== null ? logo.mime_type : ''
                  )}
                  {renderTitleAndContent(
                    'Extension: ',
                    logo !== null ? logo.extension : ''
                  )}
                  {renderTitleAndContent(
                    'Size: ',
                    logo !== null ? logo.size : ''
                  )}
                  {renderTitleAndContent(
                    'Path: ',
                    logo !== null ? logo.path : ''
                  )}
                  {renderTitleAndContent(
                    'URL: ',
                    logo !== null ? logo.url : ''
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
export default ViewLogo;
