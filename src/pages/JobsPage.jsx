import { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import useFetchJobs from "../hooks/useFetchJobs";
import { Box, Button } from "@mui/material";
import AddBox from "@mui/icons-material/AddBox";
import JobsTable from "../components/Job/JobsTable";


const JobsPage = () => {

  const { token } = useAuth();
  const { fetchData, isLoading, error } = useFetchJobs(token);
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const loadJobs = async () => {
      const jobsData = await fetchData();
      if (jobsData) {
        setJobs(jobsData);
      }
    };

    loadJobs();
  }, [fetchData]);

  if (error) return <div>Error: {error}</div>;


  return (
    <>
      <Box sx={{ mb: 2 }}>
        <Button variant="contained" startIcon={<AddBox />}>
          Add Job
        </Button>
      </Box>
      <JobsTable jobs={jobs} isLoading={isLoading}/>

    </>
  );
};

export default JobsPage;
