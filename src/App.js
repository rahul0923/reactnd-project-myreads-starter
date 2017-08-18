import React from 'react'
import { Route } from 'react-router';
import * as BooksAPI from './BooksAPI'
import './App.css'

import Books from './Books';
import BookSearch from './BookSearch';
import SearchBar from './SearchBar';

class BooksApp extends React.Component {
  state = {
    currentlyReading: [],
    wantToRead: [],
    read: []
  }
  componentDidMount() {
    BooksAPI.getAll().then(books => {
      let currentlyReading = [],
        wantToRead = [],
        read = [];
      for (const book of books) {
        if (book.shelf === 'currentlyReading') {
          currentlyReading.push(book);
        } else if (book.shelf === 'wantToRead') {
          wantToRead.push(book);
        } else {
          read.push(book);
        }
      }
      this.setState({ currentlyReading, wantToRead, read });
    })
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
                  <Books booksInShelve={this.state.currentlyReading} />
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Want to Read</h2>
                  <Books booksInShelve={this.state.wantToRead} />
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Read</h2>
                  <Books booksInShelve={this.state.read} />
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
