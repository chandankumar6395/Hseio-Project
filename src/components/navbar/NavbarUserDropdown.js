import * as React from 'react';
import styled from '@emotion/styled';
import { Power } from 'react-feather';
import { useNavigate } from 'react-router-dom';

import {
  Tooltip,
  Menu,
  MenuItem,
  IconButton as MuiIconButton,
} from '@mui/material';

import useAuth from '../../hooks/useAuth';

const IconButton = styled(MuiIconButton)`
  svg {
    width: 22px;
    height: 22px;
  }
`;

function NavbarUserDropdown() {
  const [anchorMenu, setAnchorMenu] = React.useState(null);
  const navigate = useNavigate();
  const { signOut } = useAuth();

  const toggleMenu = (event) => {
    setAnchorMenu(event.currentTarget);
  };

  const closeMenu = () => {
    setAnchorMenu(null);
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/auth/sign-in');
  };

  return (
    <>
      <Tooltip title="Account">
        <IconButton
          aria-owns={anchorMenu ? 'menu-appbar' : undefined}
          aria-haspopup="true"
          onClick={toggleMenu}
          color="inherit"
          size="large"
        >
          <Power />
        </IconButton>
      </Tooltip>
      <Menu
        id="menu-appbar"
        anchorEl={anchorMenu}
        open={Boolean(anchorMenu)}
        onClose={closeMenu}
      >
        <MenuItem onClick={closeMenu}>Profile</MenuItem>
        <MenuItem onClick={handleSignOut}>Sign out</MenuItem>
      </Menu>
    </>
  );
}

export default NavbarUserDropdown;
