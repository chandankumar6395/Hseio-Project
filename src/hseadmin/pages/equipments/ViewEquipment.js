import React, { useEffect, useState } from 'react';
import { Link, NavLink, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Helmet } from 'react-helmet-async';
import { Button, Grid, Typography } from '@mui/material';
import { renderTitleAndContent } from '../../constants/CustomFunction';
import URLConstants from '../../constants/URLConstants';
import { fetchGET } from '../../utils/NetworkUtils';
import { YES_NO_DATA } from '../../constants/Constants';
import { CustomBreadcrumbs, CustomDivider } from '../../utils/MUIStyle';

const ViewEquipment = () => {
  const [equipment, setEquipment] = useState('');

  const { id } = useParams();

  useEffect(() => {
    // console.log('param is ' + params.id);
    console.log('useEffect ==> ViewEquipment');
    loadEquipments();
  }, []);

  const loadEquipments = async () => {
    try {
      const url = `${URLConstants.GET_EQUIPMENT_URL}/${id}.json`;

      console.log('getEquipment url =', url);

      const response = await fetchGET(url);
      setEquipment(response.data);
    } catch (error) {
      toast(error.message || 'Failed');
    }
  };

  return (
    <>
      <Helmet title="View Equipment" />

      {equipment && (
        <Grid justifyContent="space-between" container spacing={10}>
          <Grid item>
            <Typography variant="h3" gutterBottom display="inline">
              {equipment.name}
            </Typography>

            <CustomBreadcrumbs aria-label="Breadcrumb" mt={2}>
              <Link component={NavLink} to="/">
                Dashboard
              </Link>
              <Link component={NavLink} to="/private/equipments">
                Equipment
              </Link>
              <Typography>{equipment.name}</Typography>
            </CustomBreadcrumbs>
          </Grid>
          <Grid item>
            <div>
              <NavLink to="/private/equipments">
                <Button variant="contained" color="primary">
                  Back
                </Button>
              </NavLink>
            </div>
          </Grid>
        </Grid>
      )}
      <CustomDivider my={6} />
      <div className="row">
        <div className="col-md-12">
          <div className="card">
            {/* <div className="card-header"> */}
            {/* <h3 className="card-title"> */}
            {/*  <i className="fas fa-text-width" /> */}
            {/*  &nbsp; Equipment Details */}
            {/* </h3> */}
            {/* <NavLink to="/private/equipments"> */}
            {/*  <Button */}
            {/*    className="btn-sm" */}
            {/*    variant="primary" */}
            {/*    type="button" */}
            {/*    style={{ float: 'right' }} */}
            {/*  > */}
            {/*    Back */}
            {/*  </Button> */}
            {/* </NavLink> */}
            {/* </div> */}
            {equipment && (
              <div className="card-body">
                <dl className="row">
                  {renderTitleAndContent(
                    'Name : ',
                    equipment.name !== null ? equipment.name : ''
                  )}
                  {renderTitleAndContent(
                    'Manufacturer: ',
                    equipment.manufacturer && equipment.manufacturer.name
                  )}
                  {renderTitleAndContent(
                    'Model: ',
                    equipment.model !== null ? equipment.model.name : ''
                  )}
                  {renderTitleAndContent('Year: ', equipment.year)}
                  {/* {renderTitleAndContent( */}
                  {/*  'Miles Hours: ', */}
                  {/*  equipment.miles_hours */}
                  {/* )} */}
                  {renderTitleAndContent(
                    'Rental: ',
                    YES_NO_DATA.find((x) => x.id === equipment.rental).name
                  )}
                  {renderTitleAndContent(
                    'Company: ',
                    equipment.company && equipment.company.name
                  )}
                  {renderTitleAndContent(
                    'Division: ',
                    equipment.division && equipment.division.name
                  )}
                  {renderTitleAndContent(
                    'Project: ',
                    equipment.job_site && equipment.job_site.name
                  )}
                  {renderTitleAndContent(
                    'Equipment Type: ',
                    equipment.equipment_type !== null
                      ? equipment.equipment_type.name
                      : ''
                  )}
                  {renderTitleAndContent(
                    'Required Inspection: ',
                    equipment.required_inspections.map((inspection) => {
                      return (
                        <>
                          <span>{inspection.name}, </span>
                        </>
                      );
                    })
                  )}
                </dl>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-12">
          <div className="card">
            <div className="card-body">
              <dl className="row">
                {renderTitleAndContent(
                  'Equipment Designation: ',
                  equipment.equipment_designation &&
                    equipment.equipment_designation.name
                )}
                {equipment.equipment_designation_id === 1 &&
                  renderTitleAndContent(
                    'License State: ',
                    equipment.license_state && equipment.license_state.name
                  )}
                {equipment.equipment_designation_id === 1 &&
                  renderTitleAndContent(
                    'License Number: ',
                    equipment.license_number
                  )}
                {equipment.equipment_designation_id === 1 &&
                  renderTitleAndContent(
                    'CDL Required: ',
                    YES_NO_DATA.find((x) => x.id === equipment.cdl_required)
                      .name
                  )}
                {equipment.equipment_designation_id === 1 &&
                  equipment.cdl_required === 1 &&
                  renderTitleAndContent(
                    'DVIR Required: ',
                    YES_NO_DATA.find((x) => x.id === equipment.dvir_required)
                      .name
                  )}
                {equipment.equipment_designation_id === 1 &&
                  equipment.cdl_required === 1 &&
                  renderTitleAndContent(
                    'Required CDL Endorsements: ',
                    equipment.required_cdl_endorsements.map(
                      // eslint-disable-next-line camelcase
                      (required_cdl_endorsement) => {
                        return (
                          <>
                            <span>{required_cdl_endorsement.name}</span>,{' '}
                          </>
                        );
                      }
                    )
                  )}
                {equipment.equipment_designation_id === 2 &&
                  renderTitleAndContent(
                    'Required Certification: ',
                    equipment.required_certifications.map(
                      // eslint-disable-next-line camelcase
                      (required_certification) => {
                        return (
                          <>
                            <span>{required_certification.name}</span>,{' '}
                          </>
                        );
                      }
                    )
                  )}
                {equipment.equipment_designation_id === 2 &&
                  renderTitleAndContent(
                    'Required PPE: ',
                    equipment.required_ppes.map(
                      // eslint-disable-next-line camelcase
                      (required_ppe) => {
                        return (
                          <>
                            <span>{required_ppe.name}</span>,{' '}
                          </>
                        );
                      }
                    )
                  )}
              </dl>
            </div>
          </div>
        </div>
      </div>
      <strong className="commentbox" style={{ display: 'block' }}>
        Photos:{' '}
      </strong>
      <div className="photoselbox">
        {equipment.photos?.map((photo) => {
          return (
            <span
              data-fancybox
              data-src={photo.url}
              style={{ cursor: 'pointer' }}
            >
              <img
                style={{
                  alignItems: 'center',
                  backgroundColor: 'white',
                  width: '150px',
                  height: 'auto',
                }}
                src={photo.url !== null ? photo.url : ''}
                alt=""
              />
            </span>
          );
        })}
      </div>
    </>
  );
};
export default ViewEquipment;
