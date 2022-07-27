import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import { Button, Col, Row } from 'react-bootstrap';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { SERVER_URL } from '../../constants/URLConstants';
import { fetchDELETE, fetchGET, fetchPOST } from '../../utils/NetworkUtils';

const JobSiteCrewListComponent = (props) => {
  console.log('JobSiteCrewListComponent', props.companyId);
  const [crewList, setCrewList] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [employeeId, setEmployeeId] = useState(-1);

  useEffect(() => {
    loadCrewList();
    loadEmployees();
  }, []);

  const loadCrewList = async () => {
    const response = await fetchGET(
      `${SERVER_URL}job-site-crew-members.json?job_site_id=${jobSiteId}&job_site_crew_id=${jobSiteCrewId}`
    );
    setCrewList(response.data);

    console.log('----->>>>>', response.data);
  };

  const loadEmployees = async () => {
    let url = `${SERVER_URL}employees.json?limit=1000page=1`;

    if (companyId !== null && companyId !== undefined) {
      url = `${url}&company_id=${companyId}`;
    }

    const response = await fetchGET(url);
    setEmployees(response.data);
    console.log('----->>>>>', employees);
    console.log('----->>>>>', response.data);
  };
  const { jobSiteCrewId, jobSiteId, companyId } = props;
  return (
    <>
      <div>
        <Row>
          <Col md={4}>
            <Select
              options={employees.map((item) => {
                return {
                  value: item.id,
                  label: `${item.user.first_name} ${item.user.last_name}`,
                };
              })}
              onChange={(selectOptions) => {
                console.log(selectOptions);
                setEmployeeId(+selectOptions.value);
              }}
            />
          </Col>

          <Col md={1} style={{ alignSelf: 'center' }}>
            <Button
              className="btn-xs"
              variant="primary"
              type="button"
              onClick={async () => {
                const url = `${SERVER_URL}job-site-crew-members.json`;
                const postData = {
                  job_site_id: jobSiteId,
                  job_site_crew_id: jobSiteCrewId,
                  employee_id: employeeId,
                };
                const response = await fetchPOST(url, postData);

                console.log(response.data);

                loadCrewList();
              }}
            >
              <AddIcon />
            </Button>
          </Col>
        </Row>
      </div>

      {crewList.map((item, index) => {
        return (
          <div key={item.id} style={{ marginTop: '5px' }}>
            {index + 1}.{' '}
            <p style={{ display: 'inline-block' }}>
              {item.employee.user.first_name} {item.employee.user.last_name}
            </p>{' '}
            <Button
              className="btn-xs"
              variant="danger"
              type="button"
              onClick={async () => {
                const url = `${SERVER_URL}job-site-crew-members/${item.id}.json`;

                const response = await fetchDELETE(url);

                console.log(response.data);

                loadCrewList();
              }}
            >
              <RemoveIcon />
            </Button>
          </div>
        );
      })}
    </>
  );
};

export default JobSiteCrewListComponent;
