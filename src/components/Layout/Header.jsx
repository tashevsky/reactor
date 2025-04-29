import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Switch,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
} from '@mui/material';
import { useLoginState } from '../../providers/AuthProvider';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import MenuIcon from '@mui/icons-material/Menu';

const Header = ({ toggleDrawer }) => {
  const user = useSelector((state) => state.app.user);
  const { logout } = useLoginState();
  const theme = useTheme();
  const location = useLocation();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const navItems = [
    { label: 'Home', path: '/' },
    { label: 'About', path: '/about' },
    { label: 'Feedback', path: '/feedback' },
    { label: 'Media', path: '/media' }
  ];

  return (
    <AppBar position="sticky">
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={toggleDrawer}
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>

        {navItems.map((item) => (
          <Button
            key={item.path}
            color="inherit"
            component={RouterLink}
            to={item.path}
            sx={{
              position: 'relative',
              '&::after': {
                content: '""',
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                height: location.pathname === item.path ? 2 : 0,
                backgroundColor: 'primary.light',
                transition: 'height 0.2s ease',
              },
              '&:hover::after': {
                height: 2,
                backgroundColor: 'primary.main',
              },
            }}
          >
            {item.label}
          </Button>
        ))}

        <Typography 
          variant="h6" 
          component={RouterLink} 
          sx={{ 
            flexGrow: 1,
            textDecoration: 'none',
            color: 'inherit'
          }} 
          to='/' 
        />

        <Switch
          checked={theme.palette.mode === 'dark'}
          onChange={() => theme.toggleTheme()}
          icon={<Brightness7Icon />}
          checkedIcon={<Brightness4Icon />}
        />

        {user && (
          <>
            <IconButton onClick={handleMenu} color="inherit">
              <Avatar>{user.email.charAt(0).toUpperCase()}</Avatar>
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem disabled>Logged as {user.email}</MenuItem>
              <MenuItem component={RouterLink} to='/profile'>
                Edit Profile
              </MenuItem>
              {user?.role === 'admin' && (
                <MenuItem component={RouterLink} to='/admin'>
                  Tech Panel
                </MenuItem>
              )}
              <MenuItem onClick={() => { handleClose(); logout(); }}>
                Log Out
              </MenuItem>
            </Menu>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;