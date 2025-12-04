'use client';

import React, { useState } from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
  Box,
  Typography,
  Button,
  IconButton,
  useMediaQuery,
  useTheme,
  Tooltip,
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  People as PeopleIcon,
  Settings as SettingsIcon,
  Logout as LogoutIcon,
  ExpandLess,
  ExpandMore,
  Close as CloseIcon,
  Visibility as VisibilityIcon,
  ManageAccounts as ManageAccountsIcon,
} from '@mui/icons-material';
import { usePathname, useRouter } from 'next/navigation';

const SIDEBAR_WIDTH = 250;
const SIDEBAR_COLLAPSED_WIDTH = 70;

interface SidebarProps {
  open: boolean;
  onToggle: () => void;
  darkMode: boolean;
  colors: {
    background: string;
    paper: string;
    text: string;
    textSecondary: string;
    border: string;
    hover: string;
    active: string;
  };
  primaryColor: string;
}

export default function Sidebar({
  open,
  onToggle,
  darkMode,
  colors,
  primaryColor,
}: SidebarProps) {
  const [usersOpen, setUsersOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleUsersClick = () => {
    setUsersOpen(!usersOpen);
  };

  const handleNavigation = (path: string) => {
    router.push(path);
    // Close sidebar on mobile after navigation
    if (isMobile) {
      onToggle();
    }
  };

  const handleLogout = () => {
    console.log('Logout clicked');
  };

  const isActive = (path: string) => pathname === path;
  const isUsersActive =
    pathname === '/users' ||
    pathname === '/users/view' ||
    pathname === '/users/management';

  const drawerContent = (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <Box
        sx={{
          p: { xs: 2, sm: 2.5, md: 3 },
          display: 'flex',
          alignItems: 'center',
          justifyContent: open ? 'space-between' : 'center',
          borderBottom: `1px solid ${colors.border}`,
        }}
      >
        <Typography
          variant="h5"
          sx={{
            fontWeight: 600,
            fontFamily: 'Poppins, sans-serif',
            color: colors.text,
            fontSize: { xs: '1.25rem', sm: '1.35rem', md: '1.5rem' },
            display: open || isMobile ? 'block' : 'none',
          }}
        >
          {open || isMobile ? 'VerifyPro' : 'VP'}
        </Typography>
        {!open && !isMobile && (
          <Typography
            variant="h6"
            sx={{
              fontWeight: 700,
              fontFamily: 'Poppins, sans-serif',
              color: colors.text,
              fontSize: '1.2rem',
            }}
          >
            VP
          </Typography>
        )}
        {isMobile && (
          <IconButton
            onClick={onToggle}
            sx={{
              color: colors.text,
            }}
          >
            <CloseIcon />
          </IconButton>
        )}
      </Box>

      {/* Navigation Items */}
      <List sx={{ flexGrow: 1, pt: 2, px: 1 }}>
        {/* Dashboard */}
        <ListItem disablePadding sx={{ mb: 1.5 }}>
          <Tooltip
            title={!open && !isMobile ? 'Dashboard' : ''}
            placement="right"
          >
            <ListItemButton
              onClick={() => handleNavigation('/')}
              sx={{
                color: colors.text,
                borderRadius: 1,
                justifyContent: open || isMobile ? 'flex-start' : 'center',
                px: open || isMobile ? 2 : 1,
                '&:hover': {
                  backgroundColor: colors.hover,
                },
                backgroundColor: isActive('/') ? colors.active : 'transparent',
              }}
            >
              <ListItemIcon
                sx={{
                  color: colors.text,
                  minWidth: open || isMobile ? { xs: 36, md: 40 } : 'auto',
                  justifyContent: 'center',
                }}
              >
                <DashboardIcon
                  sx={{ fontSize: { xs: '1.25rem', md: '1.5rem' } }}
                />
              </ListItemIcon>
              {(open || isMobile) && (
                <ListItemText
                  primary="Dashboard"
                  primaryTypographyProps={{
                    fontFamily: 'Poppins, sans-serif',
                    fontWeight: isActive('/') ? 600 : 400,
                    fontSize: { xs: '0.875rem', sm: '0.95rem', md: '1rem' },
                  }}
                />
              )}
            </ListItemButton>
          </Tooltip>
        </ListItem>

        {/* Users with Dropdown */}
        <ListItem disablePadding sx={{ mb: 1.5 }}>
          <Tooltip title={!open && !isMobile ? 'Users' : ''} placement="right">
            <ListItemButton
              onClick={handleUsersClick}
              sx={{
                color: colors.text,
                borderRadius: 1,
                justifyContent: open || isMobile ? 'flex-start' : 'center',
                px: open || isMobile ? 2 : 1,
                '&:hover': {
                  backgroundColor: colors.hover,
                },
                backgroundColor: isUsersActive ? colors.active : 'transparent',
              }}
            >
              <ListItemIcon
                sx={{
                  color: colors.text,
                  minWidth: open || isMobile ? { xs: 36, md: 40 } : 'auto',
                  justifyContent: 'center',
                }}
              >
                <PeopleIcon
                  sx={{ fontSize: { xs: '1.25rem', md: '1.5rem' } }}
                />
              </ListItemIcon>
              {(open || isMobile) && (
                <>
                  <ListItemText
                    primary="Users"
                    primaryTypographyProps={{
                      fontFamily: 'Poppins, sans-serif',
                      fontWeight: isUsersActive ? 600 : 400,
                      fontSize: { xs: '0.875rem', sm: '0.95rem', md: '1rem' },
                    }}
                  />
                  {usersOpen ? <ExpandLess /> : <ExpandMore />}
                </>
              )}
            </ListItemButton>
          </Tooltip>
        </ListItem>

        {/* Users Submenu */}
        {(open || isMobile) && (
          <Collapse in={usersOpen} timeout="auto" unmountOnExit>
            <List component="div" disablePadding sx={{ mb: 1.5 }}>
              <ListItemButton
                sx={{
                  pl: { xs: 3, md: 4 },
                  color: colors.text,
                  borderRadius: 1,
                  mx: 1,
                  '&:hover': {
                    backgroundColor: colors.hover,
                  },
                  backgroundColor: isActive('/users/view')
                    ? colors.active
                    : 'transparent',
                }}
                onClick={() => handleNavigation('/users/view')}
              >
                <ListItemIcon
                  sx={{ color: colors.text, minWidth: { xs: 36, md: 40 } }}
                >
                  <VisibilityIcon
                    sx={{ fontSize: { xs: '1.1rem', md: '1.25rem' } }}
                  />
                </ListItemIcon>
                <ListItemText
                  primary="View Users"
                  primaryTypographyProps={{
                    fontFamily: 'Poppins, sans-serif',
                    fontSize: { xs: '0.8rem', sm: '0.85rem', md: '0.9rem' },
                  }}
                />
              </ListItemButton>
              <ListItemButton
                sx={{
                  pl: { xs: 3, md: 4 },
                  color: colors.text,
                  borderRadius: 1,
                  mx: 1,
                  '&:hover': {
                    backgroundColor: colors.hover,
                  },
                  backgroundColor: isActive('/users/management')
                    ? colors.active
                    : 'transparent',
                }}
                onClick={() => handleNavigation('/users/management')}
              >
                <ListItemIcon
                  sx={{ color: colors.text, minWidth: { xs: 36, md: 40 } }}
                >
                  <ManageAccountsIcon
                    sx={{ fontSize: { xs: '1.1rem', md: '1.25rem' } }}
                  />
                </ListItemIcon>
                <ListItemText
                  primary="Manage Users"
                  primaryTypographyProps={{
                    fontFamily: 'Poppins, sans-serif',
                    fontSize: { xs: '0.8rem', sm: '0.85rem', md: '0.9rem' },
                  }}
                />
              </ListItemButton>
            </List>
          </Collapse>
        )}

        {/* Settings */}
        <ListItem disablePadding sx={{ mb: 1.5 }}>
          <Tooltip
            title={!open && !isMobile ? 'Settings' : ''}
            placement="right"
          >
            <ListItemButton
              onClick={() => handleNavigation('/settings')}
              sx={{
                color: colors.text,
                borderRadius: 1,
                justifyContent: open || isMobile ? 'flex-start' : 'center',
                px: open || isMobile ? 2 : 1,
                '&:hover': {
                  backgroundColor: colors.hover,
                },
                backgroundColor: isActive('/settings')
                  ? colors.active
                  : 'transparent',
              }}
            >
              <ListItemIcon
                sx={{
                  color: colors.text,
                  minWidth: open || isMobile ? { xs: 36, md: 40 } : 'auto',
                  justifyContent: 'center',
                }}
              >
                <SettingsIcon
                  sx={{ fontSize: { xs: '1.25rem', md: '1.5rem' } }}
                />
              </ListItemIcon>
              {(open || isMobile) && (
                <ListItemText
                  primary="Settings"
                  primaryTypographyProps={{
                    fontFamily: 'Poppins, sans-serif',
                    fontWeight: isActive('/settings') ? 600 : 400,
                    fontSize: { xs: '0.875rem', sm: '0.95rem', md: '1rem' },
                  }}
                />
              )}
            </ListItemButton>
          </Tooltip>
        </ListItem>
      </List>

      {/* Logout Button at Bottom */}
      <Box
        sx={{
          p: 2,
          borderTop: `1px solid ${colors.border}`,
        }}
      >
        <Tooltip title={!open && !isMobile ? 'Logout' : ''} placement="right">
          <Button
            fullWidth
            startIcon={
              open || isMobile ? (
                <LogoutIcon
                  sx={{ fontSize: { xs: '1.1rem', md: '1.25rem' } }}
                />
              ) : null
            }
            onClick={handleLogout}
            sx={{
              color: colors.text,
              justifyContent: open || isMobile ? 'flex-start' : 'center',
              textTransform: 'none',
              fontFamily: 'Poppins, sans-serif',
              py: { xs: 1.2, md: 1.5 },
              fontSize: { xs: '0.875rem', sm: '0.95rem', md: '1rem' },
              minWidth: !open && !isMobile ? '40px' : 'auto',
              '&:hover': {
                backgroundColor: colors.hover,
              },
            }}
          >
            {!open && !isMobile ? (
              <LogoutIcon sx={{ fontSize: '1.25rem' }} />
            ) : (
              'Logout'
            )}
          </Button>
        </Tooltip>
      </Box>
    </Box>
  );

  return (
    <Drawer
      variant={isMobile ? 'temporary' : 'persistent'}
      open={isMobile ? open : true}
      onClose={onToggle}
      sx={{
        width: isMobile
          ? open
            ? SIDEBAR_WIDTH
            : 0
          : open
          ? SIDEBAR_WIDTH
          : SIDEBAR_COLLAPSED_WIDTH,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: isMobile
            ? { xs: 280, sm: 260, md: SIDEBAR_WIDTH }
            : open
            ? SIDEBAR_WIDTH
            : SIDEBAR_COLLAPSED_WIDTH,
          boxSizing: 'border-box',
          backgroundColor: colors.paper,
          color: colors.text,
          borderRight: `1px solid ${colors.border}`,
          transition:
            'transform 0.3s ease-in-out, width 0.3s ease-in-out, background-color 0.3s ease',
          overflowX: 'hidden',
        },
      }}
      ModalProps={{
        keepMounted: true,
      }}
    >
      {drawerContent}
    </Drawer>
  );
}
