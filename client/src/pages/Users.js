import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import Typography from '@mui/material/Typography';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import CustomTable from '../components/CustomTable'; // Adjust the import path as per your project structure

const Users = () => {
  const [open, setOpen] = useState(false);
  const [save, setSave] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [active, setActive] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState([]);

  const handleAddUser = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = () => {
    setSave([...save, { name, email, active }]);
    setOpen(false);
    setName('');
    setEmail('');
    setActive('');
  };

  const headers = ['Name', 'Email', 'Active', 'actions']; // Table headers
  const statusOptions = ['Active', 'Inactive']; // Active options for the dialog

  const mapData = (row, column) => {
    if (column === 'active') {
      return row[column] ? 'Active' : 'Inactive';
    }
    return row[column];
  };

  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', paddingTop: '20px', marginRight: '20px' }}>
        <Button
          variant="contained"
          color="primary"
          startIcon={<FontAwesomeIcon icon={faPlus} />}
          onClick={handleAddUser}
        >
          Add Users
        </Button>
      </Box>
      
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add New User</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="User Name"
            type="text"
            fullWidth
            variant="standard"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            margin="dense"
            id="email"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            select
            margin="dense"
            id="active"
            label="Active User"
            fullWidth
            variant="standard"
            value={active}
            onChange={(e) => setActive(e.target.value)}
            SelectProps={{
              native: true,
            }}
          >
            {statusOptions.map((option) => (
              <option key={option} value={option.toLowerCase()}>
                {option}
              </option>
            ))}
          </TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSave} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>

      <Box sx={{ marginTop: '20px' }}>
        {save.length > 0 && (
          <Typography variant="h6">Saved Users:</Typography>
        )}
        <CustomTable 
          columns={headers} 
          rows={save} 
          // searchQuery={searchQuery} 
          filters={filters} mapData={mapData} 
          setSearchQuery={setSearchQuery} 
          setFilters={setFilters} />
      </Box>
    </>
  );
};

export default Users;
