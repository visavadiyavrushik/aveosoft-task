import { styled } from "@mui/system";
import TablePaginationUnstyled from "@mui/base/TablePaginationUnstyled";

const blue = {
  200: "#A5D8FF",
  400: "#3399FF"
};

const grey = {
  50: "#F3F6F9",
  100: "#E7EBF0",
  200: "#E0E3E7",
  300: "#CDD2D7",
  400: "#B2BAC2",
  500: "#A0AAB4",
  600: "#6F7E8C",
  700: "#3E5060",
  800: "#2D3843",
  900: "#1A2027"
};

export const CustomTablePagination = styled(TablePaginationUnstyled)(
  ({ theme }) => `
    & .MuiTablePaginationUnstyled-spacer {
      display: none;
    }
    & .MuiTablePaginationUnstyled-toolbar {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 10px;
      @media (min-width: 768px) {
        flex-direction: row;
        align-items: center;
      }
    }
    & .MuiTablePaginationUnstyled-selectLabel {
      margin: 0;
    }
    & .MuiTablePaginationUnstyled-select {
      padding: 2px;
      border: 1px solid ${theme.palette.mode === "dark" ? grey[800] : grey[200]};
      border-radius: 50px;
      background-color: transparent;
      &:hover {
        background-color: ${theme.palette.mode === "dark" ? grey[800] : grey[50]};
      }
      &:focus {
        outline: 1px solid ${theme.palette.mode === "dark" ? blue[400] : blue[200]};
      }
    }
    & .MuiTablePaginationUnstyled-displayedRows {
      margin: 0;
      @media (min-width: 768px) {
        margin-left: auto;
      }
    }
    & .MuiTablePaginationUnstyled-actions {
      padding: 2px;
      border: 1px solid ${theme.palette.mode === "dark" ? grey[800] : grey[200]};
      border-radius: 50px;
      text-align: center;
    }
    & .MuiTablePaginationUnstyled-actions > button {
      margin: 0 8px;
      border: transparent;
      border-radius: 2px;
      background-color: transparent;
      &:hover {
        background-color: ${theme.palette.mode === "dark" ? grey[800] : grey[50]};
      }
      &:focus {
        outline: 1px solid ${theme.palette.mode === "dark" ? blue[400] : blue[200]};
      }
    }
    `
);