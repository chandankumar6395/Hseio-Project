import React from 'react';
import { useLocation } from 'react-router-dom';

// eslint-disable-next-line import/no-cycle
import reduceChildRoutes from './reduceChildRoutes';

const SidebarNavList = (props) => {
  const { pages, depth, closeDrawer } = props;
  const router = useLocation();
  const currentRoute = router.pathname;

  const childRoutes = pages.reduce(
    (items, page) =>
      reduceChildRoutes({ items, page, currentRoute, depth, closeDrawer }),
    []
  );

  return <React.Fragment>{childRoutes}</React.Fragment>;
};

export default SidebarNavList;
