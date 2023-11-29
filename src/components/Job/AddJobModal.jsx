/* eslint-disable react/prop-types */
import { Box, Button, Modal, TextField, Typography } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import modalStyle from "../../styles/ModalStyles";

const AddJobModal = ({
  open,
  handleClose,
  jobFormData,
  handleChange,
  handleSubmit,
  isFormValid,
  handleDateChange,
}) => {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={modalStyle}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Add Job
        </Typography>
        <TextField
          required
          label="Customer"
          name="customer"
          value={jobFormData.customer}
          onChange={handleChange}
          margin="normal"
        />
        <DatePicker
          label="Start Date"
          value={jobFormData.startDate}
          onChange={handleDateChange}
          slotProps={{
            textField: {
              variant: "outlined",
              fullWidth: true,
              margin: "normal",
              required: true,
            },
          }}
        />
        <TextField
          required
          label="Days"
          name="days"
          type="number"
          value={jobFormData.days}
          onChange={handleChange}
          margin="normal"
        />
        <TextField
          required
          label="Location"
          name="location"
          value={jobFormData.location}
          onChange={handleChange}
          margin="normal"
        />
        <TextField
          label="Comments"
          name="comments"
          value={jobFormData.comments}
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

export default AddJobModal;
