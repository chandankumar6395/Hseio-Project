import React, { useEffect, useState } from 'react';
import { Link, NavLink, useParams } from 'react-router-dom';

// import {Button} from 'react-bootstrap';
import { toast } from 'react-toastify';
import { Helmet } from 'react-helmet-async';
import { Button, Grid, Typography } from '@mui/material';
import { renderTitleAndContent } from '../../constants/CustomFunction';
// import {STATUSES_DATA, YES_NO_DATA} from '../../constants/Constants';
import URLConstants from '../../constants/URLConstants';
import { fetchGET } from '../../utils/NetworkUtils';
// import { STATUSES_DATA, YES_NO_DATA } from '../../constants/Constants';
import DashboardDivision from './DashboardDivision';
// import CustomTopSection from '../../components/CustomTopSection';
import CustomPhoneNumberView from '../../components/CustomPhoneNumberView';
import { CustomBreadcrumbs, CustomDivider } from '../../utils/MUIStyle';

const ViewDivision = () => {
  // const history = useNavigate();

  const [division, setDivision] = useState(null);

  const { id } = useParams();

  useEffect(() => {
    // console.log('param is ' + params.id);
    loadDivision();
  }, []);

  const loadDivision = async () => {
    try {
      const url = `${URLConstants.GET_DIVISION_URL}/${id}.json`;
      const response = await fetchGET(url);
      setDivision(response.data);
    } catch (error) {
      toast(error.message || 'Failed');
    }
  };

  return (
    <>
      <Helmet title="Edit Division" />

      {division && (
        <Grid justifyContent="space-between" container spacing={10}>
          <Grid item>
            <Typography variant="h3" gutterBottom display="inline">
              {division.name}
            </Typography>

            <CustomBreadcrumbs aria-label="Breadcrumb" mt={2}>
              <Link component={NavLink} to="/">
                Dashboard
              </Link>
              <Link component={NavLink} to="/private/divisions">
                Divisions
              </Link>
              <Typography>{division.name}</Typography>
            </CustomBreadcrumbs>
          </Grid>
          <Grid item>
            <div>
              <NavLink to="/private/divisions">
                <Button variant="contained" color="primary">
                  Back
                </Button>
              </NavLink>
            </div>
          </Grid>
        </Grid>
      )}

      <CustomDivider my={6} />

      {/* {division && <CustomTopSection title={division.name} link="/divisions" />} */}
      {division !== null && (
        <DashboardDivision
          companyId={division.company_id}
          divisionId={division.id}
        />
      )}
      <div className="row">
        <div className="col-md-12">
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">
                <i className="fas fa-text-width" />
                &nbsp; Division Details
              </h3>
            </div>
            <div className="card-body">
              {division !== null && (
                <dl className="row">
                  {renderTitleAndContent('Name: ', division.name)}
                  {renderTitleAndContent('Company: ', division.company.name)}
                  {renderTitleAndContent(
                    'Address 1: ',
                    division.address !== null ? division.address.address1 : ''
                  )}
                  {renderTitleAndContent(
                    'Address 2: ',
                    division.address !== null ? division.address.address2 : ''
                  )}

                  {renderTitleAndContent(
                    'State: ',
                    division.address.state !== null
                      ? division.address.state.name
                      : ''
                  )}

                  {renderTitleAndContent(
                    'City: ',
                    division.address.city !== null
                      ? division.address.city.name
                      : ''
                  )}

                  {renderTitleAndContent('Zip: ', division.address.zipcode)}

                  {/* {renderTitleAndContent('Main Phone: ', division.landline)} */}
                  {renderTitleAndContent(
                    'Main Phone:',
                    <a href={`tel://${division.landline}`}>
                      <CustomPhoneNumberView value={division.landline} />
                    </a>
                  )}
                  {/* {renderTitleAndContent('Main Fax: ', division.fax)} */}
                  {renderTitleAndContent(
                    'Main Fax:',
                    <a href={`tel://${division.fax}`}>
                      <CustomPhoneNumberView value={division.fax} />
                    </a>
                  )}

                  {renderTitleAndContent(
                    'Managers: ',
                    division.managers.map((manager) => {
                      return (
                        <>
                          <span>
                            {manager.first_name} {manager.last_name}
                          </span>
                          ,{' '}
                        </>
                      );
                    })
                  )}
                  {renderTitleAndContent(
                    'Primary Contact: ',
                    division.primary_contact !== null
                      ? `${division.primary_contact.user.first_name} ${division.primary_contact.user.last_name}`
                      : ''
                  )}
                  {renderTitleAndContent(
                    'Alternate Contact: ',
                    division.alternate_contact !== null
                      ? `${division.alternate_contact.user.first_name} ${division.alternate_contact.user.last_name}`
                      : ''
                  )}
                  {/* {renderTitleAndContent( */}
                  {/*  'Head Office: ', */}
                  {/*  YES_NO_DATA.find((x) => x.id === division.head_office).name */}
                  {/* )} */}
                  {/* {renderTitleAndContent( */}
                  {/*  'Status: ', */}

                  {/*  STATUSES_DATA.find((x) => x.id === division.status_id).name */}
                  {/* )} */}
                </dl>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewDivision;
