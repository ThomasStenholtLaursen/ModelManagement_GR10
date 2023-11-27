import { useState, useCallback } from "react";
import { useSnackbar } from "notistack";
import Api_Urls from "../config/urls";

const useAddManager = (token) => {
  const { enqueueSnackbar } = useSnackbar();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const addManager = useCallback(
    async (managerData) => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(Api_Urls.ADDMANAGER, {
          method: "POST",
          credentials: "include",
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(managerData),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        enqueueSnackbar(`Added manager: ${data.firstName} ${data.lastName}`, {
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

  return { addManager, isLoading, error };
};

export default useAddManager;
