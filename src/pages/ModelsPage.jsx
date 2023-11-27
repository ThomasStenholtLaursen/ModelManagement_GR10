import { useAuth } from "../hooks/useAuth";
import Page from "./Page";
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
    <Page>
      <Box sx={{ mb: 2 }}>
        <Button variant="contained" startIcon={<PersonAddIcon />}>
          Add Model
        </Button>
      </Box>
      <ModelsTable models={models} isLoading={isLoading} />
    </Page>
  );
};

export default ModelsPage;
