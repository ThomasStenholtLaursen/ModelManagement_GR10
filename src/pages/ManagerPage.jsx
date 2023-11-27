import { useCallback, useEffect, useState } from "react";
import { Box, Button } from "@mui/material";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { useAuth } from "../hooks/useAuth";
import useFetchManagers from "../hooks/useFetchManagers";
import ManagersTable from "../components/Manager/ManagersTable";
import AddManagerModal from "../components/Manager/AddManagerModal";
import useAddManager from "../hooks/useAddManager";
import validator from "validator";

const ManagerPage = () => {
  const { token } = useAuth();
  const { fetchData, isLoading } = useFetchManagers(token);
  const { addManager } = useAddManager(token);
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
        <ManagersTable managers={managers} isLoading={isLoading} />
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

export default ManagerPage;
