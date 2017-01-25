import React                        from 'react';
import { FormControl, InputGroup }  from 'react-bootstrap';

export default class BookFilter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {filter: ""};
  }

  filterOnChanged(event) {
    this.setState({filter: event.target.value});
    this.props.filterChanged(this.state.filter);
  }

  render() {
    return(
      <InputGroup>
        <InputGroup.Addon>Filter by book name</InputGroup.Addon>
        <FormControl type="text" onChange={this.filterOnChanged.bind(this)} />
      </InputGroup>
    )
  }
}