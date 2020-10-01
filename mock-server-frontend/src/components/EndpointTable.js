import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
//import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import React from 'react';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import axios from 'axios';


const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});



export default function EndpointTable(props) {
    const classes = useStyles();


    const [state, setState] = React.useState({ rows: props.rows });

    const postElement = element => {
        axios.post(
            'htpps:{server_url}/mocks',
            element,
            { headers: { 'Content-Type': 'application/json' } }
        ).then(res => {
            console.log(res.data);
        });


    };

    const removeRow = element => {
        axios.delete(
            'htpps:{server_url}/mocks',
            element,
            { headers: { 'Content-Type': 'application/json' } }
        ).then(res => {
            console.log(res.data);
        });
    };

    // const getSomething = element =>{
    //     axios.get(
    //        'https://jsonplaceholder.typicode.com/users',
    //        { headers: { 'Content-Type': 'application/json' } }
    //     ).then(res => {
    //         console.log(res.data);
    //     });
    // }

    const addRow = () => {
        setState({ rows: [...state.rows, { method: "GET", endpoint: "/api/v1/test", body: "{json: \"body\"}" , isSaved :false}] });
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
                                    <TextField id="endpoint" label="EndPoint" variant="outlined" value={row.endpoint} />
                                </TableCell>
                                <TableCell align="right">
                                    <TextField id="body" label="Response Body" variant="outlined" value={row.body} multiline rows={4} />
                                </TableCell>
                                <TableCell align="right">
                                    {(row.isSaved) ? (
                                        <Button variant="contained" color="secondary" onClick={() => removeRow(row)}>Remove</Button>) :
                                        (<Button variant="contained" color="primary" onClick={() => postElement(row)}>Add</Button>)
                                    }
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