import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
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

    // const baseUrl = "http://localhost:3000"
    const baseUrl = "https://mock-back.herokuapp.com"

    const [state, setState] = React.useState({ logs: [] });

    React.useEffect(() => {
        console.log("mounted!")
        getLogs();
    }, []);


    const getLogs = () => {
        axios.get(baseUrl + "/logs")
            .then(res => {
                console.log(res.data);
            });
    }

    return (
        <Container>
            <Button size="large" variant="contained" onClick={() => getLogs()} color="primary">Call Logs</Button>
        </Container>
    );
}