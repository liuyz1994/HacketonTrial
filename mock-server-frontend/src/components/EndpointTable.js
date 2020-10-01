import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import React from 'react';


const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});


export default function EndpointTable(props) {
    const classes = useStyles();


    const [state, setState] = React.useState({ rows: props.rows });

    const postElement = element => {
        console.log(element);
    };

    const removeRow = element => {
        console.log(element);
    };

    const addRow = () => {
        setState({ rows: [...state.rows, { method: "", endpoint: "", body: "" }] });
    }


    return (
        <Container>
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Method</TableCell>
                            <TableCell align="right">Endpoint</TableCell>
                            <TableCell align="right">Response Body</TableCell>
                            <TableCell align="right"></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {state.rows.map((row, index) => (
                            <TableRow key={index}>
                                <TableCell component="th" scope="row">
                                    {row.method}
                                </TableCell>
                                <TableCell align="right">{row.endpoint}</TableCell>
                                <TableCell align="right">{row.body}</TableCell>
                                <TableCell align="right">
                                    <Button variant="contained" color="primary" value={row} onClick={() => postElement(row)}>Add</Button>
                                    <Button variant="contained" color="secondary" onClick={() => removeRow(row)}>Remove</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Button size="large" variant="contained" onClick={() => addRow()} color="primary">Add</Button>
        </Container>
    );
}