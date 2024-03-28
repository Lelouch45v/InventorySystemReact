import React from 'react';
import { useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, Table, TableBody, TableCell, TableHead, TableRow, Container, Paper } from '@mui/material';

const Employee = () => {
  
  const [employeeList] = useState([
    { id: 1, name: "John Doe", position: "Software Engineer", age: 30, dob: "1993-01-15", hireDate: "2020-06-01" },
    { id: 2, name: "Jane Smith", position: "Product Manager", age: 28, dob: "1995-02-20", hireDate: "2021-07-15" },
    { id: 3, name: "Emma Johnson", position: "Designer", age: 26, dob: "1997-03-30", hireDate: "2022-08-23" },
  ]);

    
  return (
    <> 
      <Container>           
        <Toolbar>
          <Typography variant="h6">
            Employee List
          </Typography>
        </Toolbar>
        <Paper sx={{ marginTop: 2, overflowX: "auto" }}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Position</TableCell>
                <TableCell>Age</TableCell>
                <TableCell>Date of Birth</TableCell>
                <TableCell>Hire Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {employeeList.map((employee) => (
                <TableRow key={employee.id}>
                  <TableCell>{employee.id}</TableCell>
                  <TableCell>{employee.name}</TableCell>
                  <TableCell>{employee.position}</TableCell>
                  <TableCell>{employee.age}</TableCell>
                  <TableCell>{employee.dob}</TableCell>
                  <TableCell>{employee.hireDate}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      </Container>
    </>
  );
}

export default Employee;
