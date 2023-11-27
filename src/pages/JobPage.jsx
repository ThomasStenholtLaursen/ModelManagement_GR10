import { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { Breadcrumbs, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { Link, useNavigate, useParams } from "react-router-dom";
import useFetchJob from "../hooks/useFetchJob";
import DeleteIcon from '@mui/icons-material/Delete';
import useFetchExpenses from "../hooks/useFetchExpenses";
import useFetchModels from "../hooks/useFetchModels";

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

    const formattedDate = (date) => {
        return new Date(date).toLocaleDateString();}

    const handleJobsLinkClick = () => {
        navigate(-1);
      };

    const modelNameForExpense = (modelId) => {
        const model = models.find(model => model.efModelId === Number(modelId));
        return `${model.firstName} ${model.lastName}`}
  
    if (error) return <div>Error: {error}</div>;
  
  
    return (
        <>
          <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="inherit" href="/jobs" onClick={handleJobsLinkClick}>
              Jobs
            </Link>
            <Typography color="text.primary">{job ? `Job for ${job.customer}` : "Loading..."}</Typography>
          </Breadcrumbs>
          
          <Typography variant="h4">Models</Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Phone</TableCell>
                  <TableCell>Delete</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {job?.models.map((model) => (
                  <TableRow key={model.firstName}>
                    <TableCell>{`${model.firstName} ${model.lastName}`}</TableCell>
                    <TableCell>{model.email}</TableCell>
                    <TableCell>{model.phoneNo}</TableCell>
                    <TableCell>
                      <IconButton >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
    
          <Typography variant="h4">Expenses</Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Amount</TableCell>
                  <TableCell>Text</TableCell>
                  <TableCell>Model Name</TableCell>
                  <TableCell>Date</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {expenses?.map((expense) => (
                  <TableRow key={expense.efExpenseId}>
                    <TableCell>{expense.amount}</TableCell>
                    <TableCell>{expense.text}</TableCell>
                    <TableCell>{modelNameForExpense(expense.modelId)}</TableCell>
                    <TableCell>{formattedDate(expense.date)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      );
    };
  
  export default JobPage;