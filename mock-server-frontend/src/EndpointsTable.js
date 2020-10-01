import React from 'react';
import Button from '@material-ui/core/Button';

class EndPointsTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          value: 0,
        };
      }

    handleClick() {
        setState({value: value +1 })
    }

    render() {
        return (
            <div>
                table here
                {this.state.value}
                <Button variant="contained" onClick={this.handleClick}>Default</Button>
            </div>
        )
    }

}


export default EndPointsTable