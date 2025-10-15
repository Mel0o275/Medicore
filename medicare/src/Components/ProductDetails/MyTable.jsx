import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { grey } from "@mui/material/colors";

const generalRows = [
  { name: "Brand", info: "BUMTUM" },
  { name: "Manufacturer", info: "Millennium Babycares Pvt. Ltd." },
  {
    name: "Manufacturer Address",
    info: "Millennium Babycares Pvt. Ltd. Plot no. 111, Sector-2, Pithampur Industrial Area, Pithampur Dist. Dhar, Indore, Madhya Pradesh 454775",
  },
  { name: "Manufacturer Email", info: "demo@example.com" },
  { name: "Sold By", info: "FAMILYCARE CONSUMER PRIVATE LIMITED" },
  { name: "JioMart Customer Care Email", info: "demo@example.com" },
  { name: "JioMart Customer Care Phone", info: "9876543210" },
  { name: "Marketed By", info: "Familycare Consumer Pvt. Ltd." },
  { name: "Included Components", info: "62pcs in a pack" },
  { name: "Country of Origin", info: "India" },
];

const productRows = [
  { name: "Minimum Age", info: "20" },
  { name: "Minimum Age UOM", info: "Month" },
  { name: "Maximum Age", info: "36" },
  { name: "Age Description", info: "Infant" },
  { name: "Size", info: "L" },
  { name: "Color", info: "White" },
];

export default function MyTable({ name }) {
  const BORDER_COLOR = grey[200];
  const TEXT_COLOR = grey[700];

  return (
    <TableContainer component={Paper}>
      <Table
        sx={{
          minWidth: 300,
          border: 1,
          borderColor: BORDER_COLOR,
          "& td, & th": { borderColor: BORDER_COLOR, color: TEXT_COLOR },
        }}
        aria-label="simple table"
      >
        <TableBody>
          <TableRow>
            <TableCell
              sx={{
                width: "100%",
                fontWeight: "bold",
                textTransform: "uppercase",
                color: TEXT_COLOR,
                borderColor: BORDER_COLOR,
              }}
              colSpan={2}
            >
              {name}
            </TableCell>
          </TableRow>

          {name === "general information" &&
            generalRows.map((row, index) => (
              <TableRow key={index}>
                <TableCell
                  sx={{
                    width: "25%",
                    fontWeight: "bold",
                    color: TEXT_COLOR,
                    borderColor: BORDER_COLOR,
                  }}
                >
                  {row.name}
                </TableCell>
                <TableCell
                  sx={{
                    width: "75%",
                    color: TEXT_COLOR,
                    borderColor: BORDER_COLOR,
                  }}
                >
                  {row.info}
                </TableCell>
              </TableRow>
            ))}

          {name === "product information" &&
            productRows.map((row, index) => (
              <TableRow key={index}>
                <TableCell
                  sx={{
                    width: "25%",
                    fontWeight: "bold",
                    color: TEXT_COLOR,
                    borderColor: BORDER_COLOR,
                  }}
                >
                  {row.name}
                </TableCell>
                <TableCell
                  sx={{
                    width: "75%",
                    color: TEXT_COLOR,
                    borderColor: BORDER_COLOR,
                  }}
                >
                  {row.info}
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
