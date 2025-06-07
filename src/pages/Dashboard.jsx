import React from 'react';
import {
  Grid,
  Paper,
  Typography,
  Box,
  Card,
  CardContent,
  CardHeader,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Divider,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  People as PeopleIcon,
  AttachMoney as MoneyIcon,
  ShoppingCart as CartIcon,
  TrendingUp as TrendingIcon,
  TrendingDown as TrendingDownIcon,
  MoreVert as MoreVertIcon,
  Assessment as AssessmentIcon,
} from '@mui/icons-material';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  Legend,
} from 'recharts';

const data = [
  { name: 'Jan', sales: 4000, revenue: 2400 },
  { name: 'Feb', sales: 3000, revenue: 1398 },
  { name: 'Mar', sales: 2000, revenue: 9800 },
  { name: 'Apr', sales: 2780, revenue: 3908 },
  { name: 'May', sales: 1890, revenue: 4800 },
  { name: 'Jun', sales: 2390, revenue: 3800 },
];

const recentTransactions = [
  {
    id: 1,
    name: 'John Doe',
    amount: '₹2,500',
    date: '2024-02-20',
    status: 'Completed',
  },
  {
    id: 2,
    name: 'Jane Smith',
    amount: '₹1,800',
    date: '2024-02-19',
    status: 'Pending',
  },
  {
    id: 3,
    name: 'Mike Johnson',
    amount: '₹3,200',
    date: '2024-02-18',
    status: 'Completed',
  },
];

const StatCard = ({ title, value, icon, color }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Paper
      sx={{
        p: isMobile ? 1.5 : 2,
        display: 'flex',
        flexDirection: 'column',
        height: isMobile ? 120 : 140,
        bgcolor: color,
        color: 'white',
        transition: 'all 0.3s ease',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: theme.shadows[4],
        },
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography 
          color="inherit" 
          variant={isMobile ? "subtitle1" : "h6"} 
          gutterBottom
          sx={{ mb: 0 }}
        >
          {title}
        </Typography>
        {React.cloneElement(icon, { 
          sx: { 
            fontSize: isMobile ? 24 : 28,
            opacity: 0.8 
          } 
        })}
      </Box>
      <Typography 
        component="p" 
        variant={isMobile ? "h5" : "h4"}
        sx={{ 
          mt: 'auto',
          fontWeight: 'bold',
          textAlign: 'right'
        }}
      >
        {value}
      </Typography>
    </Paper>
  );
};

const Dashboard = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Box>
      <Typography 
        variant={isMobile ? "h5" : "h4"} 
        sx={{ 
          mb: isMobile ? 2 : 3,
          fontWeight: 'bold'
        }}
      >
        Dashboard
      </Typography>

      {/* Statistics Cards */}
      <Grid container spacing={isMobile ? 1 : 2} sx={{ mb: isMobile ? 2 : 3 }}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Total Revenue"
            value="₹50,000"
            icon={<MoneyIcon />}
            color="#2e7d32"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Total Sales"
            value="₹35,000"
            icon={<CartIcon />}
            color="#ed6c02"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Total Users"
            value="2,500"
            icon={<PeopleIcon />}
            color="#1976d2"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Total Orders"
            value="1,200"
            icon={<AssessmentIcon />}
            color="#9c27b0"
          />
        </Grid>
      </Grid>

      {/* Charts */}
      <Grid container spacing={isMobile ? 1 : 2}>
        <Grid item xs={12} md={8}>
          <Paper 
            sx={{ 
              p: isMobile ? 1 : 2,
              height: isMobile ? 300 : 400,
              transition: 'all 0.3s ease',
              '&:hover': {
                boxShadow: theme.shadows[4],
              }
            }}
          >
            <Typography 
              variant={isMobile ? "subtitle1" : "h6"} 
              gutterBottom
              sx={{ fontWeight: 'bold' }}
            >
              Sales Overview
            </Typography>
            <ResponsiveContainer width="100%" height="90%">
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="name" 
                  tick={{ fontSize: isMobile ? 10 : 12 }}
                />
                <YAxis 
                  tick={{ fontSize: isMobile ? 10 : 12 }}
                />
                <Tooltip />
                <Legend 
                  wrapperStyle={{
                    fontSize: isMobile ? 10 : 12,
                    paddingTop: 10
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="sales"
                  stroke="#8884d8"
                  name="Sales"
                  strokeWidth={2}
                />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="#82ca9d"
                  name="Revenue"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper 
            sx={{ 
              p: isMobile ? 1 : 2,
              height: isMobile ? 300 : 400,
              transition: 'all 0.3s ease',
              '&:hover': {
                boxShadow: theme.shadows[4],
              }
            }}
          >
            <Typography 
              variant={isMobile ? "subtitle1" : "h6"} 
              gutterBottom
              sx={{ fontWeight: 'bold' }}
            >
              Recent Transactions
            </Typography>
            <List sx={{ 
              maxHeight: isMobile ? 250 : 350,
              overflow: 'auto',
              '&::-webkit-scrollbar': {
                width: '4px',
              },
              '&::-webkit-scrollbar-track': {
                background: '#f1f1f1',
              },
              '&::-webkit-scrollbar-thumb': {
                background: '#888',
                borderRadius: '4px',
              },
            }}>
              {recentTransactions.map((transaction) => (
                <React.Fragment key={transaction.id}>
                  <ListItem sx={{ py: isMobile ? 1 : 2 }}>
                    <ListItemAvatar>
                      <Avatar sx={{ width: isMobile ? 32 : 40, height: isMobile ? 32 : 40 }}>
                        {transaction.name[0]}
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <Typography variant={isMobile ? "body2" : "body1"}>
                          {transaction.name}
                        </Typography>
                      }
                      secondary={
                        <Typography variant={isMobile ? "caption" : "body2"}>
                          {`${transaction.amount} - ${transaction.date}`}
                        </Typography>
                      }
                    />
                    <Typography
                      variant={isMobile ? "caption" : "body2"}
                      color={
                        transaction.status === 'Completed'
                          ? 'success.main'
                          : 'warning.main'
                      }
                      sx={{ 
                        fontWeight: 'bold',
                        ml: 1
                      }}
                    >
                      {transaction.status}
                    </Typography>
                  </ListItem>
                  <Divider variant="inset" component="li" />
                </React.Fragment>
              ))}
            </List>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard; 