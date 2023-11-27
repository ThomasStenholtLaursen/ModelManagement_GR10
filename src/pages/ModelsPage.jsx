import { useAuth } from "../hooks/useAuth";
import useFetchModels from "../hooks/useFetchModels";
import { useEffect, useState } from "react";
import { Box, Button } from "@mui/material";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import ModelsTable from "../components/Model/ModelsTable";

const ModelsPage = () => {
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

  if (error) return <div>Error: {error}</div>;

  return (
    <>
      <Box sx={{ display: "flex", pb: 2 }}>
        <Button variant="contained" startIcon={<PersonAddIcon />}>
          Add Model
        </Button>
      </Box>
      <ModelsTable models={models} isLoading={isLoading} />
    </>
  );
};

export default ModelsPage;
