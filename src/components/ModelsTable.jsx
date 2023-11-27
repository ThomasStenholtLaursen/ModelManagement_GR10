/* eslint-disable react/prop-types */
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Skeleton } from "@mui/material";

const ModelsTable = ({ models, isLoading }) => {
  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: 500 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="right">Email</TableCell>
              <TableCell align="right">Phone</TableCell>
              <TableCell align="right">Height</TableCell>
              <TableCell align="right">Shoe Size</TableCell>
              <TableCell align="right">City</TableCell>
              <TableCell align="right">Country</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {isLoading
              ? Array.from(new Array(5)).map((_, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <Skeleton variant="text" />
                    </TableCell>
                    <TableCell align="right">
                      <Skeleton variant="text" />
                    </TableCell>
                    <TableCell align="right">
                      <Skeleton variant="text" />
                    </TableCell>
                    <TableCell align="right">
                      <Skeleton variant="text" />
                    </TableCell>
                    <TableCell align="right">
                      <Skeleton variant="text" />
                    </TableCell>
                    <TableCell align="right">
                      <Skeleton variant="text" />
                    </TableCell>
                    <TableCell align="right">
                      <Skeleton variant="text" />
                    </TableCell>
                  </TableRow>
                ))
              : models.map((model) => (
                  <TableRow key={model.efModelId}>
                    <TableCell component="th" scope="row">
                      {model.firstName + " " + model.lastName}
                    </TableCell>
                    <TableCell align="right">{model.email}</TableCell>
                    <TableCell align="right">{model.phoneNo}</TableCell>
                    <TableCell align="right">{model.height + "cm"}</TableCell>
                    <TableCell align="right">
                      {"US " + model.shoeSize}
                    </TableCell>
                    <TableCell align="right">
                      {model.city ? model.city : "N/A"}
                    </TableCell>
                    <TableCell align="right">
                      {model.country ? model.country : "N/A"}
                    </TableCell>
                  </TableRow>
                ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default ModelsTable;
