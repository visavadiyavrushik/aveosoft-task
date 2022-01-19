import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import axios from "axios";
import TableSortLabel from "@mui/material/TableSortLabel";
// import { CustomTablePagination } from "./CustomTablePagination.style";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

const BasicTable = (props) => {
  const [user, setUser] = useState([]);

  // ****  sorting *******
  const [order, setOrder] = useState("ASC");
  const [col, setCol] = useState();

  // ***** pagination **********

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(25);
  const [filteredData, setFilteredData] = useState([]);

  // ********* searching *********
  const [input, setInput] = useState();

  // ***********API call ************
  const fetchDetail = () => {
    axios.get("https://jsonplaceholder.typicode.com/todos").then((res) => {
      setUser(res.data);

      const filteredData = res.data.filter((element, key) => {
        if (key < postsPerPage && key >= 0) {
          return element;
        }
      });

      setFilteredData(filteredData);
    });
  };

  useEffect(() => {
    fetchDetail();
  }, []);

  // **************** SORTING LOGIC *********************

  const sorting = () => {
    if (order === "ASC") {
      const sorted = user.sort((a, b) => {
        return b[col] - a[col];
      });
      setUser(sorted);
      setOrder("DSC");
      setFilteredData(filterAllData(sorted, currentPage, postsPerPage));
    }

    if (order === "DSC") {
      const sorted = user.sort((a, b) => {
        return a[col] - b[col];
      });
      setUser(sorted);
      setOrder("ASC");
      setFilteredData(filterAllData(sorted, currentPage, postsPerPage));
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
      setFilteredData(filterAllData(sorted, currentPage, postsPerPage));
    }

    if (order === "DSC") {
      const sorted = user.sort((a, b) => {
        return ("" + b[col]).localeCompare(a[col]);
      });
      setUser(sorted);
      setOrder("ASC");
      setFilteredData(filterAllData(sorted, currentPage, postsPerPage));
    }
  };

  // *********************** PAGINATION ***************

  // const handleChangePage = (event, newPage) => {
  //   setPage(newPage);
  // };

  // const handleChangeRowsPerPage = (event) => {
  //   setRowsPerPage(parseInt(event.target.value, 10));
  //   setPage(0);
  // };

  // ===================updated pagination====================
  const paginate = (event, pageNumber) => {
    console.log("pagenumber ", pageNumber);

    setFilteredData(filterAllData(user, pageNumber, postsPerPage));

    setCurrentPage(pageNumber);
  };

  const filterAllData = (data, newPage, rowsPerPage) => {
    const filteredData = data.filter((element, key) => {
      if (
        key < newPage * rowsPerPage &&
        key >= newPage * rowsPerPage - rowsPerPage
      ) {
        return element;
      }
    });
    return filteredData;
  };

  // ===================== searching=====================

  const handlesearch = (event) => {
    const search = event.target.value;

    if (search.length > 0) {
      const newSearch = filteredData.filter((val) => {
        return val.title.toLowerCase().includes(search.toLowerCase());
      });
      setInput(search);
      setFilteredData(filterAllData(newSearch, currentPage, postsPerPage));
    } else {
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
              <input
                type="text"
                placeholder="search.."
                onChange={handlesearch}
              />
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
          {filteredData.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.id}</TableCell>
              <TableCell>{item.userId}</TableCell>
              <TableCell>{item.title}</TableCell>
              <TableCell>{item.completed.toString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* old pagination  */}
      {/* 
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
      /> */}

      {/* new pagination  */}

      <Stack spacing={2}>
        <Pagination count={user.length / postsPerPage} onChange={paginate} />{" "}
      </Stack>
    </>
  );
};

export default BasicTable;
