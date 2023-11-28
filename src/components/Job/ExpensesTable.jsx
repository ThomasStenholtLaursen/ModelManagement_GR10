/* eslint-disable react/prop-types */
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";

const ExspensesTable = ({ expenses, models }) => {

    
    const modelNameForExpense = (modelId) => {
        if(!models) return ("Loading...")
        const model = models.find(model => model.efModelId === Number(modelId));
        if (model) {
            return `${String(model.firstName)} ${model.lastName}`;
          } else {
            return "Model not found";
          }}
    
    const formattedDate = (date) => {
    return new Date(date).toLocaleDateString();}

    return (
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

    )

}
export default ExspensesTable;
