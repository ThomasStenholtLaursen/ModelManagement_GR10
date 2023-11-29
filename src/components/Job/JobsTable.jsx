/* eslint-disable react/prop-types */
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Skeleton } from "@mui/material";

const JobsTable = ({ jobs, isLoading, handleNavigation }) => {
  const formattedDate = (date) => {
    return new Date(date).toLocaleDateString();
  };

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: 500 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell>Customer</TableCell>
              <TableCell>Location</TableCell>
              <TableCell align="center">Start Date</TableCell>
              <TableCell align="center">Days</TableCell>
              <TableCell align="center">Inspect</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {isLoading
              ? Array.from(new Array(4)).map((_, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <Skeleton variant="text" />
                    </TableCell>
                    <TableCell>
                      <Skeleton variant="text" />
                    </TableCell>
                    <TableCell>
                      <Skeleton variant="text" />
                    </TableCell>
                    <TableCell>
                      <Skeleton variant="text" />
                    </TableCell>
                    <TableCell>
                      <Skeleton variant="icon" />
                    </TableCell>
                  </TableRow>
                ))
              : jobs.map((job) => (
                  <TableRow
                    key={job.jobId}
                    sx={{ "&:hover": { backgroundColor: "#f5f5f5" } }}
                    onClick={() => handleNavigation(job.jobId)}
                  >
                    <TableCell>{job.customer}</TableCell>
                    <TableCell>{job.location}</TableCell>
                    <TableCell align="center">
                      {formattedDate(job.startDate)}
                    </TableCell>
                    <TableCell align="center">{job.days}</TableCell>
                    <TableCell align="center">
                      <ArrowForwardIcon />
                    </TableCell>
                  </TableRow>
                ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default JobsTable;
