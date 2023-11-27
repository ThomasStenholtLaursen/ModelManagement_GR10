import { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { Box, Breadcrumbs, Button, Typography } from "@mui/material";
import { Link, useNavigate, useParams } from "react-router-dom";
import useFetchJob from "../hooks/useFetchJob";
import useFetchExpenses from "../hooks/useFetchExpenses";
import useFetchModels from "../hooks/useFetchModels";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import AddModelToJobModal from "../components/Job/AddModelToJobModal";
import ExspensesTable from "../components/Job/ExpensesTable";
import ModelsOnJobTable from "../components/Job/ModelsOnJobTable";

const JobPage = () => {
    const {jobId} = useParams()
    const navigate = useNavigate();

    const { token, user, isManager } = useAuth();
    const {fetchData : fetchJobData, error } = useFetchJob(token);
    const {fetchData : fetchExpenseData} = useFetchExpenses(token);
    const {fetchData : fetchModelsData} = useFetchModels(token);
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
    
    const handleOpenExpenseModal = () => {
        // Implement logic to open the AddExpenseModal
    }
    const handleAddModelToJob = (selectedModel) => {
        // Implement logic to add the selectedModel to your job
        console.log("Selected Model:", selectedModel);
    };
    
    useEffect(() => {
      const loadJob = async () => {
        const jobData = await fetchJobData(jobId);
        if (jobData) {
          setJob(jobData);
        }
      };
      const loadExpenses = async () => {
        const expensesData = await fetchExpenseData();
        if (expensesData) {
            if (isManager){
                const expensesDataForJob = expensesData.filter(expense => expense.jobId === Number(jobId))
                setExpenses(expensesDataForJob);
            }
            else{
                setExpenses(expensesData.filter(expense => expense.modelId === user.id));
            }
        }
      };

      const loadModels = async () => {
        const modelsData = await fetchModelsData();
        if (modelsData) {
          setModels(modelsData);
        }
      }
  
      loadJob();
      loadExpenses();
      loadModels();
    }, [fetchExpenseData, fetchJobData, fetchModelsData, isManager, jobId, user.id]);

    const handleJobsLinkClick = () => {
        navigate(-1);
      };

  
    if (error) return <div>Error: {error}</div>;
  
  
    return (
        <>
          <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="inherit" href="/jobs" onClick={handleJobsLinkClick}>
              Jobs
            </Link>
            <Typography color="text.primary">{job ? `Job for ${job.customer}` : "Loading..."}</Typography>
          </Breadcrumbs>
          {isManager && (
            <>
                <Box sx={{ display: "flex", pb: 2 }}>
                    <Button variant="contained" startIcon={<PersonAddIcon />} onClick={handleOpenAddModelToJobModal}>
                    Add Model to job
                    </Button>
                </Box>
                <Typography variant="h4">Models on this job</Typography>
             <ModelsOnJobTable job={job} />   
          </>
          )}
            {!isManager && (
                <Box sx={{ display: "flex", pb: 2 }}>
                    <Button variant="contained" startIcon={<PersonAddIcon />} onClick={handleOpenExpenseModal}>
                        Add expense
                    </Button>
                </Box>  
            )} 
          <Typography variant="h4">Expenses</Typography>
          <ExspensesTable expenses={expenses} models={models} />
          <AddModelToJobModal
            models={models}
            open={isModalOpen}
            onClose={handleCloseModal}
            onAdd={handleAddModelToJob}
            />
        </>
      );
    };
  
  export default JobPage;