import { useState, useCallback } from "react";
import { useSnackbar } from "notistack";

const useDeleteModelFromJob = (token) => {
  const { enqueueSnackbar } = useSnackbar();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const deleteModelFromJob = useCallback(
    async (modelId, jobId) => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(`https://localhost:7181/api/Jobs/${jobId}/model/${modelId}`, {
          method: "DELETE",
          credentials: "include",
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
          },
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        enqueueSnackbar(`Deleted model from job`, {
          variant: "success",
        });
        return response;
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

  return { deleteModelFromJob, isLoading, error };
};

export default useDeleteModelFromJob;