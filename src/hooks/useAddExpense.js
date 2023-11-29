import { useState, useCallback } from "react";
import { useSnackbar } from "notistack";
import Api_Urls from "../config/urls";

const useAddExpense = (token) => {
  const { enqueueSnackbar } = useSnackbar();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const addExpense = useCallback(
    async (expenseData) => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(Api_Urls.ADDEXPENSE, {
          method: "POST",
          credentials: "include",
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(expenseData),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        enqueueSnackbar(`Added expense ${data.amount} (USD)`, {
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

  return { addExpense, isLoading, error };
};

export default useAddExpense;
