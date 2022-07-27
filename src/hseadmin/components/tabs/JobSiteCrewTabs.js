import { Button, Col, Form, Row, Tab, Tabs } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import { fetchGET, fetchPOST } from '../../utils/NetworkUtils';
import { SERVER_URL } from '../../constants/URLConstants';
import './JobSiteCrewTabs.css';
import JobSiteCrewListComponent from './JobSiteCrewListComponent';

const JobSiteCrewTabs = (props) => {
  console.log('JobSiteCrewTabs', props.companyId);
  const [key, setKey] = useState('home');
  const [crews, setCrews] = useState(null);
  const [name, setName] = useState('');

  useEffect(() => {
    loadJobCrewsData();
  }, []);

  const loadJobCrewsData = async () => {
    const response = await fetchGET(`${SERVER_URL}job-site-crews.json`);
    setCrews(response.data);
    if (response.data.length > 0) setKey(response.data[0].id);
  };

  return (
    <>
      <Row>
        <Col md={6}>
          <Form.Control
            type="text"
            placeholder="Name"
            style={{ float: 'left', width: '80%' }}
            onChange={(e) => setName(e.target.value)}
          />
          <Button
            className="btn-sm"
            variant="primary"
            type="button"
            style={{ float: 'left', marginLeft: '10px' }}
            onClick={async () => {
              const postData = {
                name,
                job_site_id: props.jobSiteId,
              };
              const response = await fetchPOST(
                `${SERVER_URL}job-site-crews.json`,
                postData
              );
              console.log(response);

              loadJobCrewsData();
            }}
          >
            <AddIcon />
          </Button>
        </Col>
      </Row>
      <br />
      <Row>
        <Col>
          <Tabs
            id="controlled-tab-example"
            activeKey={key}
            onSelect={(k) => setKey(k)}
            className="mb-3"
          >
            {crews !== null &&
              crews.map((crew) => {
                return (
                  <Tab key={crew.id} eventKey={crew.id} title={crew.name}>
                    <JobSiteCrewListComponent
                      key={props.companyId}
                      jobSiteId={props.jobSiteId}
                      jobSiteCrewId={crew.id}
                      companyId={props.companyId}
                    />
                  </Tab>
                );
              })}
          </Tabs>
        </Col>
      </Row>
    </>
  );
};

export default JobSiteCrewTabs;
