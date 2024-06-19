import React, { useState, useEffect } from 'react';
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


const TransactionList = () => {
  const [transactions, setTransactions] = useState([]);
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

  useEffect(() => {
    const fetchTransactions = async () => {
    
      try {
        const response = await fetch('/api/transactions');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log("data",data);
  
        const formattedData = data.map(transaction => ({
          ...transaction,
          issueDate: moment(transaction.issueDate).format("DD MMM YYYY"),
          dueDate: moment(transaction.dueDate).format("DD MMM YYYY"),
        }));
  
        setTransactions(formattedData);
      } catch (error) {
        console.error('Error fetching transactions:', error);
      }
    };
  
    fetchTransactions();
  }, []);

const handleloadData =()=> {
  const payload = {
    
  }


}
 


  return (
    <>
      <Box width='10%' 
        sx={{ 
          display: 'flex', 
          justifyContent: 'flex-end', 
          paddingTop: '20px', 
         
        }}
        >
          <Accordion> 
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>Filter By:</Typography>
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
      </Box>

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
      


      <Box width="60%" margin="auto" paddingTop="2%">
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
