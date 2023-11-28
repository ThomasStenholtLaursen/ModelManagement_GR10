import { useState, useCallback } from "react";
import { useSnackbar } from "notistack";
import Api_Urls from "../config/urls";

const useAddJob = (token) => {
  const { enqueueSnackbar } = useSnackbar();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const addJob = useCallback(
    async (jobData) => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(Api_Urls.ADDJOB, {
          method: "POST",
          credentials: "include",
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(jobData),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        enqueueSnackbar(`Added job for: ${data.customer} at ${data.location}`, {
          variant: "success",
        });
        return data;
      } catch (error) {
        enqueueSnackbar("Something went wrong", {
          variant: "error",
        });
        return null;
      } finally {
        setIsLoading(true);
      }
    },
    [enqueueSnackbar, token]
  );

  return { addJob, isLoading, error };
};

export default useAddJob;
