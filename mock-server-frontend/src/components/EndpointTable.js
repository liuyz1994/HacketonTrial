import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import React from 'react';

//import TableHead from '@material-ui/core/TableHead';

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});



export default function EndpointTable() {
    const classes = useStyles();

    const baseUrl = "http://localhost:3000"

    const [state, setState] = React.useState({ rows: [] });

    React.useEffect(() => {
        console.log("mounted!")
        getAll();
    }, []);

    const getAll = () => {
        axios.get(baseUrl + '/mocks')
            .then(res => {
                let data = res.data;
                console.log(data);
                data.foreach(x => { x["isSaved"] = true });
                setState({ rows: data })
            })
    }

    const postElement = element => {
        axios.post(
            baseUrl + '/mocks',
            // element,
            { method: element.method, url: element.url, value: element.value },
            { headers: { 'Content-Type': 'application/json' } }
        ).then(res => {
            console.log(res.data);
        });
    };

    const removeRow = element => {
        axios.delete(
            baseUrl + '/mocks',
            // element,
            { method: element.method, url: element.url, value: element.value },
            { headers: { 'Content-Type': 'application/json' } }
        ).then(res => {
            console.log(res.data);
        });
    };

    const addRow = () => {
        setState({ rows: [...state.rows, { method: "GET", url: "/api/v1/test", value: "{json: \"body\"}", isSaved: false }] });
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
                                    <TextField id="endpoint" label="EndPoint" variant="outlined" defaultValue={row.url} />
                                </TableCell>
                                <TableCell align="right">
                                    <TextField id="body" label="Response Body" variant="outlined" defaultValue={row.value} multiline rows={4} />
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