import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { renderTitleAndContent } from '../../constants/CustomFunction';
import URLConstants from '../../constants/URLConstants';
import { fetchGET } from '../../utils/NetworkUtils';
import { YES_NO_DATA } from '../../constants/Constants';

const ViewIncidentInjuries = () => {
  const [incidentInjuries, setIncidentInjuries] = useState(null);

  const history = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    // console.log('param is ' + params.id);
    console.log('useEffect ==> ViewIncident');
    loadIncidentInjuries();
  }, []);

  const loadIncidentInjuries = async () => {
    try {
      const url = `${URLConstants.GET_INCIDENTS_INJURIES_URL}/${id}.json`;

      console.log('getIncidentInjuries url =', url);

      const response = await fetchGET(url);
      setIncidentInjuries(response.data);
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
                &nbsp; Incident Injuries Details
              </h3>
              <>
                <Button
                  className="btn-sm"
                  variant="primary"
                  type="button"
                  style={{
                    float: 'right',
                  }}
                  onClick={() => {
                    history(-1);
                  }}
                >
                  Back
                </Button>
              </>
            </div>
            {incidentInjuries && (
              <div className="card-body">
                <dl className="row">
                  {renderTitleAndContent(
                    'Incident : ',
                    incidentInjuries.incident !== null
                      ? incidentInjuries.incident.name
                      : ''
                  )}
                  {renderTitleAndContent(
                    'Employee Name : ',
                    incidentInjuries.employee !== null
                      ? `${incidentInjuries.employee.user.first_name} ${incidentInjuries.employee.user.auditor.last_name}`
                      : ''
                  )}
                  {renderTitleAndContent(
                    'Injury Classes : ',
                    incidentInjuries.injury_class !== null
                      ? incidentInjuries.injury_class.name
                      : ''
                  )}
                  {renderTitleAndContent(
                    'Osha Recordable  : ',
                    incidentInjuries !== null
                      ? YES_NO_DATA.find(
                          (x) => x.id === incidentInjuries.osha_recordable
                        ).name
                      : ''
                  )}
                  {renderTitleAndContent(
                    'Fatality : ',
                    incidentInjuries !== null
                      ? YES_NO_DATA.find(
                          (x) => x.id === incidentInjuries.fatility
                        ).name
                      : ''
                  )}
                  {renderTitleAndContent(
                    'Lost Time  : ',
                    incidentInjuries !== null
                      ? YES_NO_DATA.find(
                          (x) => x.id === incidentInjuries.lost_time
                        ).name
                      : ''
                  )}
                  {renderTitleAndContent(
                    'Lost Time Total Days : ',
                    incidentInjuries !== null
                      ? incidentInjuries.lost_time_total_days
                      : ''
                  )}
                  {renderTitleAndContent(
                    'Restricted Duty : ',
                    incidentInjuries !== null
                      ? YES_NO_DATA.find(
                          (x) => x.id === incidentInjuries.restricted_duty
                        ).name
                      : ''
                  )}
                  {renderTitleAndContent(
                    'Restricted Duty Total Days : ',
                    incidentInjuries &&
                      incidentInjuries.restricted_duty_total_days
                  )}
                  {renderTitleAndContent(
                    'Other Recordable: ',
                    incidentInjuries !== null
                      ? YES_NO_DATA.find(
                          (x) => x.id === incidentInjuries.other_recordable
                        ).name
                      : ''
                  )}
                  {renderTitleAndContent(
                    'Company Name : ',
                    incidentInjuries.company && incidentInjuries.company.name
                  )}
                  {renderTitleAndContent(
                    'Division Name : ',
                    incidentInjuries.division && incidentInjuries.division.name
                  )}
                  {renderTitleAndContent(
                    'Project Name : ',
                    incidentInjuries.job_site && incidentInjuries.job_site.name
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

export default ViewIncidentInjuries;
