import React, { useState, useEffect, useCallback } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TablePagination from '@material-ui/core/TablePagination';
import Typography from '@material-ui/core/Typography';
import Paper from "@material-ui/core/Paper";
import SearchBar from "material-ui-search-bar";
import { getCompanies } from "../../api/search";

interface Company {
    id: number;
    company_name: string;
    currency_code: string;
    currency: string;
    department: string;
    sales_total: string;
    city: string
}

const useStyles = makeStyles({
    table: {
        minWidth: 650,
        marginTop: "10px"
    },
    tableHeader: {
        backgroundColor: 'steelblue',
        '& th': {
            color: 'white'
        }
    },
    paperContainer: {
        marginTop: "10px",
        width: "80%",
        '& .MuiPaper-rounded': {
            borderRadius: "0px"
        }
    },
    notFound: {
        marginTop: '0.35em'
    }
});

export const TableWithSearch = () => {
    const [rows, setRows] = useState<Company[] | undefined>([]);
    const [searched, setSearched] = useState<string>("");
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const classes = useStyles();

    useEffect(() => {
        const companies = getCompanies('');
        setRows(companies);
    }, [])

    const requestSearch = (searchedVal: string) => {
        const companies = getCompanies(searchedVal);
        setRows(companies);
    };

    const cancelSearch = () => {
        setSearched("");
        requestSearch(searched);
    };

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
        <>
            <Paper className={classes.paperContainer}>
                <SearchBar
                    value={searched}
                    onChange={(searchVal) => requestSearch(searchVal)}
                    onCancelSearch={() => cancelSearch()}
                    placeholder="Search companies"
                />
                {rows && rows.length < 1 ? <Typography variant="h6" className={classes.notFound} gutterBottom>No results found!</Typography>
                    : <>
                        <TableContainer>
                            <Table className={classes.table} size="small" aria-label="company table">
                                <TableHead>
                                    <TableRow className={classes.tableHeader}>
                                        <TableCell>Comapny Name</TableCell>
                                        <TableCell align="center">Currency Code</TableCell>
                                        <TableCell align="center">Currency</TableCell>
                                        <TableCell align="center">Department</TableCell>
                                        <TableCell align="center">Sales</TableCell>
                                        <TableCell align="center">City</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>

                                    {rows && rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                                        <TableRow hover key={row.id}>
                                            <TableCell component="th" scope="row">
                                                {row.company_name}
                                            </TableCell>
                                            <TableCell align="center">{row.currency_code}</TableCell>
                                            <TableCell align="center">{row.currency}</TableCell>
                                            <TableCell align="center">{row.department}</TableCell>
                                            <TableCell align="center">{row.sales_total}</TableCell>
                                            <TableCell align="center">{row.city}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <TablePagination
                            rowsPerPageOptions={[10, 25, 100]}
                            component="div"
                            count={(rows && rows.length) || 0}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onChangePage={handleChangePage}
                            onChangeRowsPerPage={handleChangeRowsPerPage}
                        />
                    </>
                }
            </Paper>
            <br />
        </>
    );
}
