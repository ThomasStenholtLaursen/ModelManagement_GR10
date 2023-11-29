/* eslint-disable react/prop-types */
import {
  Box,
  Button,
  Modal,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState } from "react";
import useDeleteModelFromJob from "../../hooks/useDeleteModelFromJob";
import { useAuth } from "../../hooks/useAuth";

const ModelsOnJobTable = ({ job, models, reloadJobAndModels }) => {
  const { token } = useAuth();
  const [selectedModel, setSelectedModel] = useState(null);
  const [isConfirmationModalOpen, setConfirmationModalOpen] = useState(false);
  const { deleteModelFromJob, isLoading} = useDeleteModelFromJob(token);

  

  const handleDeleteModel = async () => {
    const idForSelectedModel = models.find((model) => model.email === selectedModel.email)?.efModelId;
    const result = await deleteModelFromJob(idForSelectedModel, job.jobId);
    if (result.ok) {
      // Reload job and models
      // You may want to use a prop callback or context to notify the parent component to reload the data.
      // For simplicity, I'll leave it as a comment here.
      await reloadJobAndModels();
      handleCloseConfirmationModal();
    }
  };

  const handleOpenConfirmationModal = (model) => {
    setSelectedModel(model);
    setConfirmationModalOpen(true);
  };

  const handleCloseConfirmationModal = () => {
    setConfirmationModalOpen(false);
  };

  return (
    <>
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
                <IconButton onClick={() => handleOpenConfirmationModal(model)}>
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    <Modal
        open={isConfirmationModalOpen}
        onClose={handleCloseConfirmationModal}
      >
        <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
        }}
      >
          <Typography variant="h6" sx={{ p: 2 }}>
            Confirm Delete
          </Typography>
          <Typography sx={{ p: 2 }}>
            Are you sure you want to delete the model from the job?
          </Typography>
            <Button onClick={handleCloseConfirmationModal} variant="contained" sx={{ mt: 2, mr: 2 }}>
              Cancel
            </Button>
            <Button onClick={handleDeleteModel} disabled={isLoading} variant="contained" sx={{ mt: 2, mr: 2 }}>
              Confirm
            </Button>
            </Box>
      </Modal>
  </>
  );
};
export default ModelsOnJobTable;
