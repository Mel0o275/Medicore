import { Box, Button, Modal, Paper, Stack, Typography } from "@mui/material";

function ViewProductModal({ open, handleClose, selectedProduct }) {
  console.log(selectedProduct);
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="product-modal-title"
      sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
    >
      <Paper
        sx={{
          width: { xs: "90%", sm: 450 },
          p: 3,
          borderRadius: 3,
          boxShadow: "0 6px 20px rgba(0,0,0,0.2)",
        }}
      >
        {selectedProduct && (
          <>
            <Typography
              id="product-modal-title"
              variant="h6"
              fontWeight="bold"
              mb={2}
            >
              Product Details
            </Typography>

            <Box
              component="img"
              src={selectedProduct.images[0]}
              alt={selectedProduct.title}
              sx={{
                width: "100%",
                height: 200,
                objectFit: "cover",
                borderRadius: 2,
                mb: 2,
              }}
            />

            <Stack spacing={1.2}>
              <Typography>
                <strong>ID:</strong> {selectedProduct.id}
              </Typography>
              <Typography>
                <strong>Name:</strong> {selectedProduct.title}
              </Typography>
              <Typography>
                <strong>Price:</strong> {selectedProduct.price}
              </Typography>
              <Typography>
                <strong>Category:</strong> {selectedProduct.category}
              </Typography>
              <Typography>
                <strong>Description:</strong> {selectedProduct.desc}
              </Typography>
            </Stack>

            <Button
              onClick={handleClose}
              variant="contained"
              sx={{ mt: 3, width: "100%", backgroundColor: "#00a297" }}
            >
              Close
            </Button>
          </>
        )}
      </Paper>
    </Modal>
  );
}

export default ViewProductModal;
