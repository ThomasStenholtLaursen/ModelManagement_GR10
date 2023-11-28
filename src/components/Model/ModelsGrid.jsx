/* eslint-disable react/prop-types */
import { DataGrid } from "@mui/x-data-grid";

const ModelsGrid = ({ models, isLoading }) => {
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
    {
      field: "phoneNo",
      headerName: "Phone",
      flex: 0.5,
      valueGetter: (params) => `${params.row.phoneNo || "N/A"}`,
    },
    {
      field: "height",
      headerName: "Height",
      flex: 0.3,
      valueGetter: (params) => `${params.row.height || "N/A"}`,
    },
    {
      field: "shoeSize",
      headerName: "Shoe Size",
      flex: 0.3,
      valueGetter: (params) => `${params.row.shoeSize || "N/A"}`,
    },
    {
      field: "city",
      headerName: "City",
      flex: 0.5,
      valueGetter: (params) => `${params.row.city || "N/A"}`,
    },
    {
      field: "country",
      headerName: "Country",
      flex: 0.5,
      valueGetter: (params) => `${params.row.country || "N/A"}`,
    },
  ];

  const rows = models.map((model, index) => ({
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

export default ModelsGrid;
