import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableCellProps,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  TextField,
} from "@mui/material";
import { ReactElement, ReactNode, useMemo, useState } from "react";
import styles from "./DataTable.module.scss";

export interface Column<T> {
  label?: string;
  align?: TableCellProps["align"];
  valuefn: (value: T, index: number, array: T[]) => ReactNode;
  sortfn?: (rows: T[], direction: "asc" | "desc") => T[];
}

export interface DataTableProps<T> {
  className?: string;
  columns: Column<T>[];
  rows: T[];
}

interface SortInfo {
  rowIndex: number;
  direction: "asc" | "desc";
}

const DataTable = <T extends object>({
  columns,
  rows,
}: DataTableProps<T>): ReactElement => {
  const [sortInfo, setSortInfo] = useState<SortInfo>({
    rowIndex: 0,
    direction: "asc",
  });
  const [filterfns, setFilterfns] = useState<(() => boolean | null)[]>([]);
  const finalRows = useMemo(() => {
    return filterfns
      .filter((x) => x)
      .reduce((c, filterfn) => c.filter(filterfn), rows);
  }, [rows, filterfns]);

  return (
    <TableContainer>
      <Table stickyHeader>
        <TableHead>
          <TableRow className={styles.tableRow}>
            {columns.map((column, i) => (
              //   <TableCell align={column.align}>{column.label ?? ""}</TableCell>
              <TableCell className={styles.tableCell} align={column.align}>
                <TableSortLabel
                  active={i === sortInfo.rowIndex}
                  direction={"asc"}
                  onClick={() =>
                    setSortInfo((info) => ({ ...info, rowIndex: i }))
                  }
                >
                  {column.label}
                  {false && <Box component="span">sorted descending</Box>}
                </TableSortLabel>
              </TableCell>
            ))}
          </TableRow>
          <TableRow>
            {columns.map((column, i) => (
              //   <TableCell align={column.align}>{column.label ?? ""}</TableCell>
              <TableCell align={column.align}>
                <TextField variant="standard" />
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {finalRows.map((row, i, array) => (
            <TableRow>
              {columns.map((column, j) => (
                <TableCell key={j} align={column.align}>
                  {column.valuefn(row, i, array)}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default DataTable;
