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

const EditProductContent = ({ handleClose, currentId, currentName }) => { 
    const handleSave = () => { 
        console.log(`Product ${currentId} updated!`); 
        handleClose(); 
    };

    return (
        <Box sx={MODAL_STYLE}>
            <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
                <Typography id="edit-product-title" variant="h6" component="h2">Edit Product</Typography>
                <IconButton onClick={handleClose} size="small"><CloseIcon /></IconButton>
            </Stack>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                <Typography variant="subtitle1" fontWeight="bold" sx={{ mb: 1, color: PRIMARY_COLOR }}>ID: {currentId}</Typography>
                <Box sx={{ border: '1px solid #ccc', borderRadius: 1, p: 1, pt: 0, '&:hover': {borderColor: customTheme.palette.primary.main} }}>
                    <Typography variant="caption" display="block" color="text.secondary" sx={{mb: 0.5}}>Product Image</Typography>
                    <TextField type="file" fullWidth variant="standard"/>
                </Box>

                <TextField label="Name" type="text" fullWidth variant="outlined" size="small" defaultValue={currentName}/>
                <FormControl fullWidth variant="outlined" size="small">
                    <InputLabel id="category-label-edit">Category</InputLabel>
                    <Select labelId="category-label-edit" label="Category" >
                        {categories.map((category) => (<MenuItem key={category} value={category}>{category}</MenuItem>))}
                    </Select>

                </FormControl>
                <TextField label="Price" type="number" fullWidth variant="outlined" size="small" inputProps={{ min: 0, step: "0.5" }}/>
                <TextField label="Description" type="text" fullWidth multiline rows={2} variant="outlined" size="small" />
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3, gap: 1.5 }}>
                <Button onClick={handleClose} color="error" startIcon={<CloseIcon />}>Cancel</Button>
                <Button onClick={handleSave} variant="contained" color="primary" startIcon={<SaveIcon />}>Save</Button>
            </Box>
        </Box>
    );
};

export default function EditProductModal({ open, handleClose, currentId, currentName }) {
    return (
        <ThemeProvider theme={customTheme}>
            <Modal open={open} onClose={handleClose} aria-labelledby="edit-product-title">
                <EditProductContent 
                    handleClose={handleClose} 
                    currentId={currentId} 
                    currentName={currentName}
                />
            </Modal>
        </ThemeProvider>
    );
}
