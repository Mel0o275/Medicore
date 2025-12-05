import React from "react";
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  IconButton,
  Tooltip,
  Avatar,
  CircularProgress,
  Stack,
} from "@mui/material";
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as ViewIcon,
  ChevronLeft,
  ChevronRight,
} from "@mui/icons-material";
import { useUsers } from "../../Hooks/reactUser/useUsers";
import ViewButtonLoader from "../../Components/Loades/ViewButtonLoader";
import ViewUser from "../DashBoardComponents/ModalViewUser";

const UsersDash = () => {
  const [page, setPage] = React.useState(1);
  const limit = 5;
  const { data: users = [], isLoading, isError } = useUsers(page, limit);

  const [open, setOpen] = React.useState(false);
  const [selectedUserId, setSelectedUserId] = React.useState(null);

  const handleOpen = (id) => {
    setSelectedUserId(id);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedUserId(null);
  };

  const excludedKeys = [
    "_id",
    "password",
    "__v",
    "createdAt",
    "updatedAt",
    "country",
    "profilePic",
    "lastName",
  ];
  const tableColumns =
    users.length > 0
      ? Object.keys(users[0]).filter((key) => !excludedKeys.includes(key))
      : [];

  const formatColumnName = (key) => {
    const columnNames = {
      firstName: "First Name",
      secondName: "Second Name",
      email: "Email",
      phoneNumber: "Phone",
      dateOfBirth: "Birth Date",
      gender: "Gender",
      role: "Role",
    };
    return columnNames[key] || key.charAt(0).toUpperCase() + key.slice(1);
  };

  const renderCellContent = (key, value, user) => {
    if (key === "name") {
      return (
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Avatar
            src={user.profilePic || "https://i.pravatar.cc/100"}
            alt={`${user.firstName} ${user.secondName}`}
            sx={{
              width: 45,
              height: 45,
              borderRadius: "10px",
              border: "2px solid #eee",
            }}
          />
          <Box>
            <Typography variant="body2" fontWeight="500">
              {user.firstName} {user.secondName}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {user.role || "N/A"}
            </Typography>
          </Box>
        </Box>
      );
    }

    if (key === "dateOfBirth") {
      return new Date(value).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    }

    if (key === "gender") {
      return (
        <Typography
          sx={{
            color:
              value?.toLowerCase() === "male"
                ? "primary.main"
                : "secondary.main",
            fontWeight: 500,
          }}
        >
          {value}
        </Typography>
      );
    }

    return value || "—";
  };

  const handleNextPage = () => {
    setPage((prev) => prev + 1);
  };

  const handlePreviousPage = () => {
    setPage((prev) => Math.max(prev - 1, 1));
  };

  if (isLoading) return <ViewButtonLoader />;

  if (isError)
    return (
      <Typography color="error" textAlign="center" mt={5}>
        Failed to load users.
      </Typography>
    );

  return (
    <Box sx={{ p: { xs: 2, md: 4 } }}>
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
          👨‍⚕️ Users / Admins Management
        </Typography>
      </Box>

      <Paper
        elevation={3}
        sx={{
          borderRadius: "16px",
          backgroundColor: "background.paper",
          overflow: "hidden",
          mb: 2,
        }}
      >
        <TableContainer>
          <Table sx={{ minWidth: 900 }}>
            <TableHead>
              <TableRow sx={{ backgroundColor: "#f4f6f8" }}>
                <TableCell sx={{ fontWeight: "bold", color: "#333" }}>
                  Person
                </TableCell>
                {tableColumns
                  .filter((key) => !["firstName", "secondName"].includes(key))
                  .map((key) => (
                    <TableCell
                      key={key}
                      sx={{ fontWeight: "bold", color: "#333" }}
                    >
                      {formatColumnName(key)}
                    </TableCell>
                  ))}
                <TableCell align="center" sx={{ fontWeight: "bold" }}>
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {users.map((user) => (
                <TableRow
                  key={user._id}
                  hover
                  sx={{
                    "&:hover": { backgroundColor: "#f9fafb" },
                    transition: "0.2s",
                  }}
                >
                  <TableCell>{renderCellContent("name", "", user)}</TableCell>

                  {tableColumns
                    .filter((key) => !["firstName", "secondName"].includes(key))
                    .map((key) => (
                      <TableCell key={key}>
                        {renderCellContent(key, user[key], user)}
                      </TableCell>
                    ))}

                  <TableCell align="center">
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        gap: 1,
                      }}
                    >
                      <Tooltip title="View">
                        <IconButton
                          color="info"
                          size="small"
                          onClick={() => handleOpen(user._id)}
                        >
                          <ViewIcon />
                        </IconButton>
                      </Tooltip>
                      {open && (
                        <ViewUser
                          open={open}
                          handleClose={handleClose}
                          userId={selectedUserId}
                        />
                      )}
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mt: 2,
          p: 2,
        }}
      >
        <Typography variant="body2" color="text.secondary">
          Page {page}
        </Typography>

        <Stack direction="row" spacing={1}>
          <Button
            variant="outlined"
            startIcon={<ChevronLeft />}
            onClick={handlePreviousPage}
            disabled={page === 1}
            sx={{
              borderRadius: "8px",
              textTransform: "none",
            }}
          >
            Previous
          </Button>

          <Button
            variant="outlined"
            endIcon={<ChevronRight />}
            onClick={handleNextPage}
            disabled={users.length < limit} // Disable if fewer users than limit (no more pages)
            sx={{
              borderRadius: "8px",
              textTransform: "none",
            }}
          >
            Next
          </Button>
        </Stack>
      </Box>
    </Box>
  );
};

export default UsersDash;
