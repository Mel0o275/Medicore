import React from 'react';
import { 
    Modal, Box, Typography, TextField, Button, Select, MenuItem, InputLabel, FormControl, Stack, IconButton
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import SaveIcon from '@mui/icons-material/Save';
import CloseIcon from '@mui/icons-material/Close';

const PRIMARY_COLOR = '#00a297';
const customTheme = createTheme({ palette: { primary: { main: PRIMARY_COLOR } }, direction: 'ltr' });
const categories = ['Skin Care', 'Baby Care', 'Home Care', 'Beauty Care', 'Personal Care', 'Health Care'];

const MODAL_STYLE = { 
    position: 'absolute', 
    top: '50%', 
    left: '50%', 
    transform: 'translate(-50%, -50%)', 
    width: { xs: '90%', sm: 400 }, 
    bgcolor: 'background.paper', 
    borderRadius: 2, 
    boxShadow: 24, 
    p: 3, 
    textAlign: 'left' 
};

const EditProductContent = ({ 
    handleClose, 
    selectedProduct, 
    register, 
    handleSubmit, 
    onSubmit, 
    errors 
}) => { 
    return (
        <Box sx={MODAL_STYLE}>
            <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
                <Typography id="edit-product-title" variant="h6" component="h2">
                    Edit Product
                </Typography>
                <IconButton onClick={handleClose} size="small">
                    <CloseIcon />
                </IconButton>
            </Stack>

            <form onSubmit={handleSubmit(onSubmit)}>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    {/* ID Display */}
                    <Box sx={{ 
                        p: 1.5, 
                        backgroundColor: '#f5f5f5', 
                        borderRadius: 1,
                        border: '1px solid #e0e0e0'
                    }}>
                        <Typography variant="subtitle2" color="text.secondary">
                            Product ID
                        </Typography>
                        <Typography variant="h6" color={PRIMARY_COLOR} fontWeight="bold">
                            {selectedProduct?.id}
                        </Typography>
                        <input type="hidden" {...register("id")} />
                    </Box>

                    {/* Title Field */}
                    <TextField 
                        label="Product Title *"
                        fullWidth 
                        variant="outlined" 
                        size="small"
                        {...register('title')}
                        error={!!errors.title}
                        helperText={errors.title?.message}
                        placeholder="Enter new title"
                    />

                    {/* Price Field */}
                    <TextField 
                        label="Price *"
                        type="number"
                        fullWidth 
                        variant="outlined" 
                        size="small"
                        inputProps={{ 
                            min: 0, 
                            step: "0.01"
                        }}
                        {...register('price')}
                        error={!!errors.price}
                        helperText={errors.price?.message}
                        placeholder="Enter new price"
                    />

                    {/* Additional Fields (if you want to expand beyond your hook) */}
                    <FormControl fullWidth variant="outlined" size="small">
                        <InputLabel id="category-label-edit">Category</InputLabel>
                        <Select 
                            labelId="category-label-edit" 
                            label="Category"
                            defaultValue={selectedProduct?.category || ''}
                        >
                            {categories.map((category) => (
                                <MenuItem key={category} value={category}>
                                    {category}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <TextField 
                        label="Description"
                        fullWidth 
                        multiline 
                        rows={3} 
                        variant="outlined" 
                        size="small"
                        defaultValue={selectedProduct?.desc || ''}
                        placeholder="Enter product description"
                    />
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3, gap: 1.5 }}>
                    <Button 
                        onClick={handleClose} 
                        color="error" 
                        startIcon={<CloseIcon />}
                        type="button"
                    >
                        Cancel
                    </Button>
                    <Button 
                        type="submit"
                        variant="contained" 
                        color="primary" 
                        startIcon={<SaveIcon />}
                    >
                        Save Changes
                    </Button>
                </Box>
            </form>
        </Box>
    );
};

export default function EditProductModal({ 
    open, 
    handleClose, 
    selectedProduct, 
    register, 
    handleSubmit, 
    onSubmit, 
    errors 
}) {
    return (
        <ThemeProvider theme={customTheme}>
            <Modal open={open} onClose={handleClose} aria-labelledby="edit-product-title">
                <EditProductContent 
                    handleClose={handleClose}
                    selectedProduct={selectedProduct}
                    register={register}
                    handleSubmit={handleSubmit}
                    onSubmit={onSubmit}
                    errors={errors}
                />
            </Modal>
        </ThemeProvider>
    );
}