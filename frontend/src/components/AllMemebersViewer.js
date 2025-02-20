import { Paper } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import React, { useEffect, useState } from "react";

const AllMembersViewer = () => {
  const [rows, setRows] = useState([]);

  const columns = [
    { field: "reg_number", headerName: "Registration No", width: 200 },
    {
      field: "name",
      headerName: "Name",
      width: 300,
    },
    {
      field: "email",
      headerName: "Email",
      width: 300,
    },
    {
      field: "phone_number",
      headerName: "Phone Number",
      width: 200,
    },
  ];

  useEffect(() => {
    const getAllAttendance = async () => {
      try {
        const response = await axios.get("http://localhost:8081/getAllMembers");
        setRows(response.data.map((data, index) => ({ ...data, id: index })));
      } catch (e) {
        console.error("Something happened", e);
      }
    };

    getAllAttendance();
  }, []);

  const paginationModel = { page: 0, pageSize: 5 };

  return (
    <Paper sx={{ height: "100%", width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[5, 10]}
        sx={{ border: 0 }}
      />
    </Paper>
  );
};

export default AllMembersViewer;
