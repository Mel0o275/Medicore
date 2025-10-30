import React from 'react'; 
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { 
    Modal, Box, Typography, TextField, Button, Select, MenuItem, InputLabel, FormControl, Stack, IconButton
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import SaveIcon from '@mui/icons-material/Save';
import CloseIcon from '@mui/icons-material/Close';

const PRIMARY_COLOR = '#00a297';
const customTheme = createTheme({ palette: { primary: { main: PRIMARY_COLOR } }, direction: 'ltr' });
const categories = ['Skin Care', 'Baby Care', 'Home Care', 'Beauty Care', 'Personal Care', 'Health Care'];

const productSchema = z.object({
    title: z.string()
        .min(1, 'Product name is required')
        .min(2, 'Product name must be at least 2 characters')
        .max(100, 'Product name must be less than 100 characters'),
    category: z.string().min(1, 'Category is required'),
    price: z.coerce.number()
        .positive('Price must be positive')
        .min(0.01, 'Price must be at least 0.01')
        .max(10000, 'Price must be less than 10,000'),
    desc: z.string()
        .max(500, 'Description must be less than 500 characters')
        .optional(),
    images: z.any().optional(),
});

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

const AddProductContent = ({ handleClose, onAddProduct }) => { 
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting, isValid },
        reset,
    } = useForm({
        resolver: zodResolver(productSchema),
        mode: 'onChange',
        defaultValues: {
            title: '',
            category: '',
            price: 0,
            desc: '',
        }
    });

    const onSubmit = (data) => { 
        console.log('Form data:', data);
        
        const newProduct = {
            title: data.title,
            category: data.category,
            price: data.price,
            desc: data.desc,
            images: data.images ? Array.from(data.images).map((file) => URL.createObjectURL(file)) : [],
        };

        console.log('New product to add:', newProduct);
        
        onAddProduct(newProduct);
        reset();
    };

    const handleCloseAndReset = () => {
        reset();
        handleClose();
    };

    return (
        <Box sx={MODAL_STYLE}>
            <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
                <Typography id="add-product-title" variant="h6" component="h2">Add New Product</Typography>
                <IconButton onClick={handleCloseAndReset} size="small">
                    <CloseIcon />
                </IconButton>
            </Stack>

            <form onSubmit={handleSubmit(onSubmit)}>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <Box sx={{ 
                        border: errors.images ? '1px solid #d32f2f' : '1px solid #ccc', 
                        borderRadius: 1, 
                        p: 2, 
                        '&:hover': { borderColor: customTheme.palette.primary.main } 
                    }}>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                            Product Images
                        </Typography>
                        <input 
                            type="file" 
                            multiple
                            {...register('images')}
                            style={{ width: '100%' }}
                        />
                        {errors.images && (
                            <Typography variant="caption" color="error" sx={{ mt: 1, display: 'block' }}>
                                {errors.images.message}
                            </Typography>
                        )}
                    </Box>

                    <TextField 
                        label="Product Name *"
                        fullWidth 
                        variant="outlined" 
                        size="small"
                        {...register('title')}
                        error={!!errors.title}
                        helperText={errors.title?.message}
                    />
                    
                    <FormControl fullWidth variant="outlined" size="small" error={!!errors.category}>
                        <InputLabel id="category-label-add">Category *</InputLabel>
                        <Select 
                            labelId="category-label-add" 
                            label="Category *"
                            {...register('category')}
                            defaultValue=""
                        >
                            <MenuItem value=""><em>Select Category</em></MenuItem>
                            {categories.map((category) => (
                                <MenuItem key={category} value={category}>{category}</MenuItem>
                            ))}
                        </Select>
                        {errors.category && (
                            <Typography variant="caption" color="error" sx={{ mt: 0.5, display: 'block' }}>
                                {errors.category.message}
                            </Typography>
                        )}
                    </FormControl>
                    
                    <TextField 
                        label="Price *"
                        type="number" 
                        fullWidth 
                        variant="outlined" 
                        size="small"
                        inputProps={{ min: 0, step: "0.01", max: 10000 }}
                        {...register('price')}
                        error={!!errors.price}
                        helperText={errors.price?.message}
                    />
                    
                    <TextField 
                        label="Description"
                        fullWidth 
                        multiline 
                        rows={3} 
                        variant="outlined" 
                        size="small"
                        {...register('desc')}
                        error={!!errors.desc}
                        helperText={errors.desc?.message}
                    />
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3, gap: 1.5 }}>
                    <Button 
                        onClick={handleCloseAndReset} 
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
                        disabled={isSubmitting || !isValid}
                    >
                        {isSubmitting ? 'Saving...' : 'Save Product'}
                    </Button>
                </Box>
            </form>
        </Box>
    );
};

export default function AddProductModal({ open, handleClose, onAddProduct }) {
    return (
        <ThemeProvider theme={customTheme}>
            <Modal open={open} onClose={handleClose} aria-labelledby="add-product-title">
                <AddProductContent 
                    handleClose={handleClose} 
                    onAddProduct={onAddProduct} 
                />
            </Modal>
        </ThemeProvider>
    );
}
