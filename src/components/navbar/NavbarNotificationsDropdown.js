import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';

import {
  Avatar as MuiAvatar,
  Badge,
  Box,
  Button,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Popover as MuiPopover,
  SvgIcon,
  Tooltip,
  Typography,
} from '@mui/material';
import { Bell, Home, UserPlus, Server } from 'react-feather';

const Popover = styled(MuiPopover)`
  .MuiPaper-root {
    width: 300px;
    ${(props) => props.theme.shadows[1]};
    border: 1px solid ${(props) => props.theme.palette.divider};
  }
`;

const Indicator = styled(Badge)`
  .MuiBadge-badge {
    background: ${(props) => props.theme.header.indicator.background};
    color: ${(props) => props.theme.palette.common.white};
  }
`;

const Avatar = styled(MuiAvatar)`
  background: ${(props) => props.theme.palette.primary.main};
`;

const NotificationHeader = styled(Box)`
  text-align: center;
  border-bottom: 1px solid ${(props) => props.theme.palette.divider};
`;

function Notification({ title, description, Icon }) {
  return (
    <ListItem divider component={Link} to="#">
      <ListItemAvatar>
        <Avatar>
          <SvgIcon fontSize="small">
            <Icon />
          </SvgIcon>
        </Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={title}
        primaryTypographyProps={{
          variant: 'subtitle2',
          color: 'textPrimary',
        }}
        secondary={description}
      />
    </ListItem>
  );
}

function NavbarNotificationsDropdown() {
  const ref = useRef(null);
  const [isOpen, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Tooltip title="Notifications">
        <IconButton color="inherit" ref={ref} onClick={handleOpen} size="large">
          <Indicator badgeContent={7}>
            <Bell />
          </Indicator>
        </IconButton>
      </Tooltip>
      <Popover
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        anchorEl={ref.current}
        onClose={handleClose}
        open={isOpen}
      >
        <NotificationHeader p={2}>
          <Typography variant="subtitle1" color="textPrimary">
            7 New Notifications
          </Typography>
        </NotificationHeader>
        <>
          <List disablePadding>
            <Notification
              title="Safety Training Completed"
              description="Download your certificate"
              Icon={Server}
            />
            <Notification
              title="New Employee Added"
              description="Nishant is new employee in the company."
              Icon={UserPlus}
            />
            <Notification
              title="New Task Added"
              description="Please contact your supervisor."
              Icon={Bell}
            />
            <Notification
              title="Salary has been credited."
              description="Enjoy your weekend."
              Icon={Home}
            />
          </List>
          <Box p={1} display="flex" justifyContent="center">
            <Button size="small" component={Link} to="#">
              Show all notifications
            </Button>
          </Box>
        </>
      </Popover>
    </>
  );
}

export default NavbarNotificationsDropdown;
