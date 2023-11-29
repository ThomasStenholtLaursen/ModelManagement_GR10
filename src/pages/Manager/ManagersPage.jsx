import { useCallback, useEffect, useState } from "react";
import { Box, Button } from "@mui/material";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { useAuth } from "../../hooks/useAuth";
import useFetchManagers from "../../hooks/useFetchManagers";
import AddManagerModal from "../../components/Manager/AddManagerModal";
import useAddManager from "../../hooks/useAddManager";
import validator from "validator";
import ManagersGrid from "../../components/Manager/ManagersGrid";
import { useNavigate } from "react-router-dom";
import Paths from "../../config/paths";

const ManagersPage = () => {
  const navigate = useNavigate();
  const { token } = useAuth();
  const { fetchData, isLoading, error: fetchError } = useFetchManagers(token);
  const { addManager, error: addError } = useAddManager(token);
  const [managers, setManagers] = useState([]);
  const [open, setOpen] = useState(false);
  const [managerFormData, setManagerFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const isFormValid =
    managerFormData.firstName &&
    managerFormData.lastName &&
    validator.isEmail(managerFormData.email) &&
    managerFormData.password;

  const fetchManagers = useCallback(async () => {
    const managersData = await fetchData();
    if (managersData) {
      setManagers(managersData);
    }
  }, [fetchData]);

  useEffect(() => {
    if (addError || fetchError) {
      navigate(Paths.ERROR);
    }
  }, [addError, fetchError, navigate]);

  useEffect(() => {
    fetchManagers();
  }, [fetchManagers]);

  const handleSubmit = async () => {
    const result = await addManager(managerFormData);
    if (result) {
      handleClose();
      setManagerFormData({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
      });
      fetchManagers();
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setManagerFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Box>
        <Box sx={{ display: "flex", pb: 2 }}>
          <Button
            variant="contained"
            startIcon={<PersonAddIcon />}
            onClick={handleOpen}
          >
            Add Manager
          </Button>
        </Box>
        <ManagersGrid managers={managers} isLoading={isLoading} />
      </Box>
      <AddManagerModal
        open={open}
        handleClose={handleClose}
        managerFormData={managerFormData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        isFormValid={isFormValid}
      />
    </>
  );
};

export default ManagersPage;
