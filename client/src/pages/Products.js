import React, { useState } from 'react';
import { Button, Card, CardActions, CardContent, CardMedia, Grid, IconButton, TextField, Typography, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTrashAlt, faEdit, faImage } from '@fortawesome/free-solid-svg-icons';

const initialProducts = [
  { id: 1, name: 'Product 1', description: 'Description for product 1', price: '100', image: '' },
];



const Products = () => {
  const [products, setProducts] = useState(initialProducts);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null); // To keep track of the product being edited
  const [addProductDialogOpen, setAddProductDialogOpen] = useState(false);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        handleProductChange('image', reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  
  
  const deleteProduct = (productId) => {
    const updatedProducts = products.filter(product => product.id !== productId);
    setProducts(updatedProducts);
  };

  const openDialog = (product = null) => {
    if (product) {
      setIsEditMode(true);
      setCurrentProduct(product);
    } else {
      setIsEditMode(false);
      setCurrentProduct({ name: '', description: '', price: '', image: '' }); 
    }
    setAddProductDialogOpen(true);
  };

  const closeDialog = () => {
    setAddProductDialogOpen(false);
    setCurrentProduct(null); 
  };

  const handleProductChange = (field, value) => {
    setCurrentProduct({ ...currentProduct, [field]: value });
  };

  const saveProduct = () => {
    if (isEditMode) { 
      setProducts(products.map(p => p.id === currentProduct.id ? currentProduct : p));
    } else {
      // Add new product
      const newProduct = { ...currentProduct, id: products.length + 1 };
      setProducts([...products, newProduct]);
    }
    closeDialog();
  };

  return (
    <div>
        <div style={{ textAlign: 'right', marginBottom: '20px' }}>
            <Button onClick={() => openDialog()} variant="contained" color="primary" startIcon={<FontAwesomeIcon icon={faPlus} />}>Add Product</Button>
        </div>

    
            <Grid container spacing={2}>
            {products.map((product) => (
                <Grid item xs={12} sm={6} md={4} key={product.id}>
                <Card>
                    {product.image && (
                    <CardMedia
                        component="img"
                        sx={{
                        height: 300, //
                        objectFit: 'contain', 
                        width: '100%', 
                        objectPosition: 'center', 
                        }}
                        image={product.image}
                        alt={product.name}
                    />
                    )}
                    <CardContent>
                    <Typography gutterBottom variant="h5" component="div">{product.name}</Typography>
                    <Typography variant="body2" color="text.secondary">{product.description}</Typography>
                    <Typography variant="body1">Price: ${product.price}</Typography>
                    </CardContent>
                    <CardActions>
                    <IconButton onClick={() => openDialog(product)}>
                        <FontAwesomeIcon icon={faEdit} />
                    </IconButton>

                    <IconButton onClick={() => deleteProduct(product.id)} aria-label="delete">
                        <FontAwesomeIcon icon={faTrashAlt} />
                    </IconButton>
                    </CardActions>
                </Card>
                </Grid>
            ))}
            </Grid>


        {/* Dialog for Add/Edit Product */}
        <Dialog open={addProductDialogOpen} onClose={closeDialog}>
            <DialogTitle>{isEditMode ? 'Edit Product' : 'Add New Product'}</DialogTitle>
            <DialogContent>
            <TextField autoFocus margin="dense" label="Name" fullWidth variant="outlined" value={currentProduct?.name} onChange={(e) => handleProductChange('name', e.target.value)} />
            <TextField margin="dense" label="Description" fullWidth variant="outlined" value={currentProduct?.description} onChange={(e) => handleProductChange('description', e.target.value)} />
            <TextField margin="dense" label="Price" fullWidth variant="outlined"value={currentProduct?.price} onChange={(e) => handleProductChange('price', e.target.value)} />
                <Button variant="contained" component="label" startIcon={<FontAwesomeIcon icon={faImage} />}>
                Upload Image
                <input type="file" hidden onChange={handleFileChange} />
                </Button>
                {currentProduct?.image && <img src={currentProduct.image} alt="Preview" style={{ marginTop: 20, maxWidth: '100%', height: 'auto' }} />}
                </DialogContent>
                <DialogActions>
                <Button onClick={closeDialog}>Cancel</Button>
                <Button onClick={saveProduct}>{isEditMode ? 'Save Changes' : 'Add'}</Button>
            </DialogActions>
            </Dialog>
        </div>
    );
};

export default Products;
