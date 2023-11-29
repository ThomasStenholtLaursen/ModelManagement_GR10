import { useCallback, useEffect, useMemo, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { Box, Breadcrumbs, Button, Typography } from "@mui/material";
import { Link, useNavigate, useParams } from "react-router-dom";
import useFetchJob from "../../hooks/useFetchJob";
import useFetchExpenses from "../../hooks/useFetchExpenses";
import useFetchModels from "../../hooks/useFetchModels";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import AddModelToJobModal from "../../components/Job/AddModelToJobModal";
import ExspensesTable from "../../components/Job/ExpensesTable";
import ModelsOnJobTable from "../../components/Job/ModelsOnJobTable";
import useAddModelToJob from "../../hooks/useAddModelToJob";

const ManagerJobPage = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const { token, user } = useAuth();
  const { fetchData: fetchJobData, isLoading: fetchJobLoading } =
    useFetchJob(token);
  const { fetchData: fetchExpenseData, isLoading: fetchExpensesLoading } =
    useFetchExpenses(token);
  const { fetchData: fetchModelsData, isLoading: fetchModelsLoading } =
    useFetchModels(token);
  const { addModelToJob } = useAddModelToJob(token);
  const [job, setJob] = useState();
  const [expenses, setExpenses] = useState([]);
  const [models, setModels] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);

  const handleOpenAddModelToJobModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const getModels = useCallback(async () => {
    const modelsData = await fetchModelsData();
    if (modelsData) {
      setModels(modelsData);
    }
  }, [fetchModelsData]);

  const getJob = useCallback(async () => {
    const jobData = await fetchJobData(jobId);
    if (jobData) {
      setJob(jobData);
    }
  }, [fetchJobData, jobId]);

  const getExpenses = useCallback(async () => {
    const expensesData = await fetchExpenseData();
    if (expensesData) {
      setExpenses(expensesData);
    }
  }, [fetchExpenseData]);

  useEffect(() => {
    getModels();
    getJob();
    getExpenses();
  }, [getExpenses, getJob, getModels]);

  const sortedExpenses = useMemo(() => {
    if (expenses) {
      const expensesDataForJob = expenses.filter(
        (expense) => expense.jobId === Number(jobId)
      );
      return expensesDataForJob;
    } else {
      return expenses.filter((expense) => expense.modelId === user.id);
    }
  }, [expenses, jobId, user.id]);

  const modelsWithoutThisJob = useMemo(() => {
    if (job?.models && models) {
      const modelEmails = job.models.map((model) => model.email);
      return models.filter((model) => !modelEmails.includes(model.email));
    }
    return [];
  }, [job?.models, models]);

  const handleAddModelToJob = async (selectedModel, job) => {
    const result = await addModelToJob(
      selectedModel.value.efModelId,
      job.jobId
    );
    if (result) {
      getModels();
      getJob();
      handleCloseModal();
    }
  };

  const reloadJobAndModels = async () => {
    await getModels();
    await getJob();
  };

  const handleJobsLinkClick = () => {
    navigate(-1);
  };

  return (
    <>
      {fetchJobLoading || fetchExpensesLoading || fetchModelsLoading ? (
        <Typography>Loading...</Typography>
      ) : job ? (
        <>
          <Box sx={{ pb: 2 }}>
            <Breadcrumbs aria-label="breadcrumb">
              <Link
                underline="hover"
                color="inherit"
                href="/jobs"
                onClick={handleJobsLinkClick}
              >
                Jobs
              </Link>
              <Typography color="text.primary">{job.customer}</Typography>
            </Breadcrumbs>
          </Box>

          <Box sx={{ display: "flex", pb: 2 }}>
            <Button
              variant="contained"
              startIcon={<PersonAddIcon />}
              onClick={handleOpenAddModelToJobModal}
            >
              Add Model to job
            </Button>
          </Box>
          <Box sx={{ pb: 2 }}>
            <Typography variant="h5">{`Models on ${job.customer}`}</Typography>
          </Box>
          <Box sx={{ pb: 2 }}>
            <ModelsOnJobTable job={job} models={models} reloadJobAndModels={reloadJobAndModels}/>
          </Box>

          <Box sx={{ pb: 2 }}>
            <Typography variant="h5">{`Expenses for models working for ${job.customer}`}</Typography>
          </Box>
          <Box sx={{ pb: 2 }}>
            <ExspensesTable expenses={sortedExpenses} models={models} />
          </Box>
          <AddModelToJobModal
            models={modelsWithoutThisJob}
            open={isModalOpen}
            onClose={handleCloseModal}
            onAdd={(selectedModel) => handleAddModelToJob(selectedModel, job)}
          />
        </>
      ) : (
        <Typography>Error: Job not found</Typography>
      )}
    </>
  );
};

export default ManagerJobPage;
