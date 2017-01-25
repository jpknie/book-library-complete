import React                                                  from 'react';
import { Modal, Button, FormControl, FormGroup, InputGroup }  from 'react-bootstrap';
import { getRequest }                                         from './api-calls';

class NewBook extends React.Component {
  constructor(props) {
    super(props);
      this.state = props;
  }

    saveNewBook() {
      console.log(this.state);
    }

    handleChange(inputId, event) {
      var change = {};
      change[inputId] = event.target.value;
      this.setState(change);
    }

    render() {
      return(
        <div className="static-modal">
          <Modal.Dialog>
            <Modal.Header>
              <Modal.Title>Enter New Book</Modal.Title>
            </Modal.Header>

            <Modal.Body>
              <FormGroup>
                <InputGroup>
                  <FormControl type="text" placeholder="Enter book name here" onChange={this.handleChange.bind(this, 'name')} />
                </InputGroup>
                <InputGroup>
                  <FormControl type="text" placeholder="Enter author here" onChange={this.handleChange.bind(this, 'author')} />
                </InputGroup>
                <InputGroup>
                  <FormControl bsSize="lg" type="text" placeholder="Enter description here" onChange={this.handleChange.bind(this, 'description')} />
                </InputGroup>
              </FormGroup>
            </Modal.Body>
          
            <Modal.Footer>
              <Button onClick={this.props.onModalClose}>Close</Button>
              <Button bsStyle="primary" onClick={this.props.onNewBook.bind(this, this.state.name, this.state.author, this.state.description)}>Save changes</Button>
            </Modal.Footer>

          </Modal.Dialog>
        </div>)
    }
}

class EditBook extends React.Component {
  constructor(props) {
    super(props);
    this.state = props;
  }

  componentWillReceiveProps(nextProps) {
    this.props = nextProps;
    this.setState(nextProps);
  }

  handleChange(inputId, event) {
    var change = {};
    change[inputId] = event.target.value;
    this.setState(change);
  }

  render() {
    if(this.props.bookId) {
    return(
          <div className="static-modal">
            <Modal.Dialog>
              <Modal.Header>
                <Modal.Title>Edit Book</Modal.Title>
              </Modal.Header>

              <Modal.Body>
                <InputGroup>
                  <FormControl type="text" value={this.state.name} onChange={this.handleChange.bind(this, 'name')} />
                </InputGroup>
                <InputGroup>
                  <FormControl type="text" value={this.state.author} onChange={this.handleChange.bind(this, 'author')} />
                </InputGroup>
                <InputGroup>
                  <FormControl type="text" value={this.state.description} onChange={this.handleChange.bind(this, 'description')} />
                </InputGroup>
              </Modal.Body>

             <Modal.Footer>
              <Button onClick={this.props.onModalClose}>Close</Button>
              <Button bsStyle="primary" onClick={this.props.onEditBook.bind(this, this.state.bookId, this.state.name, this.state.author, this.state.description)}>Save changes</Button>
            </Modal.Footer>

            </Modal.Dialog>
          </div>)
      } else {
        return <div></div>
      }
    }
}

export default class BookModal extends React.Component {
   constructor(props) {
    super(props);
    this.state = props;
  }

  closeModal() {
    this.props.onModalClose();
  }

  componentWillMount() {
    if(this.props.bookId) {
        getRequest("http://NsdBooksTrainingApi.azurewebsites.net/Api/Books/" + this.props.bookId, (err, res) => { 
        this.setState(res.body);
      })
    } 
  }

  render() {
    /* If bookId is not defined we are adding new book */
    if(this.props.bookId === undefined) {
      return (<NewBook onNewBook={this.props.onNewBook} onModalClose={this.closeModal.bind(this)}/>);
    } else {
      return (<EditBook 
                bookId={this.state.id}
                name={this.state.name}
                author={this.state.author}
                description={this.state.description}
                onEditBook={this.props.onEditBook} 
                onModalClose={this.closeModal.bind(this)}/>);
    }
  }
}
