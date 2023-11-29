/* eslint-disable react/prop-types */
import { Box, Button, Modal, TextField, Typography } from "@mui/material";
import modalStyle from "../../styles/ModalStyles";
import { DatePicker } from "@mui/x-date-pickers";

const AddModelExpenseModal = ({
  open,
  handleClose,
  expenseFormData,
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
          Add Expense
        </Typography>
        <TextField
          required
          label="Amount"
          name="amount"
          type="number"
          value={expenseFormData.amount}
          onChange={handleChange}
          margin="normal"
        />
        <DatePicker
          label="Date"
          value={expenseFormData.date}
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
          label="Description"
          name="text"
          value={expenseFormData.text}
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

export default AddModelExpenseModal;
