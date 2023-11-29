import { useAuth } from "../../hooks/useAuth";
import useFetchModels from "../../hooks/useFetchModels";
import { useEffect, useState } from "react";
import { Box, Button } from "@mui/material";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { useNavigate } from "react-router";
import Paths from "../../config/paths";
import ModelsGrid from "../../components/Model/ModelsGrid";

const ModelsPage = () => {
  const navigate = useNavigate();
  const { token } = useAuth();
  const { fetchData, isLoading, error } = useFetchModels(token);
  const [models, setModels] = useState([]);

  useEffect(() => {
    const getModels = async () => {
      const modelsData = await fetchData();
      if (modelsData) {
        setModels(modelsData);
      }
    };

    getModels();
  }, [fetchData]);

  useEffect(() => {
    if (error) {
      navigate(Paths.ERROR);
    }
  }, [error, navigate]);

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <>
      <Box sx={{ display: "flex", pb: 2 }}>
        <Button
          variant="contained"
          onClick={() => handleNavigation(Paths.ADDMODEL)}
          startIcon={<PersonAddIcon />}
        >
          Add Model
        </Button>
      </Box>
      <Box sx={{ display: "flex", pb: 2 }}>
        <ModelsGrid models={models} isLoading={isLoading} />
      </Box>
    </>
  );
};

export default ModelsPage;
