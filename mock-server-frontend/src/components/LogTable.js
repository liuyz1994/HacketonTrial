import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import { DataGrid } from '@material-ui/data-grid';
import axios from 'axios';
import React from 'react';

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});

const columns = [
    { field: 'timestamp', headerName: 'Timestamp' },
    { field: 'method', headerName: 'Method', width: 130 },
    { field: 'url', headerName: 'URL', width: 300 },
    { field: 'reqBody', headerName: 'Request Body', width: 200 },
    { field: 'resBody', headerName: 'Response Body', width: 200 },
    { field: 'source', headerName: 'Source', width: 200 },
    // {
    //   field: 'fullName',
    //   headerName: 'Full name',
    //   description: 'This column has a value getter and is not sortable.',
    //   sortable: false,
    //   width: 160,
    //   valueGetter: (params) =>
    //     `${params.getValue('firstName') || ''} ${
    //       params.getValue('lastName') || ''
    //     }`,
    // },
];

export function DataGridDemo(props) {
    return (
        <div style={{ height: 400, width: '100%' }}>
            <DataGrid rows={props.logs} columns={columns} pageSize={5} />
        </div>
    );
}

export default function LogTable() {
    const classes = useStyles();

    // const baseUrl = "http://localhost:3000"
    const baseUrl = "https://mock-back.herokuapp.com"

    const [state, setState] = React.useState({ logs: [] });

    React.useEffect(() => {
        console.log("mounted!")
        // getLogs();
    }, []);


    const getLogs = () => {
        axios.get(baseUrl + "/logs")
            .then(res => {
                // {timestamp method, url, reqBody, resBody, source}
                console.log(res.data);
                let data = res.data.map((element, index) => {
                    element.id = index;
                    element.timestamp = index;
                    element.reqBody = JSON.stringify(element.reqBody);
                    element.resBody = JSON.stringify(element.resBody);
                    return element;
                })
                setState({ logs: data });
            });
    }

    return (
        <Container>
            <Button size="large" variant="contained" onClick={() => getLogs()} color="primary">Update Logs</Button>
            {/* <DataGridDemo logs={state.logs}/> */}
            <div style={{ height: '80vh', width: '100%' }}>
                <DataGrid rows={state.logs} columns={columns} pageSize={30} checkboxSelection />
            </div>
        </Container>
    );
}