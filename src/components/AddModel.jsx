import { Button, Container, TextField } from "@mui/material";

function AddModel() {
  return (
    <Container>
      <TextField label="Add Model" variant="outlined" />
      <Button variant="contained">Add Model</Button>
    </Container>
  );
}

export default AddModel;
