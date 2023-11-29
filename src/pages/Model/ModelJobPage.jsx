import { useCallback, useEffect, useMemo, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { Box, Button } from "@mui/material";
import { useParams } from "react-router-dom";
import useFetchModelExpenses from "../../hooks/useFetchModelExpenses";
import ModelExpensesGrid from "../../components/ModelJob/ModelExpensesGrid";
import AddBox from "@mui/icons-material/AddBox";
import AddModelExpenseModal from "../../components/ModelJob/AddModelExpenseModal";
import useAddExpense from "../../hooks/useAddExpense";

const ModelJobPage = () => {
  const { token, user } = useAuth();
  const { jobId } = useParams();
  const { fetchData, isLoading } = useFetchModelExpenses(token, user.ModelId);
  const { addExpense } = useAddExpense(token);
  const [expenses, setExpenses] = useState([]);
  const [open, setOpen] = useState(false);

  const [expenseFormData, setExpenseFormData] = useState({
    modelId: Number(user.ModelId),
    jobId: Number(jobId),
    amount: 0,
    date: "",
    text: "",
  });

  const isFormValid =
    expenseFormData.date && expenseFormData.text && expenseFormData.amount;

  const getModelExpenses = useCallback(async () => {
    const expensesData = await fetchData();
    if (expensesData) {
      setExpenses(expensesData);
    }
  }, [fetchData]);

  useEffect(() => {
    getModelExpenses();
  }, [getModelExpenses]);

  const sortedExpenses = useMemo(() => {
    if (expenses) {
      const expensesForJob = expenses.filter(
        (expense) =>
          expense.modelId === Number(user.ModelId) &&
          expense.jobId === Number(jobId)
      );
      return expensesForJob;
    }
  }, [expenses, jobId, user.ModelId]);

  const handleSubmit = async () => {
    const result = await addExpense(expenseFormData);
    if (result) {
      handleClose();
      setExpenseFormData((prevData) => ({
        ...prevData,
        amount: 0,
        date: "",
        text: "",
      }));
      getModelExpenses();
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setExpenseFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleDateChange = (newValue) => {
    setExpenseFormData({ ...expenseFormData, date: newValue });
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Box>
        <Box sx={{ display: "flex", pb: 2 }}>
          <Button
            variant="contained"
            startIcon={<AddBox />}
            onClick={handleOpen}
          >
            Add Expense
          </Button>
        </Box>
        <ModelExpensesGrid expenses={sortedExpenses} isLoading={isLoading} />
      </Box>
      <AddModelExpenseModal
        open={open}
        handleClose={handleClose}
        handleChange={handleChange}
        expenseFormData={expenseFormData}
        handleSubmit={handleSubmit}
        isFormValid={isFormValid}
        handleDateChange={handleDateChange}
      />
    </>
  );
};

export default ModelJobPage;
