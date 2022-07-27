import React from 'react';

export const renderTitleAndContent = (title, content) => {
  return (
    <>
      <div className="col-md-4">
        <div className="custonbor">
          <dt className="m-0">{title}</dt>
          <dd className="m-0">{content}</dd>
        </div>
      </div>
    </>
  );
};
