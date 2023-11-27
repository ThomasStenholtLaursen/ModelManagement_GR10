/* eslint-disable react/prop-types */
import { Box, Button, Modal, TextField, Typography } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 2,
  display: "flex",
  flexDirection: "column",
};

const AddManagerModal = ({
  open,
  handleClose,
  managerFormData,
  handleChange,
  handleSubmit,
  isFormValid,
}) => {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Add Manager
        </Typography>
        <TextField
          required
          label="First Name"
          name="firstName"
          value={managerFormData.firstName}
          onChange={handleChange}
          margin="normal"
        />
        <TextField
          required
          label="Last Name"
          name="lastName"
          value={managerFormData.lastName}
          onChange={handleChange}
          margin="normal"
        />
        <TextField
          required
          label="Email"
          name="email"
          type="email"
          value={managerFormData.email}
          onChange={handleChange}
          margin="normal"
        />
        <TextField
          required
          label="Password"
          name="password"
          type="password"
          value={managerFormData.password}
          onChange={handleChange}
          margin="normal"
        />
        <Button
          onClick={handleSubmit}
          variant="contained"
          sx={{ mt: 2 }}
          disabled={!isFormValid}
        >
          Submit
        </Button>
      </Box>
    </Modal>
  );
};

export default AddManagerModal;
