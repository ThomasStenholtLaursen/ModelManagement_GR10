/* eslint-disable react/prop-types */
import { useState } from "react";
import { Button, TextField, Autocomplete, Modal, Box } from "@mui/material";
import PersonAddIcon from "@mui/icons-material/PersonAdd";

const AddModelToJobModal = ({ models, open, onClose, onAdd }) => {
  const [selectedModel, setSelectedModel] = useState(null);

  const handleSelectModel = (model) => {
    setSelectedModel(model);
  };

  const handleAdd = () => {
    if (selectedModel) {
      onAdd(selectedModel);
      onClose();
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
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
        <Autocomplete
          disablePortal
          id="autocomplete"
          options={models.map((model) => ({
            label: `${model.firstName} ${model.lastName}`,
            value: model,
          }))}
          getOptionLabel={(option) => option.label}
          sx={{ width: "100%" }}
          renderInput={(params) => <TextField {...params} label="Model" />}
          onChange={(_, newValue) => handleSelectModel(newValue)}
        />
        <Button variant="contained" onClick={onClose} sx={{ mt: 2, mr: 2 }}>
          Cancel
        </Button>
        <Button
          variant="contained"
          startIcon={<PersonAddIcon />}
          disabled={!selectedModel}
          onClick={handleAdd}
          sx={{ mt: 2, mr: 2 }}
        >
          Add Model
        </Button>
      </Box>
    </Modal>
  );
};

export default AddModelToJobModal;
