import { useNavigate } from 'react-router-dom';
import React from 'react';
import { Button } from 'react-bootstrap';

const CustomTopSection = ({ title, link }) => {
  console.log(link);
  const history = useNavigate();
  return (
    <section className="content-header">
      <div className="container-fluid">
        <div className="row mb-1 mt-0">
          <div className="col-sm-6">
            <h1>{title}</h1>
          </div>
          <div className="col-sm-6">
            <ol className="breadcrumb float-sm-right">
              <li className="breadcrumb-item active">
                <Button
                  className="btn-sm"
                  variant="primary"
                  type="button"
                  style={{ float: 'right' }}
                  onClick={() => {
                    history(-1);
                  }}
                >
                  Back
                </Button>
              </li>
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CustomTopSection;
