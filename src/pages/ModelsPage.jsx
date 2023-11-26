import { useState, useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import Page from "./Page";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const ModelsPage = () => {
  const [models, setModels] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { token } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      const url = "https://localhost:7181/api/Models";
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(url, {
          method: "GET",
          credentials: "include",
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setModels(data);
      } catch (error) {
        setError(`Something bad happened: ${error.message}`);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [token]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <Page>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
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
            {models.map((model) => (
              <TableRow key={model.id}>
                <TableCell component="th" scope="row">
                  {model.firstName + " " + model.lastName}
                </TableCell>
                <TableCell align="right">{model.email}</TableCell>
                <TableCell align="right">{model.phoneNo}</TableCell>
                <TableCell align="right">{model.height + "cm"}</TableCell>
                <TableCell align="right">{"US " + model.shoeSize}</TableCell>
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
    </Page>
  );
};

export default ModelsPage;
