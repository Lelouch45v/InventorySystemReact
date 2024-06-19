// CustomTable.js
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Box, TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, TextField, Select, MenuItem } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';

const CustomTable = ({ columns, rows, searchQuery, filters, mapData, setSearchQuery, setFilters }) => {
  const [filteredRows, setFilteredRows] = useState(rows);

  // Function to filter rows based on search query and active filters
  const filterRows = () => {
    let filteredData = rows;

    // Filter by search query
    if (searchQuery) {
      filteredData = filteredData.filter(row =>
        columns.some(column => row[column.toLowerCase()].toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    // Filter by active filters
    if (filters.length > 0) {
      filteredData = filteredData.filter(row =>
        filters.includes(row.active.toLowerCase())
      );
    }

    setFilteredRows(filteredData);
  };

  // React to changes in searchQuery and filters
  useEffect(() => {
    filterRows();
  }, [searchQuery, filters, rows, columns]);

  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <TextField 
          variant="outlined"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)} // Use setSearchQuery from props
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          sx={{ width: '30%', marginRight: '10px' }}
        />
        <Select
          multiple
          value={filters}
          onChange={(e) => setFilters(e.target.value)} // Use setFilters from props
          variant="outlined"
          displayEmpty
          renderValue={(selected) => (selected.length === 0 ? 'Filter by Active' : `${selected.length} Active`)}
          sx={{ minWidth: '120px' }}
        >
          <MenuItem disabled value="">
            <em>Filter by Active</em>
          </MenuItem>
          <MenuItem value={'active'}>Active</MenuItem>
          <MenuItem value={'inactive'}>Inactive</MenuItem>
        </Select>
      </Box>

      <TableContainer component={Paper}>
        <Table aria-label="customized table">
          <TableHead>
            <TableRow>
              {columns.map((column, index) => (
                <TableCell key={index}>{column}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredRows.map((row, index) => (
              <TableRow key={index}>
                {columns.map((column, idx) => (
                  <TableCell key={idx}>{mapData ? mapData(row, column.toLowerCase()) : row[column.toLowerCase()]}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

CustomTable.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.string).isRequired,
  rows: PropTypes.arrayOf(PropTypes.object).isRequired,
  searchQuery: PropTypes.string.isRequired, // Declare searchQuery and filters as required props
  filters: PropTypes.arrayOf(PropTypes.string).isRequired,
  mapData: PropTypes.func,
  setSearchQuery: PropTypes.func.isRequired, // Declare setSearchQuery and setFilters as required props
  setFilters: PropTypes.func.isRequired,
};

CustomTable.defaultProps = {
  mapData: null,
};

export default CustomTable;
