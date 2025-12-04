'use client';

import { useState, useMemo, Suspense } from 'react';
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Avatar,
  Chip,
  TextField,
  InputAdornment,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Stack,
  TablePagination,
  IconButton,
  Tooltip,
  useMediaQuery,
  useTheme as useMuiTheme,
  CircularProgress,
} from '@mui/material';
import {
  Search as SearchIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as VisibilityIcon,
} from '@mui/icons-material';
import { useTheme } from '@/contexts/ThemeContext';
import { useSearchParams, useRouter } from 'next/navigation';

// Mock data
const mockUsers = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john.doe@example.com',
    role: 'Admin',
    dateJoined: '2024-01-15',
    status: 'Active',
    avatar: '',
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    role: 'User',
    dateJoined: '2024-02-20',
    status: 'Active',
    avatar: '',
  },
  {
    id: 3,
    name: 'Alice Johnson',
    email: 'alice.j@example.com',
    role: 'Moderator',
    dateJoined: '2024-03-10',
    status: 'Active',
    avatar: '',
  },
  {
    id: 4,
    name: 'Bob Wilson',
    email: 'bob.wilson@example.com',
    role: 'User',
    dateJoined: '2024-04-05',
    status: 'Inactive',
    avatar: '',
  },
  {
    id: 5,
    name: 'Charlie Brown',
    email: 'charlie.b@example.com',
    role: 'User',
    dateJoined: '2024-05-12',
    status: 'Active',
    avatar: '',
  },
  {
    id: 6,
    name: 'Diana Prince',
    email: 'diana.prince@example.com',
    role: 'Admin',
    dateJoined: '2024-06-18',
    status: 'Active',
    avatar: '',
  },
  {
    id: 7,
    name: 'Edward Norton',
    email: 'edward.n@example.com',
    role: 'Moderator',
    dateJoined: '2024-07-22',
    status: 'Active',
    avatar: '',
  },
  {
    id: 8,
    name: 'Fiona Green',
    email: 'fiona.green@example.com',
    role: 'User',
    dateJoined: '2024-08-30',
    status: 'Active',
    avatar: '',
  },
];

function ViewUsersContent() {
  const { primaryColor, colors, darkMode } = useTheme();
  const muiTheme = useMuiTheme();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down('sm'));
  const router = useRouter();
  const searchParams = useSearchParams();

  const [searchQuery, setSearchQuery] = useState(
    searchParams.get('search') || ''
  );
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc' | 'date'>('asc');
  const [roleFilter, setRoleFilter] = useState<string>('all');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // Filter and sort users
  const filteredUsers = useMemo(() => {
    let filtered = [...mockUsers];

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(
        (user) =>
          user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          user.email.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Role filter
    if (roleFilter !== 'all') {
      filtered = filtered.filter((user) => user.role === roleFilter);
    }

    // Sort
    if (sortOrder === 'asc') {
      filtered.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortOrder === 'desc') {
      filtered.sort((a, b) => b.name.localeCompare(a.name));
    } else if (sortOrder === 'date') {
      filtered.sort(
        (a, b) =>
          new Date(b.dateJoined).getTime() - new Date(a.dateJoined).getTime()
      );
    }

    return filtered;
  }, [searchQuery, sortOrder, roleFilter]);

  // Paginated users
  const paginatedUsers = useMemo(() => {
    const start = page * rowsPerPage;
    return filteredUsers.slice(start, start + rowsPerPage);
  }, [filteredUsers, page, rowsPerPage]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchQuery(value);
    setPage(0);

    // Update URL search params
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set('search', value);
    } else {
      params.delete('search');
    }
    router.replace(`/users/view?${params.toString()}`);
  };

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'Admin':
        return '#EF4444';
      case 'Moderator':
        return '#F59E0B';
      case 'User':
        return '#10B981';
      default:
        return colors.textSecondary;
    }
  };

  const getStatusColor = (status: string) => {
    return status === 'Active' ? '#10B981' : '#94A3B8';
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

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
          View Users
        </Typography>
        <Typography
          variant="body1"
          sx={{
            fontFamily: 'Poppins, sans-serif',
            color: colors.textSecondary,
            fontSize: { xs: '0.875rem', sm: '0.95rem', md: '1rem' },
          }}
        >
          Manage and view all users in the system
        </Typography>
      </Box>

      {/* Filters Section */}
      <Paper
        sx={{
          p: { xs: 2, sm: 3 },
          mb: 3,
          backgroundColor: darkMode ? colors.paper : '#FFFFFF',
          borderRadius: 3,
          border: `1px solid ${colors.border}`,
        }}
      >
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={2}
          alignItems={{ xs: 'stretch', sm: 'center' }}
        >
          {/* Search */}
          <TextField
            fullWidth
            placeholder="Search by name or email..."
            value={searchQuery}
            onChange={handleSearchChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: colors.textSecondary }} />
                </InputAdornment>
              ),
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                color: colors.text,
                fontFamily: 'Poppins, sans-serif',
                '& fieldset': {
                  borderColor: colors.border,
                },
                '&:hover fieldset': {
                  borderColor: primaryColor,
                },
                '&.Mui-focused fieldset': {
                  borderColor: primaryColor,
                },
              },
              '& .MuiInputBase-input::placeholder': {
                color: colors.textSecondary,
                opacity: 0.7,
              },
            }}
          />

          {/* Sort Order */}
          <FormControl sx={{ minWidth: { xs: '100%', sm: 200 } }}>
            <InputLabel
              sx={{
                color: colors.textSecondary,
                '&.Mui-focused': { color: primaryColor },
              }}
            >
              Sort By
            </InputLabel>
            <Select
              value={sortOrder}
              onChange={(e) =>
                setSortOrder(e.target.value as 'asc' | 'desc' | 'date')
              }
              label="Sort By"
              sx={{
                color: colors.text,
                fontFamily: 'Poppins, sans-serif',
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: colors.border,
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: primaryColor,
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: primaryColor,
                },
                '& .MuiSvgIcon-root': {
                  color: colors.text,
                },
              }}
            >
              <MenuItem value="asc">A-Z</MenuItem>
              <MenuItem value="desc">Z-A</MenuItem>
              <MenuItem value="date">Newest First</MenuItem>
            </Select>
          </FormControl>

          {/* Role Filter */}
          <FormControl sx={{ minWidth: { xs: '100%', sm: 150 } }}>
            <InputLabel
              sx={{
                color: colors.textSecondary,
                '&.Mui-focused': { color: primaryColor },
              }}
            >
              Role
            </InputLabel>
            <Select
              value={roleFilter}
              onChange={(e) => {
                setRoleFilter(e.target.value);
                setPage(0);
              }}
              label="Role"
              sx={{
                color: colors.text,
                fontFamily: 'Poppins, sans-serif',
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: colors.border,
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: primaryColor,
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: primaryColor,
                },
                '& .MuiSvgIcon-root': {
                  color: colors.text,
                },
              }}
            >
              <MenuItem value="all">All Roles</MenuItem>
              <MenuItem value="Admin">Admin</MenuItem>
              <MenuItem value="Moderator">Moderator</MenuItem>
              <MenuItem value="User">User</MenuItem>
            </Select>
          </FormControl>
        </Stack>

        {/* Results Count */}
        <Typography
          variant="body2"
          sx={{
            mt: 2,
            color: colors.textSecondary,
            fontFamily: 'Poppins, sans-serif',
            fontSize: '0.875rem',
          }}
        >
          Showing {paginatedUsers.length} of {filteredUsers.length} users
        </Typography>
      </Paper>

      {/* Users Table */}
      <TableContainer
        component={Paper}
        sx={{
          backgroundColor: darkMode ? colors.paper : '#FFFFFF',
          borderRadius: 3,
          border: `1px solid ${colors.border}`,
          overflow: 'auto',
          overflowX: 'auto',
        }}
      >
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow
              sx={{
                backgroundColor: darkMode ? '#0F172A' : '#F8FAFC',
              }}
            >
              <TableCell
                sx={{
                  color: colors.text,
                  fontWeight: 600,
                  fontFamily: 'Poppins, sans-serif',
                  fontSize: { xs: '0.813rem', sm: '0.875rem' },
                  borderBottom: `1px solid ${colors.border}`,
                }}
              >
                User
              </TableCell>
              <TableCell
                sx={{
                  color: colors.text,
                  fontWeight: 600,
                  fontFamily: 'Poppins, sans-serif',
                  fontSize: { xs: '0.813rem', sm: '0.875rem' },
                  borderBottom: `1px solid ${colors.border}`,
                }}
              >
                Email
              </TableCell>
              <TableCell
                sx={{
                  color: colors.text,
                  fontWeight: 600,
                  fontFamily: 'Poppins, sans-serif',
                  fontSize: { xs: '0.813rem', sm: '0.875rem' },
                  borderBottom: `1px solid ${colors.border}`,
                }}
              >
                Role
              </TableCell>
              <TableCell
                sx={{
                  color: colors.text,
                  fontWeight: 600,
                  fontFamily: 'Poppins, sans-serif',
                  fontSize: { xs: '0.813rem', sm: '0.875rem' },
                  borderBottom: `1px solid ${colors.border}`,
                }}
              >
                Date Joined
              </TableCell>
              <TableCell
                sx={{
                  color: colors.text,
                  fontWeight: 600,
                  fontFamily: 'Poppins, sans-serif',
                  fontSize: { xs: '0.813rem', sm: '0.875rem' },
                  borderBottom: `1px solid ${colors.border}`,
                }}
              >
                Status
              </TableCell>
              <TableCell
                align="right"
                sx={{
                  color: colors.text,
                  fontWeight: 600,
                  fontFamily: 'Poppins, sans-serif',
                  fontSize: { xs: '0.813rem', sm: '0.875rem' },
                  borderBottom: `1px solid ${colors.border}`,
                }}
              >
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedUsers.map((user) => (
              <TableRow
                key={user.id}
                sx={{
                  '&:hover': {
                    backgroundColor: colors.hover,
                  },
                  transition: 'background-color 0.2s ease',
                }}
              >
                <TableCell
                  sx={{
                    borderBottom: `1px solid ${colors.border}`,
                  }}
                >
                  <Stack direction="row" spacing={2} alignItems="center">
                    <Avatar
                      sx={{
                        bgcolor: primaryColor,
                        width: { xs: 32, sm: 40 },
                        height: { xs: 32, sm: 40 },
                        fontSize: { xs: '0.813rem', sm: '0.875rem' },
                        fontWeight: 600,
                      }}
                    >
                      {getInitials(user.name)}
                    </Avatar>
                    <Typography
                      sx={{
                        color: colors.text,
                        fontFamily: 'Poppins, sans-serif',
                        fontWeight: 500,
                        fontSize: { xs: '0.813rem', sm: '0.875rem' },
                      }}
                    >
                      {user.name}
                    </Typography>
                  </Stack>
                </TableCell>
                <TableCell
                  sx={{
                    color: colors.textSecondary,
                    fontFamily: 'Poppins, sans-serif',
                    fontSize: { xs: '0.75rem', sm: '0.813rem' },
                    borderBottom: `1px solid ${colors.border}`,
                  }}
                >
                  {user.email}
                </TableCell>
                <TableCell
                  sx={{
                    borderBottom: `1px solid ${colors.border}`,
                  }}
                >
                  <Chip
                    label={user.role}
                    size={isMobile ? 'small' : 'medium'}
                    sx={{
                      backgroundColor: `${getRoleColor(user.role)}15`,
                      color: getRoleColor(user.role),
                      fontWeight: 600,
                      fontFamily: 'Poppins, sans-serif',
                      fontSize: { xs: '0.688rem', sm: '0.75rem' },
                    }}
                  />
                </TableCell>
                <TableCell
                  sx={{
                    color: colors.textSecondary,
                    fontFamily: 'Poppins, sans-serif',
                    fontSize: '0.813rem',
                    borderBottom: `1px solid ${colors.border}`,
                  }}
                >
                  {new Date(user.dateJoined).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                  })}
                </TableCell>
                <TableCell
                  sx={{
                    borderBottom: `1px solid ${colors.border}`,
                  }}
                >
                  <Chip
                    label={user.status}
                    size="small"
                    sx={{
                      backgroundColor: `${getStatusColor(user.status)}15`,
                      color: getStatusColor(user.status),
                      fontWeight: 600,
                      fontFamily: 'Poppins, sans-serif',
                      fontSize: '0.75rem',
                    }}
                  />
                </TableCell>
                <TableCell
                  align="right"
                  sx={{
                    borderBottom: `1px solid ${colors.border}`,
                  }}
                >
                  <Stack
                    direction="row"
                    spacing={0.5}
                    justifyContent="flex-end"
                  >
                    <Tooltip title="View Details">
                      <IconButton
                        size="small"
                        sx={{
                          color: colors.textSecondary,
                          '&:hover': {
                            color: primaryColor,
                            backgroundColor: colors.hover,
                          },
                        }}
                      >
                        <VisibilityIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Edit User">
                      <IconButton
                        size="small"
                        sx={{
                          color: colors.textSecondary,
                          '&:hover': {
                            color: '#F59E0B',
                            backgroundColor: colors.hover,
                          },
                        }}
                      >
                        <EditIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete User">
                      <IconButton
                        size="small"
                        sx={{
                          color: colors.textSecondary,
                          '&:hover': {
                            color: '#EF4444',
                            backgroundColor: colors.hover,
                          },
                        }}
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {/* Pagination */}
        <TablePagination
          rowsPerPageOptions={[5, 10, 25, 50]}
          component="div"
          count={filteredUsers.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          sx={{
            color: colors.text,
            borderTop: `1px solid ${colors.border}`,
            '& .MuiTablePagination-select': {
              color: colors.text,
            },
            '& .MuiTablePagination-selectIcon': {
              color: colors.text,
            },
            '& .MuiTablePagination-actions button': {
              color: colors.text,
            },
          }}
        />
      </TableContainer>
    </Box>
  );
}

export default function ViewUsersPage() {
  const { colors } = useTheme();

  return (
    <Suspense
      fallback={
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '50vh',
          }}
        >
          <CircularProgress sx={{ color: colors.text }} />
        </Box>
      }
    >
      <ViewUsersContent />
    </Suspense>
  );
}
