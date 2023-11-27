import { useState, useCallback } from "react";
import Api_Urls from "../config/urls";

const useFetchManagers = (token) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(Api_Urls.GETMANGERS, {
        method: "GET",
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
      return data;
    } catch (error) {
      setError(`Something bad happened: ${error.message}`);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, [token]);

  return { fetchData, isLoading, error };
};

export default useFetchManagers;
