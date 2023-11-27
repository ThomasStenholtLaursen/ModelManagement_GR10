import { useAuth } from "../hooks/useAuth";
import useFetchModels from "../hooks/useFetchModels";
import { useEffect, useState } from "react";
import { Box, Button } from "@mui/material";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import ModelsTable from "../components/Model/ModelsTable";
import { useNavigate } from "react-router";
import Paths from "../config/paths";

const ModelsPage = () => {
  const navigate = useNavigate();
  const { token } = useAuth();
  const { fetchData, isLoading } = useFetchModels(token);
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
        <ModelsTable models={models} isLoading={isLoading} />
      </Box>
    </>
  );
};

export default ModelsPage;
