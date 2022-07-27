import React from 'react';
import styled from '@emotion/styled';

import { Badge, Grid, Avatar, Typography, Link } from '@mui/material';

import { NavLink } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

const Footer = styled.div`
  background-color: ${(props) =>
    props.theme.sidebar.footer.background} !important;
  padding: ${(props) => props.theme.spacing(2.75)}
    ${(props) => props.theme.spacing(4)};
  border-right: 1px solid rgba(0, 0, 0, 0.12);
`;

const FooterText = styled(Typography)`
  color: ${(props) => props.theme.sidebar.footer.color};
`;

const FooterSubText = styled(Typography)`
  color: ${(props) => props.theme.sidebar.footer.color};
  font-size: 0.7rem;
  display: block;
  padding: 1px;
`;

const FooterBadge = styled(Badge)`
  margin-right: ${(props) => props.theme.spacing(1)};
  span {
    background-color: ${(props) =>
      props.theme.sidebar.footer.online.background};
    border: 1.5px solid ${(props) => props.theme.palette.common.white};
    height: 12px;
    width: 12px;
    border-radius: 50%;
  }
`;

const getPhotoURL = (item) => {
  if (item.employees.length > 0) {
    const employee = item.employees[0];
    return employee.primary_photo ? employee.primary_photo.url : '';
  }
  return '';
};

const getEmployeeId = (item) => {
  if (item && item.employees.length > 0) {
    const employee = item.employees[0];
    return employee.id;
  }
  return null;
};

const SidebarFooter = ({ ...rest }) => {
  const { user } = useAuth();
  console.log('user is ---', user);

  return (
    <>
      {getEmployeeId(user) && (
        <Footer {...rest}>
          <Grid container spacing={2}>
            <Grid item>
              <FooterBadge
                overlap="circular"
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
                variant="dot"
              >
                <Link
                  component={NavLink}
                  to={`/private/employees/view/${getEmployeeId(user)}`}
                >
                  {!!user && (
                    <Avatar alt={user.first_name} src={getPhotoURL(user)} />
                  )}
                </Link>
                {/* Demo data */}
                {!user && (
                  <Avatar
                    alt="Lucy Lavender"
                    src="/static/img/avatars/avatar-1.jpg"
                  />
                )}
              </FooterBadge>
            </Grid>
            <Grid item>
              {!!user && (
                <FooterText variant="body2">
                  {user.first_name} {user.last_name}
                </FooterText>
              )}
              {/* Demo data */}
              {!user && <FooterText variant="body2">Lucy Lavender</FooterText>}
              <FooterSubText variant="caption"> </FooterSubText>
            </Grid>
          </Grid>
        </Footer>
      )}
    </>
  );
};

export default SidebarFooter;
