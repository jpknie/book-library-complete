import React from 'react';

export default class BootItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = props;
  }
  
  componentWillReceiveProps(nextProps) {
    this.props = nextProps;
  }

  render() {
    return(
    <tr>
      <td>{this.props.id}</td>
      <td>{this.props.name}</td>
      <td>{this.props.author}</td>
      <td>{this.props.description}</td>
      <td><span
            className="glyphicon glyphicon-remove"
            onClick={() => this.props.onDelete(this.props.id)}>&nbsp;
          </span>
          <span
            className="glyphicon glyphicon-edit"
            onClick={() => this.props.onShowBookModal(this.props.id)}>&nbsp;
          </span>
      </td>
    </tr>)
  }
}