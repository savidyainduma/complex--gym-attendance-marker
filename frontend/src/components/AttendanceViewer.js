import { Paper } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import React, { useEffect, useState } from "react";

const AttendanceViewer = () => {
  const [rows, setRows] = useState([]);

  const columns = [
    { field: "reg_number", headerName: "Registration No", width: 300 },
    {
      field: "student_in",
      headerName: "Student In",
      width: 300,
      valueGetter: (value, row) =>
        `${value?.substring(0, 19).replace("T", " ") || "-"}`,
    },
    {
      field: "student_out",
      headerName: "Student Out",
      width: 300,
      valueGetter: (value, row) =>
        `${value?.substring(0, 19).replace("T", " ") || "-"}`,
    },
  ];

  useEffect(() => {
    const getAllAttendance = async () => {
      try {
        const response = await axios.get("http://localhost:8081/getAttendance");
        setRows(response.data);
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

export default AttendanceViewer;
