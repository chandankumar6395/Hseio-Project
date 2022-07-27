import React, { useEffect, useState } from 'react';
import { Col, Modal, Row } from 'react-bootstrap';
import { Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { toast } from 'react-toastify';
import AddSignatureForm from './AddSignatureForm';
import EditSignatureForm from './EditSignatureForm';
import { fetchDELETE, fetchGET } from '../../utils/NetworkUtils';
import URLConstants from '../../constants/URLConstants';
import AddSignatureLeaderForm from './AddSignatureLeaderForm';
import EditSignatureLeaderForm from './EditSignatureLeaderForm';
import { toMMDDYYYYHHMMDisplay } from '../../utils/Utils';

const SignatureList = (props) => {
  const { jobId } = props;
  const [items, setItems] = useState([]);
  const [signatureItemId, setSignatureItemId] = useState(-1);

  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [showAddLeaderForm, setShowAddLeaderForm] = useState(false);
  const [showEditLeaderForm, setShowEditLeaderForm] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const handleClose = () => {
    setShowModal(false);
    setShowAddForm(false);
    setShowEditForm(false);
    setShowEditLeaderForm(false);
    setShowAddLeaderForm(false);
    loadSignatureList();
  };
  const handleShow = () => setShowModal(true);
  useEffect(() => {
    loadSignatureList();
  }, []);

  const deleteSignature = async (id) => {
    try {
      const url = `${URLConstants.GET_JOB_WORK_AUTHORIZATION_URL}/${id}.json`;
      const response = await fetchDELETE(url);
      console.log(response.data);

      loadSignatureList();
    } catch (error) {
      toast(error.message || 'Failed');
    }
  };
  const loadSignatureList = async () => {
    try {
      // console.log(jobId);
      try {
        const response = await fetchGET(
          `${URLConstants.JOB_WORK_AUTHORIZATIONS_URL}?limit=100&page=1&job_id=${jobId}`
        );

        setItems(response.data);
      } catch (error) {
        toast(error.message || 'Failed');
      }
    } catch (error) {
      console.log('error', error.message);
    }
  };

  return (
    <>
      <Row>
        <Col md={12}>
          <div>
            <table>
              <tbody>
                <tr>
                  <th colSpan={4} style={{ backgroundColor: '#d6d5d2' }}>
                    Part 3 &ensp; Work Authorization
                  </th>
                </tr>
                <tr>
                  <td
                    colSpan={4}
                    style={{ textAlign: 'center', backgroundColor: '#fcfcfa' }}
                  >
                    <i>
                      By signing below, I confirm that the job has been reviewed
                      with the work team using the 7 Hazard Sources. The
                      Controls protect against the hazards such that residual
                      risk is acceptable. Each Work Team member is clear on
                      their responsibilities.
                    </i>
                  </td>
                </tr>
                <tr>
                  <th>Work/crew leader (print)</th>
                  <th>Signature</th>
                  <th>Date</th>
                  <th style={{ textAlign: 'center' }}>
                    {' '}
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => {
                        handleShow();
                        setShowAddLeaderForm(true);
                      }}
                    >
                      <AddIcon />
                    </Button>
                  </th>
                </tr>
                {items.map((item) => {
                  return (
                    <>
                      {item.team === 'leader' && (
                        <tr key={item.id}>
                          <td>{item.name}</td>
                          <td>
                            <div
                              style={{
                                display: 'flex',
                                justifyContent: 'center',
                                width: '100%',
                              }}
                            >
                              <img
                                style={{
                                  width: '200px',
                                  height: 'auto',
                                  alignItems: 'center',
                                  backgroundColor: 'white',
                                }}
                                src={
                                  item.signature !== null
                                    ? item.signature.url
                                    : ''
                                }
                                alt=""
                              />
                            </div>
                          </td>
                          <td>{toMMDDYYYYHHMMDisplay(item.signature_date)}</td>
                          <td style={{ textAlign: 'center' }}>
                            <Button
                              variant="contained"
                              color="primary"
                              onClick={() => {
                                handleShow();
                                setShowEditLeaderForm(true);
                                setSignatureItemId(item.id);
                              }}
                            >
                              <EditIcon />
                            </Button>{' '}
                            <Button
                              variant="contained"
                              color="primary"
                              onClick={() => {
                                deleteSignature(item.id);
                              }}
                            >
                              <DeleteIcon />
                            </Button>
                          </td>
                        </tr>
                      )}
                    </>
                  );
                })}
                <tr>
                  <td />
                  <td />
                  <td />
                  <td />
                </tr>
              </tbody>
            </table>
            <br />
          </div>
        </Col>
        <Col md={12}>
          <div>
            <table>
              <tbody>
                <tr>
                  <th colSpan={4} style={{ backgroundColor: '#d6d5d2' }}>
                    Work Execution Team{' '}
                    <span>
                      (Sign if all of your questions have been answered and you
                      are ready to proceed.)
                    </span>
                  </th>
                </tr>
                <tr>
                  <th>NAME/COMPANY</th>
                  <th>SIGNATURE</th>
                  <th style={{ textAlign: 'center' }}>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => {
                        handleShow();
                        setShowAddForm(true);
                      }}
                    >
                      <AddIcon />
                    </Button>
                  </th>
                </tr>

                {items.map((item) => {
                  return (
                    <>
                      {item.team === 'worker' && (
                        <tr key={item.id}>
                          <td>{item.name}</td>
                          <td>
                            <div
                              style={{
                                display: 'flex',
                                justifyContent: 'center',
                                width: '100%',
                              }}
                            >
                              <img
                                style={{
                                  width: '200px',
                                  height: 'auto',
                                  alignItems: 'center',
                                  backgroundColor: 'white',
                                }}
                                src={
                                  item.signature !== null
                                    ? item.signature.url
                                    : ''
                                }
                                alt=""
                              />
                            </div>
                          </td>
                          <td style={{ textAlign: 'center' }}>
                            <Button
                              variant="contained"
                              color="primary"
                              onClick={() => {
                                handleShow();
                                setShowEditForm(true);
                                setSignatureItemId(item.id);
                              }}
                            >
                              <EditIcon />
                            </Button>{' '}
                            <Button
                              variant="contained"
                              color="primary"
                              onClick={() => {
                                deleteSignature(item.id);
                              }}
                            >
                              <DeleteIcon />
                            </Button>
                          </td>
                        </tr>
                      )}
                    </>
                  );
                })}
                <tr>
                  <td />
                  <td />
                  <td />
                </tr>
              </tbody>
            </table>
            <br />
          </div>
        </Col>
      </Row>
      <Modal
        style={{ zIndex: '1000000' }}
        show={showModal}
        onHide={handleClose}
      >
        <Modal.Header closeButton>
          <Modal.Title>Signature Form</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {showAddForm && (
            <AddSignatureForm closeModal={handleClose} jobId={jobId} />
          )}
          {showEditForm && (
            <EditSignatureForm
              closeModal={handleClose}
              jobId={jobId}
              id={signatureItemId}
            />
          )}
          {showAddLeaderForm && (
            <AddSignatureLeaderForm closeModal={handleClose} jobId={jobId} />
          )}

          {showEditLeaderForm && (
            <EditSignatureLeaderForm
              closeModal={handleClose}
              jobId={jobId}
              id={signatureItemId}
            />
          )}
        </Modal.Body>
        <Modal.Footer>
          {/* <Button variant="secondary" onClick={handleClose}> */}
          {/*  Close */}
          {/* </Button> */}
          {/* <Button variant="primary" onClick={handleClose}> */}
          {/*  Save Changes */}
          {/* </Button> */}
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default SignatureList;
