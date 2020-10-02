import { TextareaAutosize } from '@material-ui/core';
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
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import axios from 'axios';
import React from 'react';

//import TableHead from '@material-ui/core/TableHead';

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function EndpointTable() {
    const classes = useStyles();

    // const baseUrl = "http://localhost:3000"
    const baseUrl = "https://mock-back.herokuapp.com"

    const [state, setState] = React.useState({ rows: [] });
    const [open, setOpen] = React.useState(false);
    let [message, setMessage] = React.useState({});

    React.useEffect(() => {
        console.log("mounted!")
        getAll();
    }, []);

    const getAll = () => {
        axios.get(baseUrl + '/mocks')
            .then(res => {
                let data = res.data.map(x => {
                    x.isSaved = true
                    x.value = JSON.stringify(x.value)
                    return x;
                });
                setState({ rows: data })
            })
    }

    const postElement = (element, index) => {
        console.log(element)
        axios.post(
            baseUrl + '/mocks',
            // element,
            { method: element.method, url: element.url, value: element.value },
            { headers: { 'Content-Type': 'application/json' } }
        ).then(res => {
            console.log(res.data);
            if (res.status === 200) {
                let items = [...state.rows];
                let item = { ...items[index] };
                item.isSaved = true;
                items[index] = item;
                setState({ rows: items });
                message.sucess = true;
                message.info = "Your endpoint has been saved successfully!";
                setOpen(true);
                setMessage(message);

            } else {
                message.sucess = false;
                message.info = res.message;
                setOpen(true);
                setMessage(message);
            }
        });
    };

    const removeRow = (element, index) => {
        axios.post(
            baseUrl + '/mocks/delete',
            // element,
            { method: element.method, url: element.url, value: element.value },
            { headers: { 'Content-Type': 'application/json' } }
        ).then(res => {
            if (res.status === 200) {
                const filteredItems = state.rows.filter((e, i) => i != index)
                console.log(filteredItems);
                setState({ rows: filteredItems });
            }
        });
    };

    const addRow = () => {
        setState({ rows: [...state.rows, { method: "GET", url: "/api/v1/test", value: `{"json": "body"}`, isSaved: false }] });
    }

    const handleChange = (event, index) => {
        let items = [...state.rows];
        let item = { ...items[index] };
        item.method = event.target.value;
        items[index] = item;
        setState({ rows: items });
    }

    const handleChangeValue = (event, index) => {
        let items = [...state.rows];
        let item = { ...items[index] };
        item.value = event.target.value;
        items[index] = item;
        setState({ rows: items });
    }

    const handleChangeURL = (event, index) => {
        let items = [...state.rows];
        let item = { ...items[index] };
        item.url = event.target.value;
        items[index] = item;
        setState({ rows: items });
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    const style = {
        minWidth: '25vw'
    };

    return (
        <Container>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                {(message.sucess) ?
                    (<Alert onClose={handleClose} severity="success">
                        {message.info}
                    </Alert>) : (
                        <Alert onClose={handleClose} severity="error">
                            {message.info}
                        </Alert>
                    )
                }
            </Snackbar>
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
                                        disabled={row.isSaved}
                                    >
                                        <MenuItem value={"GET"}>GET</MenuItem>
                                        <MenuItem value={"POST"}>POST</MenuItem>
                                        <MenuItem value={"PUT"}>PUT</MenuItem>
                                        <MenuItem value={"DELETE"}>DELETE</MenuItem>
                                    </Select>
                                    {/*<TextField id="method" label="Outlined" variant="outlined" value={row.method} />*/}
                                </TableCell>
                                <TableCell align="right">
                                    <TextField id="endpoint" label="EndPoint" disabled={row.isSaved} onChange={event => handleChangeURL(event, index)} variant="outlined" value={row.url} />
                                </TableCell>
                                <TableCell align="right">
                                    <TextareaAutosize id="body" label="Response Body" style={style} onChange={event => handleChangeValue(event, index)} variant="outlined" value={row.value} multiline rowsMax={10} />
                                </TableCell>
                                <TableCell align="right">
                                    <Button variant="contained" color="primary" onClick={() => postElement(row, index)}>Save</Button>
                                    {(row.isSaved) ? (
                                        <Button variant="contained" color="secondary" onClick={() => removeRow(row, index)}>Remove</Button>) : null
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