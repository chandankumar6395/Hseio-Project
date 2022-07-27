import React, { useEffect, useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { renderTitleAndContent } from '../../constants/CustomFunction';
import URLConstants from '../../constants/URLConstants';
import { fetchGET } from '../../utils/NetworkUtils';

const ViewDocumentType = () => {
  const [documentType, setDocumentType] = useState('');

  const { id } = useParams();

  useEffect(() => {
    // console.log('param is ' + params.id);
    console.log('useEffect ==> ViewDocumentType');
    loadDocumentTypes();
  }, []);

  const loadDocumentTypes = async () => {
    try {
      const url = `${URLConstants.GET_DOCUMENT_TYPE_URL}/${id}.json`;

      console.log('getDocumentType url =', url);

      const response = await fetchGET(url);
      setDocumentType(response.data);
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
                &nbsp; Document Type Details
              </h3>
              <NavLink to="/private/document-types">
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
            {documentType && (
              <div className="card-body">
                <dl className="row">
                  {renderTitleAndContent(
                    'Name : ',
                    // eslint-disable-next-line camelcase
                    documentType !== null ? documentType.name : ''
                  )}
                  {renderTitleAndContent(
                    'Short Desc: ',
                    documentType !== null ? documentType.short_desc : ''
                  )}
                  {renderTitleAndContent(
                    'Long Desc: ',
                    documentType !== null ? documentType.long_desc : ''
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
export default ViewDocumentType;
