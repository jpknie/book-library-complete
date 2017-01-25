import React, { Component }                             from 'react';
import logo                                             from './logo.svg';
import { getRequest }                                   from './api-calls';
import BookList                                         from './BookList.jsx';
import './Modal.css';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

class App extends Component {
  constructor() {
    super();
    this.state = {booklist:[]}
  }

  componentWillMount() {
    getRequest("http://NsdBooksTrainingApi.azurewebsites.net/Api/Books", (err, res) => { 
      this.setState({booklist: res.body});
    })
  }
  
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React Book Library</h2>
          <h4>©&nbsp; jpkniem@gmail.com, 2017</h4>
        </div>
        <BookList showBookModal={false} bookList={this.state.booklist} />
      </div>
    );
  }
}

export default App;
