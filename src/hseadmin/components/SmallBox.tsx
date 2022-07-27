import React from 'react';
import { Link } from 'react-router-dom';

export interface SmallBoxProps {
  type: 'info' | 'success' | 'warning' | 'danger';
  icon?: string;
  count: number;
  title: string;
  navigateTo: string;
  subTitle?: string;
  showlink?: string;
}
const SmallBox = ({
  type = 'info',
  icon = 'ion-bag',
  count,
  title,
  navigateTo,
  subTitle = '',
  showlink,
}: SmallBoxProps) => {
  console.log('showLink', showlink);
  return (
    <>
      {showlink !== 'off' && (
        <Link to={navigateTo} className={`small-box bg-${type}`}>
          <div className="inner">
            <h3>{count}</h3>
            <p>{title}</p>
            {subTitle && <p>{subTitle}</p>}
          </div>
          <div className="icon">
            <i className={`ion ${icon || 'ion-bag'}`} />
          </div>
          <div className="small-box-footer">
            <span className="mr-2">More Info</span>
            <i className="fa fa-arrow-circle-right" />
          </div>
        </Link>
      )}
      {showlink === 'off' && (
        <>
          <div className={`small-box bg-${type}`}>
            <div className="inner">
              <h3>{count}</h3>
              <p>{title}</p>
              {subTitle && <p>{subTitle}</p>}
            </div>
            <div className="icon">
              <i className={`ion ${icon || 'ion-bag'}`} />
            </div>
            <div className="small-box-footer">
              <i className="fa fa-arrow-circle-right" />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default SmallBox;
