import React, { useEffect, useState } from 'react';
import { Link, NavLink, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilePdf } from '@fortawesome/free-regular-svg-icons';
import { Helmet } from 'react-helmet-async';
import { Button, Grid, Typography } from '@mui/material';
import { renderTitleAndContent } from '../../constants/CustomFunction';
// import {Button} from 'react-bootstrap';
// import CustomTopSection from '../../components/CustomTopSection';
import { fetchGET } from '../../utils/NetworkUtils';
import URLConstants from '../../constants/URLConstants';
import { toMMDDYYYY } from '../../utils/Utils';
import { getCertificate } from '../../store/actions/certificates';
import { loadEmployees } from '../../store/actions/employees';
import { CustomBreadcrumbs, CustomDivider } from '../../utils/MUIStyle';

const ViewCertificate = () => {
  const dispatch = useDispatch();

  // const certificate = useSelector((state) => state.certificate.certificate);

  const [certificate, setCertificate] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    // console.log('param is ' + params.id);
    loadCertificate();
    fetchEmployees();
  }, []);

  const renderDocument = () => {
    return (
      <>
        {certificate !== null && certificate.document !== null && (
          // eslint-disable-next-line jsx-a11y/img-redundant-alt
          <p>
            <a href={certificate.document.url} target="_blank" rel="noreferrer">
              <FontAwesomeIcon icon={faFilePdf} size="3x" />{' '}
              <div
                style={{
                  width: '200px',
                }}
              >
                {certificate.document.name}
              </div>
            </a>
          </p>
        )}
      </>
    );
  };

  const fetchEmployees = async () => {
    await dispatch(loadEmployees());
  };

  const loadCertificate = async () => {
    await dispatch(getCertificate(id));

    try {
      const response = await fetchGET(
        `${URLConstants.GET_CERTIFICATE_URL}/${id}.json`
      );
      setCertificate(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Helmet title="Edit Certificate" />

      {certificate && (
        <Grid justifyContent="space-between" container spacing={10}>
          <Grid item>
            <Typography variant="h3" gutterBottom display="inline">
              {certificate.name}
            </Typography>

            <CustomBreadcrumbs aria-label="Breadcrumb" mt={2}>
              <Link component={NavLink} to="/">
                Dashboard
              </Link>
              <Link component={NavLink} to="/private/certificates">
                Certificate
              </Link>
              <Typography>{certificate.name}</Typography>
            </CustomBreadcrumbs>
          </Grid>
          <Grid item>
            <div>
              <NavLink to="/private/certificates">
                <Button variant="contained" color="primary">
                  Back
                </Button>
              </NavLink>
            </div>
          </Grid>
        </Grid>
      )}

      <CustomDivider my={6} />
      {certificate && (
        <div>
          {/* <CustomTopSection */}
          {/*  title={certificate.name} */}
          {/*  link="/private/certificates" */}
          {/* /> */}
          <div className="row">
            <div className="col-md-12">
              <div className="card">
                {/* <div className="card-header"> */}
                {/*  <h3 className="card-title">Certificate</h3> */}
                {/* </div> */}

                <div className="card-body">
                  <dl className="row">
                    {renderTitleAndContent('Document: ', renderDocument())}
                    {renderTitleAndContent(
                      'Name: ',
                      certificate !== null ? certificate.name : ''
                    )}
                    {renderTitleAndContent(
                      'Short Desc: ',
                      certificate !== null ? certificate.short_desc : ''
                    )}
                    {renderTitleAndContent(
                      'Long Desc: ',
                      certificate !== null ? certificate.long_desc : ''
                    )}
                    {renderTitleAndContent(
                      'Issue Date: ',
                      certificate !== null
                        ? toMMDDYYYY(certificate.start_date)
                        : ''
                    )}
                    {renderTitleAndContent(
                      'Expiration Date: ',
                      certificate !== null
                        ? toMMDDYYYY(certificate.end_date)
                        : ''
                    )}
                    {/* {renderTitleAndContent( */}
                    {/*  'Score: ', */}
                    {/*  certificate !== null ? certificate.score : '' */}
                    {/* )} */}
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ViewCertificate;
