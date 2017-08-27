import React from 'react'
import { Route } from 'react-router';
import * as BooksAPI from './BooksAPI'
import './App.css'

import Books from './Books';
import BookSearch from './BookSearch';
import SearchBar from './SearchBar';

class BooksApp extends React.Component {
  state = {
    allBooks: []
  }
  componentDidMount() {
    BooksAPI.getAll().then(allBooks => 
      this.setState({ allBooks })
    );
  }
  bookClicked(moveToShelve, bookID) {
    const cur = this.state.allBooks.slice();
    for(const i of cur) {
      if (i.id === bookID) {
        i.shelf = moveToShelve;
        break;
      }
    }
    this.setState({allBooks: cur});
    
  }
  render() {
    return (
      <div className="app">
        <Route exact path="/" render={() => (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Currently Reading</h2>
                  <Books 
                    bookClicked={ this.bookClicked.bind(this) }
                    filterBy='currentlyReading'
                    booksInShelve={ this.state.allBooks } />
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Want to Read</h2>
                  <Books
                     bookClicked={ this.bookClicked.bind(this) }
                     booksInShelve={ this.state.allBooks }
                     filterBy='wantToRead'/>
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Read</h2>
                  <Books 
                    bookClicked={ this.bookClicked.bind(this) }
                    filterBy='read'
                    booksInShelve={ this.state.allBooks } />
                </div>
              </div>
            </div>
            <BookSearch />
          </div>
        )} />
        <Route path="/search" component={SearchBar} />
      </div>
    )
  }
}

export default BooksApp;
