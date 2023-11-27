/* eslint-disable react/prop-types */
import { DataGrid } from "@mui/x-data-grid";

const ManagersGrid = ({ managers, isLoading }) => {
  const columns = [
    {
      field: "fullName",
      headerName: "Name",
      flex: 1,
      valueGetter: (params) =>
        `${params.row.firstName || "N/A"} ${params.row.lastName || "N/A"}`,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
      valueGetter: (params) => `${params.row.email || "N/A"}`,
    },
  ];

  const rows = managers.map((model, index) => ({
    id: index,
    ...model,
  }));

  return (
    <div style={{ height: `calc(100vh - ${145}px)`, width: "100%" }}>
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

export default ManagersGrid;
