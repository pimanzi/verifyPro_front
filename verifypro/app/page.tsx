'use client';

import { Box, Typography, Grid } from '@mui/material';
import { useTheme } from '@/contexts/ThemeContext';
import StatCard from '@/components/dashboard/StatCard';
import StatusPieChart from '@/components/dashboard/StatusPieChart';
import TransactionsLineChart from '@/components/dashboard/TransactionsLineChart';
import VolumeBarChart from '@/components/dashboard/VolumeBarChart';
import RecentTransactions from '@/components/dashboard/RecentTransactions';
import RecentUsers from '@/components/dashboard/RecentUsers';
import SystemHealth from '@/components/dashboard/SystemHealth';
import AssessmentIcon from '@mui/icons-material/Assessment';
import VerifiedIcon from '@mui/icons-material/Verified';
import PendingActionsIcon from '@mui/icons-material/PendingActions';

export default function DashboardPage() {
  const { primaryColor, colors } = useTheme();

  return (
    <Box sx={{ p: { xs: 2, sm: 3, md: 4 } }}>
      {/* Page Header */}
      <Box sx={{ mb: 4 }}>
        <Typography
          variant="h3"
          sx={{
            fontFamily: 'Poppins, sans-serif',
            fontWeight: 700,
            color: colors.text,
            mb: 1,
            fontSize: { xs: '1.75rem', sm: '2rem', md: '2rem' },
          }}
        >
          Dashboard
        </Typography>
        <Typography
          variant="body1"
          sx={{
            fontFamily: 'Poppins, sans-serif',
            color: colors.textSecondary,
            fontSize: { xs: '0.875rem', sm: '0.95rem', md: '1rem' },
          }}
        >
          Welcome back! Here&apos;s what&apos;s happening with your transactions
          today.
        </Typography>
      </Box>

      {/* Top Stats Cards */}
      <Grid container spacing={{ xs: 2, sm: 3 }} sx={{ mb: { xs: 3, sm: 4 } }}>
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <StatCard
            title="Total Transactions"
            value="12,458"
            subtitle="Overall processed"
            accentColor={primaryColor}
            icon={<AssessmentIcon sx={{ fontSize: '1.5rem' }} />}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <StatCard
            title="Verified Transactions"
            value="8,097"
            subtitle="Successfully validated"
            accentColor="#10B981"
            icon={<VerifiedIcon sx={{ fontSize: '1.5rem' }} />}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <StatCard
            title="Pending Verifications"
            value="3,115"
            subtitle="Awaiting review"
            accentColor="#F59E0B"
            icon={<PendingActionsIcon sx={{ fontSize: '1.5rem' }} />}
          />
        </Grid>
      </Grid>

      {/* Charts Section - Top Row: 2 charts */}
      <Grid container spacing={{ xs: 2, sm: 3 }} sx={{ mb: { xs: 3, sm: 4 } }}>
        <Grid size={{ xs: 12, lg: 6 }}>
          <StatusPieChart />
        </Grid>
        <Grid size={{ xs: 12, lg: 6 }}>
          <TransactionsLineChart />
        </Grid>
        {/* Bottom Row: 1 chart + SystemHealth */}
        <Grid size={{ xs: 12, lg: 6 }}>
          <VolumeBarChart />
        </Grid>
        <Grid size={{ xs: 12, lg: 6 }}>
          <SystemHealth />
        </Grid>
      </Grid>

      {/* Recent Activity Section */}
      <Grid container spacing={{ xs: 2, sm: 3 }}>
        <Grid size={{ xs: 12, lg: 8 }}>
          <RecentTransactions />
        </Grid>
        <Grid size={{ xs: 12, lg: 4 }}>
          <RecentUsers />
        </Grid>
      </Grid>
    </Box>
  );
}
