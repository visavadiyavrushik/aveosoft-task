import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import axios from "axios";
import TableSortLabel from "@mui/material/TableSortLabel";
import { CustomTablePagination } from "./CustomTablePagination.style";

const pageSize = 10;

const BasicTable = (props) => {
  const [user, setUser] = useState([]);

  // ****  sorting *******
  const [order, setOrder] = useState("ASC");
  const [col, setCol] = useState();

  // ***** pagination **********
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(25);

  // ********* searching *********
  const [input, setInput] = useState();
  // const [output, setOutput] = useState('')

  const fetchDetail = () => {
    axios.get("https://jsonplaceholder.typicode.com/todos").then((res) => {
      setUser(res.data);
    });
  };

  useEffect(() => {
    fetchDetail();
  }, []);

  // **************** SORTING *********************

  const sorting = () => {
    if (order === "ASC") {
      const sorted = user.sort((a, b) => {
        return b[col] - a[col];
      });
      setUser(sorted);
      setOrder("DSC");
    }

    if (order === "DSC") {
      const sorted = user.sort((a, b) => {
        return a[col] - b[col];
      });
      setUser(sorted);
      setOrder("ASC");
    }
  };

  //=======================title sorting =============================
  const sortingtitle = () => {
    if (order === "ASC") {
      const sorted = user.sort((a, b) => {
        return ("" + a[col]).localeCompare(b[col]);
      });
      setUser(sorted);
      setOrder("DSC");
    }

    if (order === "DSC") {
      const sorted = user.sort((a, b) => {
        return ("" + b[col]).localeCompare(a[col]);
      });
      setUser(sorted);
      setOrder("ASC");
    }
  };

  // *********************** PAGINATION ***************

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // ===================== searching=====================

  const handlesearch = (event) => {
    const search = event.target.value;

    if (search.length > 0  ) {
      const newSearch = user.filter((val) => {
        return val.title.toLowerCase().includes(search.toLowerCase());
      });
      setUser(newSearch);
      setInput(search);
    }
    else{
      fetchDetail();
    }
  };

  return (
    <>
      
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>
              <TableSortLabel
                onClick={() => {
                  setCol("id");
                  sorting();
                }}
              >
                ID
              </TableSortLabel>{" "}
            </TableCell>

            <TableCell>
              <TableSortLabel
                onClick={() => {
                  setCol("userId");
                  sorting();
                }}
              >
                User ID
              </TableSortLabel>
            </TableCell>

            <TableCell>
           
              <TableSortLabel
                onClick={() => {
                  setCol("title");
                  sortingtitle();
                }}
              >
                Title{" "}
              </TableSortLabel>
              <input type="text" placeholder="search.." onChange={handlesearch} />
            </TableCell>

            <TableCell
              onClick={() => {
                setCol("completed");
                sortingtitle();
              }}
            >
              <TableSortLabel>Completed</TableSortLabel>
            </TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {user
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.id}</TableCell>
                <TableCell>{item.userId}</TableCell>
                <TableCell>{item.title}</TableCell>
                <TableCell>{item.completed.toString()}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>

      <CustomTablePagination
        rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
        colSpan={3}
        count={user.length}
        rowsPerPage={rowsPerPage}
        page={page}
        componentsProps={{
          select: {
            "aria-label": "rows per page",
          },
        }}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  );
};

export default BasicTable;
