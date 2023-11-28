import { useState, useCallback } from "react";
import { useSnackbar } from "notistack";
import Api_Urls from "../config/urls";

const useAddModel = (token) => {
  const { enqueueSnackbar } = useSnackbar();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const addModel = useCallback(
    async (modelData) => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(Api_Urls.ADDMODEL, {
          method: "POST",
          credentials: "include",
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(modelData),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        enqueueSnackbar(`Added model: ${data.firstName} ${data.lastName}`, {
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

  return { addModel, isLoading, error };
};

export default useAddModel;
