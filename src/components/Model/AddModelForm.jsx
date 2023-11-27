/* eslint-disable react/prop-types */
import { Button, TextField, Grid } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";

const AddModelForm = ({
  formData,
  handleChange,
  handleDateChange,
  handleSubmit,
  isFormValid,
}) => {
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <TextField
            margin="normal"
            required
            fullWidth
            label="First Name"
            name="firstName"
            onChange={handleChange}
            value={formData.firstName}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Last Name"
            name="lastName"
            onChange={handleChange}
            value={formData.lastName}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Email"
            name="email"
            onChange={handleChange}
            value={formData.email}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            type="password"
            label="Password"
            name="password"
            onChange={handleChange}
            value={formData.password}
          />
          <TextField
            margin="normal"
            fullWidth
            required
            label="Phone Number"
            name="phoneNo"
            onChange={handleChange}
            value={formData.phoneNo}
          />
          <DatePicker
            label="Birth Date"
            value={formData.birthDate}
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
            margin="normal"
            fullWidth
            label="Address Line 1"
            name="addresLine1"
            onChange={handleChange}
            value={formData.addresLine2}
          />
          <TextField
            margin="normal"
            fullWidth
            label="Address Line 2"
            name="addresLine2"
            onChange={handleChange}
            value={formData.addresLine2}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            margin="normal"
            fullWidth
            label="ZIP code"
            name="zip"
            onChange={handleChange}
            value={formData.zip}
          />
          <TextField
            margin="normal"
            fullWidth
            label="City"
            name="city"
            onChange={handleChange}
            value={formData.city}
          />
          <TextField
            margin="normal"
            fullWidth
            label="Country"
            name="country"
            onChange={handleChange}
            value={formData.country}
          />

          <TextField
            margin="normal"
            fullWidth
            label="Nationality"
            name="nationality"
            onChange={handleChange}
            value={formData.nationality}
          />
          <TextField
            margin="normal"
            fullWidth
            label="Height (cm)"
            name="height"
            onChange={handleChange}
            value={formData.height}
          />
          <TextField
            margin="normal"
            fullWidth
            label="Shoe Size (US)"
            name="shoeSize"
            onChange={handleChange}
            value={formData.shoeSize}
          />
          <TextField
            margin="normal"
            fullWidth
            label="Hair Color"
            name="hairColor"
            onChange={handleChange}
            value={formData.hairColor}
          />
          <TextField
            margin="normal"
            fullWidth
            label="Eye Color"
            name="eyeColor"
            onChange={handleChange}
            value={formData.eyeColor}
          />
        </Grid>
      </Grid>
      <TextField
        margin="normal"
        fullWidth
        label="Comments"
        name="comments"
        onChange={handleChange}
        value={formData.comments}
        multiline
        rows={5}
      />
      <Button
        type="submit"
        fullWidth
        variant="contained"
        disabled={!isFormValid}
        onClick={handleSubmit}
        sx={{ mt: 2, mb: 2 }}
      >
        Add Model
      </Button>
    </>
  );
};

export default AddModelForm;
