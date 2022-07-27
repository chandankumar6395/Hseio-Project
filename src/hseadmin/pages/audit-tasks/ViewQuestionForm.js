import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import URLConstants from '../../constants/URLConstants';
import { fetchGET } from '../../utils/NetworkUtils';
import { Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import Pdf from 'react-to-pdf';
import logobhp from './logobhp.jpg';

const ref = React.createRef();
const options = {
  orientation: 'portrait',
  unit: 'px',
  format: [792, 612],
};
const ViewQuestionForm = () => {
  const history = useNavigate();
  const [QuestionForm, setViewQuestionForm] = useState('');
  const { id } = useParams();

  useEffect(() => {
    // console.log('param is ' + params.id);
    loadViewQuestionForm();
  }, []);

  const loadViewQuestionForm = async () => {
    try {
      const url = `${URLConstants.VIEW_QUES_FORM}/${id}.json`;
      const response = await fetchGET(url);
      setViewQuestionForm(response.data);
    } catch (error) {
      toast(error.message || 'Failed');
    }
  };

  //   const renderHeading = () => {
  //     return QuestionForm.audit_task_categories?.map((q,i) => {
  //       return (
  //         <tr style={{backgroundColor:"#ddd",}} key={`${i}`}>
  //         <th>{q.name}</th>
  //         <th>ADEQUATE</th>
  //         <th>DEFICIENT</th>
  //         <th>N/A</th>
  //         <th>COMMENTS</th>
  //     </tr>
  //       );
  //     });
  //   };

  return (
    <>
      <div className="row">
        <div className="col-md-12">
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">
                <i className="fas fa-text-width" />
                &nbsp; View Question Form
              </h3>
              <>
                <Button
                  className="btn-sm"
                  variant="primary"
                  type="button"
                  style={{
                    float: 'right',
                    marginLeft: 15,
                  }}
                  onClick={() => {
                    history(-1);
                  }}
                >
                  Back
                </Button>
                <Pdf
                  targetRef={ref}
                  filename="form-report.pdf"
                  options={options}
                  x={35}
                  y={0}
                  scale={0.66}
                >
                  {({ toPdf }) => (
                    <button
                      className="btn-sm btn-info"
                      type="button"
                      style={{
                        float: 'right',
                      }}
                      onClick={toPdf}
                    >
                      Download Report
                    </button>
                  )}
                </Pdf>
              </>
            </div>
          </div>
        </div>
      </div>
      <div className="card p-4" style={{ margin: 0 }} ref={ref}>
        <div
          style={{
            marginLeft: 20,
            paddingBottom: 10,
            marginBottom: 30,
            borderBottom: 'solid 2px #999',
          }}
        >
          <img src={logobhp} alt="Logo" />
        </div>
        <div className="row">
          <div className="col-md-4">
            <div className="form-group">
              <label htmlFor="fdate">Date</label>
              <input
                name="fdate"
                id="fdate"
                type="date"
                className="form-control"
              />
            </div>
          </div>
          <div className="col-md-4">
            <div className="form-group">
              <label htmlFor="cont">Contractor</label>
              <input
                id="cont"
                type="text"
                className="form-control"
                value={QuestionForm.name}
              />
            </div>
          </div>
          <div className="col-md-4">
            <div className="form-group">
              <label htmlFor="audi">Auditor</label>
              <input
                id="audi"
                type="text"
                className="form-control"
                value={QuestionForm.name}
              />
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-3">
            <div className="form-group">
              <label htmlFor="loca">Location</label>
              <input id="loca" type="text" className="form-control" />
            </div>
          </div>
          <div className="col-md-3">
            <div className="form-group">
              <label htmlFor="city">City</label>
              <input id="city" type="text" className="form-control" />
            </div>
          </div>
          <div className="col-md-3">
            <div className="form-group">
              <label htmlFor="state">State</label>
              <input id="state" type="text" className="form-control" />
            </div>
          </div>
          <div className="col-md-3">
            <div className="form-group">
              <label htmlFor="task">Task</label>
              <input id="task" type="text" className="form-control" />
            </div>
          </div>
        </div>
        {/* {renderHeading()} */}
        {QuestionForm.audit_task_categories?.map((item) => {
          return (
            <div className="table-responsive" key={item.id}>
              <table className="table border">
                <tr style={{ backgroundColor: '#ddd' }}>
                  <th>{item.name}</th>
                  <th>ADEQUATE</th>
                  <th>DEFICIENT</th>
                  <th>N/A</th>
                  <th>COMMENTS</th>
                </tr>
                {item.questions?.map((question) => {
                  return (
                    <tr key={question.id}>
                      <td>{question.name} </td>
                      <td>
                        <input name="aa1" type="radio" />
                      </td>
                      <td>
                        <input name="aa1" type="radio" />
                      </td>
                      <td>
                        <input name="aa1" type="radio" />
                      </td>
                      <td>
                        <input type="text" className="form-control" />
                      </td>
                    </tr>
                  );
                })}
              </table>
            </div>
          );
        })}

        <Button className="btn" type="button">
          {' '}
          SUBMIT{' '}
        </Button>
      </div>
    </>
  );
};

export default ViewQuestionForm;
