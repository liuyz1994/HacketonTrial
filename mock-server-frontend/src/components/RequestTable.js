import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import { DataGrid } from '@material-ui/data-grid';
import axios from 'axios';
import React from 'react';

const columns = [
    { field: 'datetime', headerName: 'Timestamp', width: 200 },
    { field: 'method', headerName: 'Method', width: 130 },
    { field: 'url', headerName: 'URL', width: 300 },
    { field: 'reqBody', headerName: 'Request Body', width: 200 },
    { field: 'resBody', headerName: 'Response Body', width: 200 },
    { field: 'source', headerName: 'Source', width: 200 }
];

export default function LogTable() {

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
                let data = res.data.map((element, index) => {
                    element.id = index;
                    if (element.datetime) {
                        var date = new Date(element.datetime)
                        element.datetime = date.toISOString();
                    }
                    element.reqBody = JSON.stringify(element.reqBody);
                    element.resBody = JSON.stringify(element.resBody);
                    return element;
                })
                setState({ logs: data });
            });
    }

    return (
        <Container>
            <Button size="large" variant="contained" onClick={() => getLogs()} color="primary">View Requests</Button>
            {/* <DataGridDemo logs={state.logs}/> */}
            <div style={{ height: '80vh', width: '100%' }}>
                <DataGrid rows={state.logs} columns={columns} pageSize={30} />
            </div>
        </Container>
    );
}