import { useState, useCallback } from "react";

const useFetchJobs = (token) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch("https://localhost:7181/api/Jobs", {
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

export default useFetchJobs;