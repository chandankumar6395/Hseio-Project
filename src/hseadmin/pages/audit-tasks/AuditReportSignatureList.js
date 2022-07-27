import React, { useEffect, useState } from 'react';
import { Col, Modal, Row } from 'react-bootstrap';
import { Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { toast } from 'react-toastify';
import AddSignatureForm from './AddSignatureForm';
import EditSignatureForm from './EditSignatureForm';
import { fetchGET, fetchDELETE } from '../../utils/NetworkUtils';
import URLConstants from '../../constants/URLConstants';
// import { toMMMDDYYHHMMDisplay } from '../../utils/Utils';

const AuditReportSignatureList = (props) => {
  const { auditReportId, companyId } = props;
  const [items, setItems] = useState([]);
  const [signatureItemId, setSignatureItemId] = useState(-1);

  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [showModal, setShowModal] = useState(false);
  console.log('Company', companyId);
  const handleClose = () => {
    setShowModal(false);
    setShowAddForm(false);
    setShowEditForm(false);
    loadSignatureList();
  };
  const handleShow = () => setShowModal(true);
  useEffect(() => {
    loadSignatureList();
  }, []);
  console.log('Item', items);
  const deleteSignature = async (id) => {
    try {
      const url = `${URLConstants.GET_AUDIT_WORK_AUTHORIZATIONS_URL}/${id}.json`;
      console.log('URL:', url);
      const response = await fetchDELETE(url);
      console.log(response.data);

      loadSignatureList();
    } catch (error) {
      toast(error.message || 'Failed');
    }
  };
  const loadSignatureList = async () => {
    try {
      console.log(auditReportId);
      try {
        const response = await fetchGET(
          `${URLConstants.AUDIT_WORK_AUTHORIZATIONS_URL}?limit=100&page=1&audit_report_id=${auditReportId}`
        );
        console.log('response', response.data);
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
            <table className="table table-bordered">
              <tbody>
                <tr>
                  <th colSpan={4} style={{ backgroundColor: '#dcdcdc' }}>
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
                          <td>{`${item.employee.user.first_name} ${item.employee.user.last_name}`}</td>
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
                                  width: '180px',
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
                              className="editbtn"
                              onClick={() => {
                                handleShow();
                                setShowEditForm(true);
                                setSignatureItemId(item.id);
                              }}
                            >
                              <EditIcon />
                            </Button>{' '}
                            <Button
                              className="delbtn"
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
            <AddSignatureForm
              auditReportId={auditReportId}
              closeModal={handleClose}
              companyId={companyId}
            />
          )}
          {showEditForm && (
            <EditSignatureForm
              closeModal={handleClose}
              auditReportId={auditReportId}
              id={signatureItemId}
              companyId={companyId}
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

export default AuditReportSignatureList;
