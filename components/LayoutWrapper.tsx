'use client';

import React, { useState, useEffect } from 'react';
import {
  Box,
  IconButton,
  AppBar,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme as useMuiTheme,
  Switch,
  Avatar,
  Stack,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import Sidebar from './Sidebar';
import { useTheme } from '../contexts/ThemeContext';

const SIDEBAR_WIDTH = 250;
const SIDEBAR_COLLAPSED_WIDTH = 70;

export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const muiTheme = useMuiTheme();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down('md'), {
    noSsr: true,
  });
  const [sidebarOpen, setSidebarOpen] = useState(true); // Desktop: expanded/collapsed, Mobile: show/hide
  const { darkMode, toggleDarkMode, primaryColor, colors } = useTheme();

  // On mobile, close sidebar by default
  useEffect(() => {
    if (isMobile) {
      setSidebarOpen(false);
    } else {
      setSidebarOpen(true);
    }
  }, [isMobile]);

  const handleToggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        minHeight: '100vh',
        backgroundColor: colors.background,
        transition: 'background-color 0.3s ease',
      }}
    >
      {/* Sidebar */}
      <Sidebar
        open={sidebarOpen}
        onToggle={handleToggleSidebar}
        darkMode={darkMode}
        colors={colors}
        primaryColor={primaryColor}
      />

      {/* App Bar with Hamburger Menu */}
      <AppBar
        position="fixed"
        sx={{
          backgroundColor: colors.paper,
          color: colors.text,
          boxShadow: darkMode
            ? '0 1px 3px rgba(0,0,0,0.3)'
            : '0 1px 3px rgba(0,0,0,0.1)',
          zIndex: (theme) => theme.zIndex.drawer - 1,
          transition:
            'margin 0.3s ease-in-out, width 0.3s ease-in-out, background-color 0.3s ease',
          ...(!isMobile && {
            width: sidebarOpen
              ? `calc(100% - ${SIDEBAR_WIDTH}px)`
              : `calc(100% - ${SIDEBAR_COLLAPSED_WIDTH}px)`,
            ml: sidebarOpen
              ? `${SIDEBAR_WIDTH}px`
              : `${SIDEBAR_COLLAPSED_WIDTH}px`,
          }),
        }}
      >
        <Toolbar sx={{ minHeight: { xs: 56, sm: 64 }, px: { xs: 1, sm: 2 } }}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={handleToggleSidebar}
            sx={{
              mr: { xs: 0.5, sm: 2 },
              color: colors.text,
              p: { xs: 1, sm: 1.5 },
            }}
          >
            <MenuIcon sx={{ fontSize: { xs: '1.25rem', sm: '1.5rem' } }} />
          </IconButton>
          <Box sx={{ flexGrow: 1, minWidth: 0, overflow: 'hidden' }}>
            <Typography
              variant="h6"
              sx={{
                fontFamily: 'Poppins, sans-serif',
                fontWeight: 600,
                fontSize: { xs: '0.875rem', sm: '1.15rem', md: '1.25rem' },
                color: colors.text,
                mb: { xs: 0, sm: 0.25 },
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              <Box
                component="span"
                sx={{ display: { xs: 'inline', sm: 'none' } }}
              >
                Welcome!
              </Box>
              <Box
                component="span"
                sx={{ display: { xs: 'none', sm: 'inline' } }}
              >
                Welcome to VerifyPro
              </Box>
            </Typography>
            <Typography
              variant="caption"
              sx={{
                fontFamily: 'Poppins, sans-serif',
                fontStyle: 'italic',
                fontSize: { xs: '0.688rem', sm: '0.75rem', md: '0.813rem' },
                color: primaryColor,
                fontWeight: 500,
                display: { xs: 'none', sm: 'block' },
                lineHeight: 1,
              }}
            >
              Your Partner in Secure Verification.
            </Typography>
          </Box>

          {/* Right side items */}
          <Stack
            direction="row"
            alignItems="center"
            spacing={{ xs: 0.25, sm: 2 }}
            sx={{ flexShrink: 0 }}
          >
            {/* Dark Mode Toggle */}
            <Stack
              direction="row"
              alignItems="center"
              spacing={{ xs: 0, sm: 0.5 }}
            >
              <LightModeIcon
                sx={{
                  fontSize: { xs: '0', sm: '1.1rem', md: '1.3rem' },
                  color: !darkMode ? primaryColor : colors.textSecondary,
                  transition: 'color 0.3s ease',
                  display: { xs: 'none', sm: 'block' },
                  width: { xs: 0, sm: 'auto' },
                  height: { xs: 0, sm: 'auto' },
                }}
              />
              <Switch
                checked={darkMode}
                onChange={toggleDarkMode}
                size="small"
                sx={{
                  transform: { xs: 'scale(0.8)', sm: 'scale(1)' },
                  '& .MuiSwitch-switchBase.Mui-checked': {
                    color: primaryColor,
                  },
                  '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                    backgroundColor: primaryColor,
                  },
                }}
              />
              <DarkModeIcon
                sx={{
                  fontSize: { xs: '0', sm: '1.1rem', md: '1.3rem' },
                  color: darkMode ? primaryColor : colors.textSecondary,
                  transition: 'color 0.3s ease',
                  display: { xs: 'none', sm: 'block' },
                  width: { xs: 0, sm: 'auto' },
                  height: { xs: 0, sm: 'auto' },
                }}
              />
            </Stack>

            {/* Admin Avatar */}
            <Avatar
              alt="Admin"
              sx={{
                width: { xs: 32, sm: 36, md: 40 },
                height: { xs: 32, sm: 36, md: 40 },
                bgcolor: primaryColor,
                color: 'white',
                fontFamily: 'Poppins, sans-serif',
                fontWeight: 600,
                fontSize: { xs: '0.875rem', sm: '1rem' },
                cursor: 'pointer',
                transition: 'opacity 0.3s ease',
                '&:hover': {
                  opacity: 0.8,
                },
              }}
            >
              A
            </Avatar>
          </Stack>
        </Toolbar>
      </AppBar>

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          backgroundColor: colors.background,
          p: { xs: 2, sm: 3, md: 4 },
          mt: '64px', // AppBar height
          fontFamily: 'Poppins, sans-serif',
          transition: 'margin 0.3s ease-in-out, background-color 0.3s ease',
          minHeight: 'calc(100vh - 64px)',
          width: '100%',
        }}
      >
        {children}
      </Box>
    </Box>
  );
}
