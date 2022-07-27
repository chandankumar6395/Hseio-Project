import React, { useEffect, useState } from 'react';
import './Dashboard.css';
import {
  KEY_TYPE_ID,
  TYPE_COMPANY_OWNER,
  TYPE_DIVISION_OWNER,
  TYPE_EMPLOYEE,
  TYPE_JOB_SITE_OWNER,
  TYPE_SYSTEM_ADMIN,
} from '../../constants/Constants';
import DashboardSystemAdmin from './DashboardSystemAdmin';
import DashboardCompany from './DashboardCompany';
import DashboardDivision from './DashboardDivision';
import DashboardJobSite from './DashboardJobSite';
import DashboardEmployee from './DashboardEmployee';

const Dashboard = () => {
  const [typeId, setTypeId] = useState<number | null>(-1);

  useEffect(() => {
    console.log('---->', typeId);
    const value: string | null = localStorage.getItem(KEY_TYPE_ID);
    if (value !== null) {
      setTypeId(+value);
    }
  }, []);

  return (
    <>
      {typeId === TYPE_SYSTEM_ADMIN && <DashboardSystemAdmin />}
      {typeId === TYPE_COMPANY_OWNER && <DashboardCompany />}
      {typeId === TYPE_DIVISION_OWNER && <DashboardDivision />}
      {typeId === TYPE_JOB_SITE_OWNER && <DashboardJobSite />}
      {typeId === TYPE_EMPLOYEE && <DashboardEmployee />}
    </>
  );
};

export default Dashboard;
