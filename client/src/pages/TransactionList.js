import React, { useState } from 'react';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Checkbox,
  FormGroup,
  FormControlLabel,
  Box,
  TextField,
  InputAdornment,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  Menu,
  MenuItem
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SearchIcon from '@mui/icons-material/Search';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import moment from 'moment';

// Assuming `transactions` data is imported or defined elsewhere in your code

const transactions = [
  {
      invoiceNumber: 300500,
      status: "Paid",
      subscription: "Platinum Subscription Plan",
      price: "799.00",
      issueDate: moment().subtract(1, "days").format("DD MMM YYYY"),
      dueDate: moment().add(1, "month").subtract(1, "days").format("DD MMM YYYY"),
  },
  {
      invoiceNumber: 300499,
      status: "Due",
      subscription: "Gold Subscription Plan",
      price: "599.00",
      issueDate: moment().subtract(3, "days").format("DD MMM YYYY"),
      dueDate: moment().subtract(3, "days").add(1, "month").format("DD MMM YYYY"),
  },
  {
      invoiceNumber: 300498,
      status: "Overdue",
      subscription: "Silver Subscription Plan",
      price: "299.00",
      issueDate: moment().subtract(5, "days").format("DD MMM YYYY"),
      dueDate: moment().subtract(5, "days").add(1, "month").format("DD MMM YYYY"),
  },
  {
      invoiceNumber: 300497,
      status: "Paid",
      subscription: "Basic Subscription Plan",
      price: "199.00",
      issueDate: moment().subtract(10, "days").format("DD MMM YYYY"),
      dueDate: moment().subtract(10, "days").add(1, "month").format("DD MMM YYYY"),
  },
  {
      invoiceNumber: 300496,
      status: "Pending",
      subscription: "Gold Subscription Plan",
      price: "599.00",
      issueDate: moment().subtract(2, "days").format("DD MMM YYYY"),
      dueDate: moment().subtract(2, "days").add(1, "month").format("DD MMM YYYY"),
  },
  {
      invoiceNumber: 300495,
      status: "Cancelled",
      subscription: "Platinum Subscription Plan",
      price: "799.00",
      issueDate: moment().subtract(15, "days").format("DD MMM YYYY"),
      dueDate: moment().subtract(15, "days").add(1, "month").format("DD MMM YYYY"),
  },
  {
      invoiceNumber: 300494,
      status: "Due",
      subscription: "Basic Subscription Plan",
      price: "199.00",
      issueDate: moment().subtract(7, "days").format("DD MMM YYYY"),
      dueDate: moment().subtract(7, "days").add(1, "month").format("DD MMM YYYY"),
  },
  {
      invoiceNumber: 300493,
      status: "Overdue",
      subscription: "Silver Subscription Plan",
      price: "299.00",
      issueDate: moment().subtract(9, "days").format("DD MMM YYYY"),
      dueDate: moment().subtract(9, "days").add(1, "month").format("DD MMM YYYY"),
  },
  {
      invoiceNumber: 300492,
      status: "Paid",
      subscription: "Gold Subscription Plan",
      price: "599.00",
      issueDate: moment().subtract(12, "days").format("DD MMM YYYY"),
      dueDate: moment().subtract(12, "days").add(1, "month").format("DD MMM YYYY"),
  },
  {
      invoiceNumber: 300491,
      status: "Pending",
      subscription: "Platinum Subscription Plan",
      price: "799.00",
      issueDate: moment().subtract(20, "days").format("DD MMM YYYY"),
      dueDate: moment().subtract(20, "days").add(1, "month").format("DD MMM YYYY"),
  },
  {
      invoiceNumber: 123,
      status: "Pending",
      subscription: "Platinum Subscription Plan",
      price: "799.00",
      issueDate: moment().subtract(20, "days").format("DD MMM YYYY"),
      dueDate: moment().subtract(20, "days").add(1, "month").format("DD MMM YYYY"),
  }
];


const TransactionList = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const open = Boolean(anchorEl);
  const [selectedStatus, setSelectedStatus] = useState([]);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleStatusChange = (status) => {
    setSelectedStatus(prev => {
      if (prev.includes(status)) {
        return prev.filter(s => s !== status);
      } else {
        return [...prev, status];
      }
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Paid':
        return 'success.main';
      case 'Due':
        return 'warning.main';
      case 'Overdue':
        return 'error.main';
      default:
        return 'text.primary';
    }
  };

  const statusOptions = ['Paid', 'Due', 'Overdue', 'Pending', 'Cancelled'];

  const filteredTransactions = transactions.filter(transaction =>
    (selectedStatus.length === 0 || selectedStatus.includes(transaction.status)) &&
    (transaction.subscription.toLowerCase().includes(searchQuery.toLowerCase()) ||
     transaction.status.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <>
      <Box width="60%" margin="auto" paddingTop="2%">
        <TextField 
          variant="outlined"
          placeholder="Search transactions..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          sx={{ width: '30%', margin: 'auto', paddingBottom: '5%' }}
        />
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>Filter Options</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <FormGroup>
              {statusOptions.map((status) => (
                <FormControlLabel
                  control={<Checkbox checked={selectedStatus.includes(status)} onChange={() => handleStatusChange(status)} name={status} />}
                  label={status}
                  key={status}
                />
              ))}
            </FormGroup>
          </AccordionDetails>
        </Accordion>
        <TableContainer component={Paper}>
          <Table aria-label="customized table">
            <TableHead>
              <TableRow>
                <TableCell>#</TableCell>
                <TableCell>Subscription</TableCell>
                <TableCell>Issue Date</TableCell>
                <TableCell>Due Date</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredTransactions.map((transaction, index) => (
                <TableRow key={`transaction-${transaction.invoiceNumber}`}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{transaction.subscription}</TableCell>
                  <TableCell>{transaction.issueDate}</TableCell>
                  <TableCell>{transaction.dueDate}</TableCell>
                  <TableCell>${transaction.price}</TableCell>
                  <TableCell sx={{ color: getStatusColor(transaction.status) }}>{transaction.status}</TableCell>
                  <TableCell>
                    <IconButton aria-label="more" id="long-button" aria-controls={open ? 'long-menu' : undefined} aria-expanded={open ? 'true' : undefined} aria-haspopup="true" onClick={handleClick}>
                      <MoreVertIcon />
                    </IconButton>
                    <Menu id="long-menu" MenuListProps={{ 'aria-labelledby': 'long-button', }} anchorEl={anchorEl} open={open} onClose={handleClose}>
                      <MenuItem onClick={handleClose}><VisibilityIcon fontSize="small" /> View Details</MenuItem>
                      <MenuItem onClick={handleClose}><EditIcon fontSize="small" /> Edit</MenuItem>
                      <MenuItem onClick={handleClose} style={{ color: 'red' }}><DeleteIcon fontSize="small" /> Remove</MenuItem>
                    </Menu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
};

export default TransactionList;
