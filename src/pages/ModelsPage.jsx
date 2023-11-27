import { useAuth } from "../hooks/useAuth";
import useFetchModels from "../hooks/useFetchModels";
import { useEffect, useState } from "react";
import ModelsTable from "../components/ModelsTable";
import { Box, Button } from "@mui/material";
import PersonAddIcon from "@mui/icons-material/PersonAdd";

const ModelsPage = () => {
  const { token } = useAuth();
  const { fetchData, isLoading, error } = useFetchModels(token);
  const [models, setModels] = useState([]);

  useEffect(() => {
    const loadModels = async () => {
      const modelsData = await fetchData();
      if (modelsData) {
        setModels(modelsData);
      }
    };

    loadModels();
  }, [fetchData]);

  if (error) return <div>Error: {error}</div>;

  return (
    <>
      <Box>
        <Button variant="contained" startIcon={<PersonAddIcon />}>
          Add Model
        </Button>
      </Box>
      <ModelsTable models={models} isLoading={isLoading} />
    </>
  );
};

export default ModelsPage;
