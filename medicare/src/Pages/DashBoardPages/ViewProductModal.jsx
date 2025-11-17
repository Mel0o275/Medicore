import { useState } from "react";
import { Box, Button, Modal, Paper, Stack, Typography } from "@mui/material";

function ViewProductModal({ open, handleClose, selectedProduct }) {
  const [hovered, setHovered] = useState(false);

  if (!selectedProduct) return null;

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="product-modal-title"
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: 2,
      }}
    >
      <Paper
        sx={{
          width: { xs: "100%", sm: 450, md: 500 },
          maxHeight: "90vh",
          overflowY: "auto",
          p: 3,
          borderRadius: 3,
          boxShadow: "0 6px 20px rgba(0,0,0,0.2)",
        }}
      >
        <Typography
          id="product-modal-title"
          variant="h6"
          fontWeight="bold"
          mb={2}
        >
          Product Details
        </Typography>

        <Box
          sx={{
            width: "100%",
            mb: 2,
            position: "relative",
            borderRadius: 2,
            overflow: "hidden",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#f5f5f5",
            minHeight: { xs: 150, sm: 200, md: 250 },
          }}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          <Box
            component="img"
            src={selectedProduct.images[0].url}
            alt={selectedProduct.title}
            sx={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
              position: "absolute",
              top: 0,
              left: 0,
              transition: "opacity 0.5s ease",
              opacity: hovered && selectedProduct.images[1] ? 0 : 1,
            }}
          />

          {selectedProduct.images[1] && (
            <Box
              component="img"
              src={selectedProduct.images[1].url}
              alt={`${selectedProduct.title} hover`}
              sx={{
                width: "100%",
                height: "100%",
                objectFit: "contain",
                position: "absolute",
                top: 0,
                left: 0,
                transition: "opacity 0.5s ease",
                opacity: hovered ? 1 : 0,
              }}
            />
          )}
        </Box>

        <Stack spacing={1.2}>
          <Typography>
            <strong>ID:</strong> {selectedProduct._id}
          </Typography>
          <Typography>
            <strong>Name:</strong> {selectedProduct.title}
          </Typography>
          <Typography>
            <strong>Brand:</strong> {selectedProduct.brand}
          </Typography>
          <Typography>
            <strong>Ratings:</strong> {selectedProduct.ratings}
          </Typography>
          <Typography>
            <strong>Price:</strong> {selectedProduct.price} L.E
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
      </Paper>
    </Modal>
  );
}

export default ViewProductModal;
