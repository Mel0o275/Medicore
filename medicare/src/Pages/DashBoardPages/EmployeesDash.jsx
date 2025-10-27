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
} from "@mui/material";
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as ViewIcon,
} from "@mui/icons-material";

const employees = [
  {
    id: 1,
    name: "Ali Hassan",
    position: "Pharmacist",
    department: "Sales",
    email: "ali.hassan@pharma.com",
    salary: "$2,500",
    status: "Active",
    avatar: "https://i.pravatar.cc/100?img=1",
  },
  {
    id: 2,
    name: "Mona Youssef",
    position: "Manager",
    department: "Admin",
    email: "mona.youssef@pharma.com",
    salary: "$3,800",
    status: "On Leave",
    avatar: "https://i.pravatar.cc/100?img=2",
  },
  {
    id: 3,
    name: "Omar Nabil",
    position: "Cashier",
    department: "Finance",
    email: "omar.nabil@pharma.com",
    salary: "$2,000",
    status: "Active",
    avatar: "https://i.pravatar.cc/100?img=3",
  },
];

const EmployeesDash = () => {
  const empKeys = employees.length > 0 ? Object.keys(employees[0]) : [];
  const excludedKeys = ["id"];
  const tableColumns = empKeys.filter((key) => !excludedKeys.includes(key));

  const formatColumnName = (key) =>
    key.charAt(0).toUpperCase() + key.slice(1).replace(/_/g, " ");

  const renderCellContent = (key, value) => {
    if (key === "avatar") {
      return (
        <Avatar
          src={value}
          alt="Employee Avatar"
          sx={{
            width: 45,
            height: 45,
            borderRadius: "10px", 
            border: "2px solid #eee",
          }}
        />
      );
    }

    if (key === "status") {
      const color =
        value === "Active"
          ? "green"
          : value === "On Leave"
          ? "orange"
          : "gray";
      return (
        <Typography sx={{ color, fontWeight: 500 }}>{value}</Typography>
      );
    }

    return value;
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
          👨‍⚕️ Employees Management
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          sx={{
            borderRadius: "12px",
            textTransform: "none",
            px: 2.5,
            alignSelf: { xs: "stretch", sm: "auto" },
          }}
        >
          Add Employee
        </Button>
      </Box>

      {/* Table */}
      <Paper
        elevation={3}
        sx={{
          borderRadius: "16px",
          backgroundColor: "background.paper",
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            width: "100%",
            overflowX: "auto",
            WebkitOverflowScrolling: "touch",
          }}
        >
          <TableContainer>
            <Table
              sx={{
                minWidth: 900,
                whiteSpace: "nowrap",
              }}
            >
              <TableHead>
                <TableRow sx={{ backgroundColor: "#f4f6f8" }}>
                  {tableColumns.map((key) => (
                    <TableCell
                      key={key}
                      sx={{
                        fontWeight: "bold",
                        color: "#333",
                      }}
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
                {employees.map((emp) => (
                  <TableRow
                    key={emp.id}
                    hover
                    sx={{
                      "&:hover": { backgroundColor: "#f9fafb" },
                      transition: "0.2s",
                    }}
                  >
                    {tableColumns.map((key) => (
                      <TableCell key={key}>
                        {renderCellContent(key, emp[key])}
                      </TableCell>
                    ))}
                    <TableCell align="center">
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          gap: 1,
                          flexWrap: "nowrap",
                        }}
                      >
                        <Tooltip title="View">
                          <IconButton color="info" size="small">
                            <ViewIcon />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Edit">
                          <IconButton color="warning" size="small">
                            <EditIcon />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Delete">
                          <IconButton color="error" size="small">
                            <DeleteIcon />
                          </IconButton>
                        </Tooltip>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Paper>
    </Box>
  );
};

export default EmployeesDash;
