import { useState, useCallback } from "react";
import { useSnackbar } from "notistack";
import Api_Urls from "../config/urls";
import { parseTokenToUser } from "../helpers/ParseToken";

const useLoginUser = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const login = useCallback(
    async (email, password) => {
      setIsLoading(true);
      setError(null);
      try {
        let response = await fetch(Api_Urls.LOGIN, {
          method: "POST",
          body: JSON.stringify({ email, password }),
          headers: new Headers({
            "Content-Type": "application/json",
          }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        let data = await response.json();
        localStorage.setItem("token", data.jwt);
        enqueueSnackbar("Login successful", {
          variant: "success",
        });
        return {
          token: data.jwt,
          user: parseTokenToUser(data.jwt),
        };
      } catch (err) {
        enqueueSnackbar("Email or password is incorrect", {
          variant: "error",
        });
        setError(err);
        return null;
      } finally {
        setIsLoading(false);
      }
    },
    [enqueueSnackbar]
  );

  return { login, isLoading, error };
};

export default useLoginUser;
