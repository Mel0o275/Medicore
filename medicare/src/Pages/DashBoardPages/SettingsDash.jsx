import React, { useState } from "react";
import {
  Box,
  Typography,
  Paper,
  TextField,
  Button,
  Avatar,
  Grid,
  Divider,
} from "@mui/material";
import {
  Edit as EditIcon,
  Save as SaveIcon,
  Cancel as CancelIcon,
} from "@mui/icons-material";

const SettingsDash = () => {
  const [admin, setAdmin] = useState({
    adminId: "ADM001",
    fullName: "Ahmed Hassan",
    email: "ahmed@pharmacy.com",
    username: "admin_ahmed",
    password: "*********",
    phone: "01012345678",
    pharmacyName: "El-Hayah Pharmacy",
    address: "15 شارع التحرير، القاهرة",
    avatar: "https://i.pravatar.cc/150?img=12",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState(admin);

  const handleChange = (e) => {
    setEditedData({ ...editedData, [e.target.name]: e.target.value });
  };

  const handleEditToggle = () => {
    if (isEditing) setEditedData(admin); // cancel changes
    setIsEditing(!isEditing);
  };

  const handleSave = () => {
    setAdmin(editedData);
    setIsEditing(false);
  };

  return (
    <Box sx={{ p: { xs: 2, md: 4 } }}>
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          justifyContent: "space-between",
          alignItems: { xs: "flex-start", sm: "center" },
          mb: 3,
          gap: 2,
        }}
      >
        <Typography variant="h5" fontWeight="bold">
          ⚙️ Admin Settings
        </Typography>

        <Box sx={{ display: "flex", gap: 1 }}>
          {isEditing ? (
            <>
              <Button
                variant="contained"
                color="success"
                startIcon={<SaveIcon />}
                onClick={handleSave}
              >
                Save Changes
              </Button>
              <Button
                variant="outlined"
                color="error"
                startIcon={<CancelIcon />}
                onClick={handleEditToggle}
              >
                Cancel
              </Button>
            </>
          ) : (
            <Button
              variant="contained"
              startIcon={<EditIcon />}
              onClick={handleEditToggle}
              sx={{ textTransform: "none", borderRadius: "12px", px: 2.5 }}
            >
              Change Info
            </Button>
          )}
        </Box>
      </Box>

      {/* Admin Info */}
      <Paper
        elevation={3}
        sx={{
          borderRadius: "16px",
          p: 3,
          backgroundColor: "background.paper",
        }}
      >
        <Grid container spacing={3}>
          {/* Avatar Section */}
          <Grid
          
            size={{xs : 12 , md : 3 , sm : 4}} 
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 1.5,
            }}
          >
            <Avatar
              src={admin.avatar}
              alt={admin.fullName}
              sx={{
                width: 120,
                height: 120,
                borderRadius: "20%",
                boxShadow: 2,
              }}
            />
            <Typography variant="subtitle1" fontWeight="bold">
              Admin
            </Typography>
          </Grid>

          {/* Info Section */}
          <Grid  size={{xs : 12 , sm : 8 , md : 9}} >
            <Typography variant="h6" fontWeight="bold" mb={2}>
              Personal Information
            </Typography>
            <Divider sx={{ mb: 2 }} />

            <Grid container spacing={2}>
            

              <Grid size={{xs : 12 , md : 6}} >
                <TextField
                  fullWidth
                  label="👤 Full Name"
                  name="fullName"
                  value={editedData.fullName}
                  onChange={handleChange}
                  InputProps={{ readOnly: !isEditing }}
                />
              </Grid>

              <Grid size={{xs : 12 , md : 6}} >
                <TextField
                  fullWidth
                  label="📧 Email"
                  name="email"
                  value={editedData.email}
                  onChange={handleChange}
                  InputProps={{ readOnly: !isEditing }}
                />
              </Grid>

              <Grid size={{xs : 12 , md : 6}} >
                <TextField
                  fullWidth
                  label="🔐 Username"
                  name="username"
                  value={editedData.username}
                  onChange={handleChange}
                  InputProps={{ readOnly: !isEditing }}
                />
              </Grid>

              <Grid size={{xs : 12 , md : 6}} >
                <TextField
                  fullWidth
                  type="password"
                  label="🔑 Password (hashed)"
                  name="password"
                  value={editedData.password}
                  onChange={handleChange}
                  InputProps={{ readOnly: !isEditing }}
                />
              </Grid>

              <Grid size={{xs : 12 , md : 6}} >
                <TextField
                  fullWidth
                  label="📱 Phone Number"
                  name="phone"
                  value={editedData.phone}
                  onChange={handleChange}
                  InputProps={{ readOnly: !isEditing }}
                />
              </Grid>

              <Grid size={{xs : 12 , md : 6}} >
                <TextField
                  fullWidth
                  label="🏢 Pharmacy Name"
                  name="pharmacyName"
                  value={editedData.pharmacyName}
                  onChange={handleChange}
                  InputProps={{ readOnly: !isEditing }}
                />
              </Grid>

              <Grid size={12} >
                <TextField
                  fullWidth
                  label="📍 Address"
                  name="address"
                  value={editedData.address}
                  onChange={handleChange}
                  InputProps={{ readOnly: !isEditing }}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default SettingsDash;
