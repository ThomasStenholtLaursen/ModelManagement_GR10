/* eslint-disable react/prop-types */
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { IconButton } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';

const ModelsOnJobTable = ({ job }) => {


    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Phone</TableCell>
                    <TableCell>Delete</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {job?.models.map((model) => (
                    <TableRow key={model.firstName}>
                    <TableCell>{`${model.firstName} ${model.lastName}`}</TableCell>
                    <TableCell>{model.email}</TableCell>
                    <TableCell>{model.phoneNo}</TableCell>
                    <TableCell>
                        <IconButton >
                            <DeleteIcon />
                        </IconButton>
                    </TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
        </TableContainer>

    )

}
export default ModelsOnJobTable;