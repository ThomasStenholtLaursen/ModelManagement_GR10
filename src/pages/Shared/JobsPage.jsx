import { useCallback, useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import useFetchJobs from "../../hooks/useFetchJobs";
import { Box, Button } from "@mui/material";
import AddBox from "@mui/icons-material/AddBox";
import JobsTable from "../../components/Job/JobsTable";
import AddJobModal from "../../components/Job/AddJobModal";
import useAddJob from "../../hooks/useAddJob";
import { useNavigate } from "react-router-dom";
import Paths from "../../config/paths";

const JobsPage = () => {
  const navigate = useNavigate();
  const { token, isManager, isModel } = useAuth();
  const { fetchData, isLoading, error: fetchError } = useFetchJobs(token);
  const { addJob, error: addError } = useAddJob(token);
  const [jobs, setJobs] = useState([]);
  const [open, setOpen] = useState(false);
  const [jobFormData, setJobFormData] = useState({
    customer: "",
    startDate: "",
    days: 0,
    location: "",
    comments: "",
  });

  const isFormValid =
    jobFormData.customer &&
    jobFormData.startDate &&
    jobFormData.days &&
    jobFormData.location;

  const fetchJobs = useCallback(async () => {
    const jobsData = await fetchData();
    if (jobsData) {
      setJobs(jobsData);
    }
  }, [fetchData]);

  useEffect(() => {
    if (addError || fetchError) {
      navigate(Paths.ERROR);
    }
  }, [addError, fetchError, navigate]);

  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  const handleSubmit = async () => {
    const result = await addJob(jobFormData);
    if (result) {
      handleClose();
      setJobFormData({
        customer: "",
        startDate: "",
        days: 0,
        location: "",
        comments: "",
      });
      fetchJobs();
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setJobFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleDateChange = (newValue) => {
    setJobFormData({ ...jobFormData, startDate: newValue });
  };

  const handleNavigation = (jobId) => {
    if (isManager) {
      navigate(`/jobs/${jobId}`);
    } else if (isModel) {
      navigate(`/jobs/${jobId}/expenses`);
    }
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      {isManager && (
        <Box sx={{ mb: 2 }}>
          <Button
            variant="contained"
            startIcon={<AddBox />}
            onClick={handleOpen}
          >
            Add Job
          </Button>
        </Box>
      )}
      <JobsTable
        jobs={jobs}
        isLoading={isLoading}
        handleNavigation={handleNavigation}
      />
      {isManager && (
        <AddJobModal
          open={open}
          handleClose={handleClose}
          jobFormData={jobFormData}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          isFormValid={isFormValid}
          handleDateChange={handleDateChange}
        />
      )}
    </>
  );
};

export default JobsPage;
