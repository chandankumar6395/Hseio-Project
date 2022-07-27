import React from 'react';

const CustomViewSectionWithLogo = ({ children, subTitle, logoUrl, title }) => {
  return (
    <div className="row">
      <div className="col-md-12">
        <div className="card card-widget widget-user shadow">
          <div className="widget-user-header bg-info">
            <h3 className="widget-user-username">
              <span>{title}</span>
            </h3>
            <h5 className="widget-user-desc">
              <span> {subTitle}</span>
            </h5>
          </div>
          <div className="widget-user-image">
            <img
              className="img-circle elevation-2"
              src={logoUrl}
              alt="User Avatar"
              style={{}}
            />
          </div>
          <div className="card-footer">
            <div className="row">{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomViewSectionWithLogo;
