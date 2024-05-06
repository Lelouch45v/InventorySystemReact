import React, { useState } from 'react';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Grid,
    IconButton  // Add this import for IconButton
  } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';  
import SaveIcon from '@mui/icons-material/Save';  
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { Delete as DeleteIcon, Visibility as ViewIcon, Edit as EditIcon } from '@mui/icons-material';
import { useDropzone } from 'react-dropzone';
import * as XLSX from 'xlsx';


const Tools = () => {
  const [open, setOpen] = useState(false);
  const [nextId, setNextId] = useState(1);
  const [formData, setFormData] = useState({
    companyName: '',
    personName: '',
    position: '',
    email: ''
  });
  const [submittedData, setSubmittedData] = useState([]);
  

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const newEntry = {
      id: nextId,
      companyName: formData.companyName,
      personName: formData.personName,
      position: formData.position,
      email: formData.email
    };
    setSubmittedData(prev => [...prev, newEntry]);
    setNextId(nextId + 1);
    handleClose();
    setFormData({ companyName: '', personName: '', position: '', email: '' }); 
  };

  const handleEdit = (id) => {
    const entry = submittedData.find(item => item.id === id);
    if (entry) {
      setFormData(entry);
      setOpen(true);  
    }
  };
  const handleDelete = (id) => {
    setSubmittedData(submittedData.filter(item => item.id !== id));
  };
  
  
  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(submittedData.map(({ id, companyName, personName, position, email }) => ({
        ID: id,
        "Company Name": companyName,
        "Name of Person": personName,
        "Position in Company": position,
        Email: email
    })));

    ws['!cols'] = [
        {wch: 6}, 
        {wch: 15}, 
        {wch: 15}, 
        {wch: 20}, 
        {wch: 30} 
    ];

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Data");

    XLSX.writeFile(wb, "data.xlsx");
};

  



  const onDrop = (acceptedFiles) => {
    acceptedFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onabort = () => console.log('file reading was aborted');
      reader.onerror = () => console.log('file reading has failed');
      reader.onload = () => {
        const text = reader.result;
        const rows = text.split('\n').map(row => row.split(','));
        const formattedData = rows.map((row, index) => ({
          id: nextId + index,
          companyName: row[0],
          personName: row[1],
          position: row[2],
          email: row[3]
        }));
        setSubmittedData(prev => [...prev, ...formattedData]);
        setNextId(prevId => prevId + rows.length);
      };
      reader.readAsText(file);
    });
  };
  
  const {getRootProps, getInputProps} = useDropzone({onDrop});
  const downloadPdf = () => {
    const doc = new jsPDF();
    doc.text("HR and Payroll Specialist List Contact", 20, 10);
    doc.autoTable({
      theme: "grid",
      head: [['ID', 'Company Name', 'Name of Person', 'Position', 'Email']],
      body: submittedData.map(data => [data.id, data.companyName, data.personName, data.position, data.email]),
      startY: 20,
    });
    doc.save('table-data.pdf');
  };

  const handleView =(id)=>{
   
  };

  

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} style={{ position: 'sticky', top: 0, zIndex: 1000, backgroundColor: '#fff' }}>
        <Button variant="contained" color="primary" onClick={handleOpen}>
          Create A List
        </Button>
      </Grid>

        {/* <div {...getRootProps()} style={{ border: '2px dashed gray', padding: '20px', marginTop: '20px' }}>
            <input {...getInputProps()} />
            <p>Drag 'n' drop some files here, or click to select files</p>
        </div> */}

      <Grid item xs={12}>
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Fill the Form</DialogTitle>
          <DialogContent>
            <TextField autoFocus margin="dense" label="Company Name" type="text" fullWidth name="companyName" value={formData.companyName} onChange={handleChange} />
            <TextField margin="dense" label="Name of Person" type="text" fullWidth name="personName" value={formData.personName} onChange={handleChange} />
            <TextField margin="dense" label="Position in the Company" type="text" fullWidth name="position" value={formData.position} onChange={handleChange} />
            <TextField margin="dense" label="Email" type="email" fullWidth name="email" value={formData.email} onChange={handleChange} />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary" startIcon={<CloseIcon />}>Cancel</Button>
            <Button onClick={handleSubmit} color="primary" startIcon={<SaveIcon />}>Save</Button>
          </DialogActions>
        </Dialog>
      </Grid>

      <Grid item xs={12} style={{ marginTop: 20 }}>
        <Typography variant="h6" gutterBottom style={{ textAlign: 'center' }}>
          HR and Payroll Specialist List Contact
        </Typography>

  <div style={{ width: '70%', margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>#</TableCell>
            <TableCell>Company Name</TableCell>
            <TableCell>Name of Person</TableCell>
            <TableCell>Position</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {submittedData.length > 0 ? submittedData.map((data, index) => (
            <TableRow key={index}>
              <TableCell>{data.id}</TableCell>
              <TableCell>{data.companyName}</TableCell>
              <TableCell>{data.personName}</TableCell>
              <TableCell>{data.position}</TableCell>
              <TableCell>{data.email}</TableCell>
              <TableCell>
                <IconButton onClick={() => handleView(data.id)}>
                  <ViewIcon />
                </IconButton>
                <IconButton onClick={() => handleEdit(data.id)} sx={{ color: '#1976d2' }}>
                  <EditIcon />
                </IconButton>
                <IconButton onClick={() => handleDelete(data.id)} sx={{ color: 'red' }}>
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          )) : (
            <TableRow>
              <TableCell colSpan={6} align="center">No data available</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
    <Button variant="contained" color="secondary" onClick={downloadPdf} style={{ marginTop: 20, alignSelf: 'flex-end' }}>
      Download PDF
    </Button>
    <Button variant="contained" color="primary" onClick={exportToExcel} style={{ marginTop: 20, marginLeft: 10 }}>
      Download Excel
    </Button>
  </div>
</Grid>



    </Grid>
  );
};

export default Tools;