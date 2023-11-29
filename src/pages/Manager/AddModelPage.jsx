import { useEffect, useState } from "react";
import { Box, Button } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AddModelForm from "../../components/Model/AddModelForm";
import Paths from "../../config/paths";
import { useNavigate } from "react-router";
import { useAuth } from "../../hooks/useAuth";
import useAddModel from "../../hooks/useAddModel";
import validator from "validator";

const AddModelPage = () => {
  const navigate = useNavigate();
  const { token } = useAuth();
  const { addModel, error } = useAddModel(token);

  const [modelFormData, setModelFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phoneNo: "",
    addresLine1: "",
    addresLine2: "",
    zip: "",
    city: "",
    country: "",
    nationality: "",
    height: 0,
    shoeSize: 0,
    hairColor: "",
    eyeColor: "",
    comments: "",
    birthDate: null,
  });

  const isFormValid =
    modelFormData.firstName &&
    modelFormData.lastName &&
    validator.isEmail(modelFormData.email) &&
    modelFormData.password &&
    modelFormData.phoneNo &&
    modelFormData.birthDate;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setModelFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleDateChange = (newValue) => {
    setModelFormData({ ...modelFormData, birthDate: newValue });
  };

  useEffect(() => {
    if (error) {
      navigate(Paths.ERROR);
    }
  }, [error, navigate]);

  const handleSubmit = async () => {
    const result = await addModel(modelFormData);
    if (result) {
      navigate(Paths.MODELS);
      setModelFormData({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        phoneNo: "",
        addresLine1: "",
        addresLine2: "",
        zip: "",
        city: "",
        country: "",
        nationality: "",
        height: 0,
        shoeSize: 0,
        hairColor: "",
        eyeColor: "",
        comments: "",
        birthDate: null,
      });
    }
  };

  const handleNavigation = (path) => {
    navigate(path);
  };

  if (error) return navigate(Paths.ERROR);

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <Button
          variant="contained"
          onClick={() => handleNavigation(Paths.MODELS)}
          startIcon={<ArrowBackIcon />}
        >
          Go Back
        </Button>
      </Box>
      <AddModelForm
        formData={modelFormData}
        handleChange={handleChange}
        handleDateChange={handleDateChange}
        handleSubmit={handleSubmit}
        isFormValid={isFormValid}
      />
    </Box>
  );
};

export default AddModelPage;
