import React                                              from 'react';
import BookItem                                           from './BookItem.jsx'
import _                                                  from 'underscore'
import { Table, Panel, InputGroup, FormControl }          from 'react-bootstrap';
import { deleteRequest, postRequest, putRequest }         from './api-calls';
import BookModal                                          from './BookModal.jsx';

export default class BookList extends React.Component {
  constructor(props) {
    super(props);
    this.state = props;
  }

  componentWillReceiveProps(nextProps) {
    this.state = nextProps;
  }

  componentWillMount() {
    this.setState({filterByName: ""});
  }

  deleteCallback(id) {
    let deleteUrl = "http://NsdBooksTrainingApi.azurewebsites.net/Api/Books/" + id; 
    deleteRequest(deleteUrl, {}, (err, res) => {
      if(err) {
        console.log(err);
      } else {
        let newBookList = _.reject(this.state.bookList, (book) => {
            if(book.id === res.body.id) return true;
        })
       this.setState({bookList: newBookList});
      }
    })
  }

  editBook(id, name, author, description, event) {
    let putUrl = "http://NsdBooksTrainingApi.azurewebsites.net/Api/Books";
    putRequest(putUrl, {"id": id, "name": name, "author": author, "description": description}, (err, res) => {
      if(err) {
        console.log(err);
      } else {
        let index = _.map(this.state.bookList, (book) => {
          return book.id;
        }).indexOf(id);

        let newBookList = this.state.bookList;
        let book = this.state.bookList[index];
        book.name = name;
        book.author = author;
        book.description = description;
        newBookList[index] = book;
        this.setState({bookList: newBookList});
      }});
    this.onHideBookModal();
  }

  saveNewBook(name, author, description, event) {
    let postUrl = "http://NsdBooksTrainingApi.azurewebsites.net/Api/Books"
    postRequest(postUrl, {'name': name, 'author': author, 'description': description}, (err, res) => {
      if(err) {
        console.log("Something went wrong: Could not post new book.");
      } else {
        let newBookList = this.state.bookList;
        newBookList.push(res.body);
        this.setState(newBookList);
      }
    });
    this.onHideBookModal();
  }

  onShowBookModal(id) {
    if(id) { 
      this.setState({showBookModal: {shown: true, bookId: id}}); 
    }
    else {
      this.setState({showBookModal: {shown: true}})
    }
  }
 
  onHideBookModal() {
    this.setState({showBookModal: false});
  }

  filterOnChanged(event) {
    this.setState({filterByName: event.target.value})
  }

  render() {
    let filteredBookList = _.filter(this.state.bookList, (book) => {
      if(!this.state.filterByName) {
        return true;
      }
      else {
        if(book.name.includes(this.state.filterByName)) {
          return true;
        }
      }
      return false;
    }) 
    return(
      <div>
        {
            this.state.showBookModal.shown ? 
              <BookModal  bookId={this.state.showBookModal.bookId} 
                          onModalClose={this.onHideBookModal.bind(this)}
                          onNewBook={this.saveNewBook.bind(this)}
                          onEditBook={this.editBook.bind(this)} /> : 
            <div></div>
        }
        <Panel header="Book listing">
          <InputGroup>
            <InputGroup.Addon>Filter by book name</InputGroup.Addon>
              <FormControl type="text" onChange={this.filterOnChanged.bind(this)} />
          </InputGroup>
          <Table striped bordered hover>
            <thead>
            <tr>
              <th>id</th>
              <th>Name</th>
              <th>Author</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
            </thead>
            <tbody>
            {_.map(filteredBookList, (book) => {
                  return <BookItem key={book.id} 
                                    id={book.id} 
                                    name={book.name} 
                                    author={book.author} 
                                    description={book.description}
                                    onDelete={this.deleteCallback.bind(this)} 
                                    onShowBookModal={ (id) => { this.onShowBookModal(id) } } /> })} 
            </tbody>
           </Table>
          <button className="btn btn-lg btn-primary" onClick={(e) => { this.onShowBookModal() } }>Add new book</button>
        </Panel>
      </div>
    )
  }
}
