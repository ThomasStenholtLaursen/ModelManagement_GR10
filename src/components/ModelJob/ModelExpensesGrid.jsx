/* eslint-disable react/prop-types */
import { DataGrid } from "@mui/x-data-grid";
import dayjs from "dayjs";

const ModelExpensesGrid = ({ expenses, isLoading }) => {
  const formatDate = (dateString) => {
    return dayjs(dateString).format("MM-DD-YYYY");
  };

  const columns = [
    {
      field: "amount",
      headerName: "Amount",
      flex: 1,
      valueGetter: (params) => `${`$ ${params.row.amount}` || "N/A"}`,
    },
    {
      field: "text",
      headerName: "Description",
      flex: 3,
      valueGetter: (params) => `${params.row.text || "N/A"}`,
    },
    {
      field: "date",
      headerName: "Date",
      flex: 1,
      valueGetter: (params) =>
        params.row.date ? formatDate(params.row.date) : "N/A",
    },
  ];

  const rows = expenses.map((model, index) => ({
    id: index,
    ...model,
  }));

  return (
    <div style={{ height: `calc(100vh - ${150}px)`, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[5]}
        loading={isLoading}
      />
    </div>
  );
};

export default ModelExpensesGrid;
