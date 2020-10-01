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
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';


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

    const handleChange = (event, index) => {
        let items = [...state.rows];
        let item = { ...items[index] };
        item.method = event.target.value;
        items[index] = item;
        setState({ rows: items });
    };


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
                                {/*<form className={classes.root} noValidate autoComplete="off">*/}
                                <TableCell component="th" scope="row">
                                    <InputLabel id="demo-simple-select-outlined-label">Method</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-outlined-label"
                                        id="demo-simple-select-outlined"
                                        value={row.method}
                                        onChange={event => handleChange(event, index)}
                                        label="Method"
                                    >
                                        <MenuItem value={"GET"}>GET</MenuItem>
                                        <MenuItem value={"POST"}>POST</MenuItem>
                                        <MenuItem value={"PUT"}>PUT</MenuItem>
                                        <MenuItem value={"DELETE"}>DELETE</MenuItem>
                                    </Select>
                                    {/*<TextField id="method" label="Outlined" variant="outlined" value={row.method} />*/}
                                </TableCell>
                                <TableCell align="right">
                                    <TextField id="endpoint" label="Outlined" variant="outlined" value={row.endpoint} />
                                </TableCell>
                                <TableCell align="right">
                                    <TextField id="body" label="Outlined" variant="outlined" value={row.body} multiline rows={4} />
                                </TableCell>
                                <TableCell align="right">
                                    <Button variant="contained" color="primary" value={row} onClick={() => postElement(row)}>Add</Button>
                                    <Button variant="contained" color="secondary" onClick={() => removeRow(row)}>Remove</Button>
                                </TableCell>
                                {/*</form>*/}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Button size="large" variant="contained" onClick={() => addRow()} color="primary">Add</Button>
        </Container>
    );
}