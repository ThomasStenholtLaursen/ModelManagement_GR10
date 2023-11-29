import { useState, useCallback } from "react";
import Api_Urls from "../config/urls";

const useFetchJob = (token) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = useCallback(
    async (jobId) => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(`${Api_Urls.GETJOB}${jobId}`, {
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
    },
    [token]
  );

  return { fetchData, isLoading, error };
};

export default useFetchJob;
