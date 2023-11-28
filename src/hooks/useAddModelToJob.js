import { useState, useCallback } from "react";
import { useSnackbar } from "notistack";

const useAddModelToJob = (token) => {
  const { enqueueSnackbar } = useSnackbar();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const addModelToJob = useCallback(
    async (modelId, jobId) => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(`https://localhost:7181/api/Jobs/${jobId}/model/${modelId}`, {
          method: "POST",
          credentials: "include",
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        enqueueSnackbar(`Added model to job`, {
          variant: "success",
        });
        return data;
      } catch (error) {
        enqueueSnackbar("Something went wrong", {
          variant: "error",
        });
        return null;
      } finally {
        setIsLoading(false);
      }
    },
    [enqueueSnackbar, token]
  );

  return { addModelToJob, isLoading, error };
};

export default useAddModelToJob;
