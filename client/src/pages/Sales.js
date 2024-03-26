import React from 'react';
import { Card, CardContent, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// Dummy sales data
const salesData = [
  { id: 1, product: 'Product A', amount: 100, date: '2024-01-01' },
  { id: 2, product: 'Product B', amount: 150, date: '2024-01-02' },
  { id: 3, product: 'Product C', amount: 200, date: '2024-01-03' },
];

// Chart data
const chartData = {
  labels: salesData.map((data) => data.product),
  datasets: [
    {
      label: 'Sales',
      data: salesData.map((data) => data.amount),
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
  ],
};

const options = {
  plugins: {
    title: {
      display: true,
      text: 'Sales Chart',
    },
  },
};

const Sales = () => {
  return (
    <div>
      <Card  sx={{ marginBottom: 2 }}>
        <CardContent>
          <Typography variant="h5" component="div">
            Total Sales
          </Typography>
          <Typography variant="body2">
            ${salesData.reduce((total, curr) => total + curr.amount, 0)}
          </Typography>
        </CardContent>
      </Card>
      <TableContainer component={Paper} sx={{ marginBottom: 2 }}>
        <Table aria-label="sales table">
          <TableHead>
            <TableRow>
              <TableCell>ProductName</TableCell>
              <TableCell align="right">QuantitySold ($)</TableCell>
              <TableCell align="right">SaleDate </TableCell>
              <TableCell>SalePrice </TableCell>
              <TableCell align="right">CustomerID  ($)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {salesData.map((row) => (
              <TableRow key={row.id}>
                <TableCell component="th" scope="row">
                  {row.product}
                </TableCell>
                <TableCell align="right">{row.amount}</TableCell>
                <TableCell align="right">{row.date}</TableCell>
                <TableCell align="right">{row.amount}</TableCell>
                <TableCell align="right">{row.date}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {/* Chart within a Card */}
      <Card sx={{ width: '40%', marginBottom: 2 }}>
        <CardContent>
          <Typography variant="h6" component="div">
            Sales Chart
          </Typography>
          <div style={{ height: '400px', width: '100%' }}>
            <Bar data={chartData} options={options} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Sales;
