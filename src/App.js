import React from 'react'
import { Route } from 'react-router';
import { Link } from 'react-router-dom';

import * as BooksAPI from './BooksAPI';
import Books from './Books';
import SearchBar from './SearchBar';
import './App.css'

class BooksApp extends React.Component {
  constructor() {
    super();
    this.state = {
      myBooks: [],
      filteredBooks: []
    }
  }

  componentDidMount() {
    BooksAPI.getAll().then(myBooks => {
      this.setState({ myBooks })
    });
  }

  shelfChanged(moveToShelf, bookObj) {
    const books = this.state.myBooks.slice();
    let bookToUpdate;
    for(const book of books) {
      if (book.id === bookObj.id) {
        book.shelf = moveToShelf;
        bookToUpdate = book;
        break;
      }
    }
    this.setState({ myBooks: books });
    BooksAPI.update(bookToUpdate, moveToShelf);
  }
  
  updateShelveFromSearch(moveTo, bookObj) {
    let filBooks = this.state.filteredBooks.slice();

    for(const book of filBooks) {
      if (book.id === bookObj.id) {
        book.shelf = moveTo;
        break;
      }
    }
    this.setState({filteredBooks:filBooks});
    let updateBook = {};
    let found = false;
    for(const book of this.state.myBooks) {
      if (book.id === bookObj.id) {
        book.shelf = moveTo;
        updateBook.id = book.id;
        found = true;
        break;
      }
    }
    if (!found) {
      bookObj.shelf = moveTo;
      updateBook.id = bookObj.id;
      this.setState((prevState) => (
        { myBooks: [...prevState.myBooks, bookObj] }
      ));
    }
    BooksAPI.update(updateBook, moveTo);
  }

  bookList(shelf) {
    return (
      this.state.myBooks.filter(b => b.shelf === shelf)
    )
  }

  bookSearch(query) {
    if (!query || !String(query).trim()) {
        this.setState({ filteredBooks:[] });
        return;
    }
    BooksAPI.search(query)
      .then((filteredBooks) => {
        for (const myBook of this.state.myBooks) {
          for (const bookInSearch of filteredBooks) {
            if (bookInSearch.id === myBook.id) {
              bookInSearch.shelf = myBook.shelf;
              break;
            }
          }
        }
        this.setState({ filteredBooks });
    })    
  }

  render() {
    return (
      <div className="app">
        <Route exact path="/search" render={() => (
          <SearchBar
            filteredBooks={this.state.filteredBooks}
            bookSearch={this.bookSearch.bind(this)}
            updateShelveFromSearch={(moveTo, bookObj) => {
              this.updateShelveFromSearch(moveTo, bookObj);
            }}/>
        )} />
        <Route exact path="/" render={() => (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Currently Reading</h2>
                  <div className="bookshelf-books">
                    <Books
                      shelfUpdated={ this.shelfChanged.bind(this) }
                      books={this.bookList('currentlyReading')} />
                  </div>
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Want to Read</h2>
                  <div className="bookshelf-books">
                    <Books
                      shelfUpdated={ this.shelfChanged.bind(this) }
                      books={ this.bookList('wantToRead') } />
                  </div>
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Read</h2>
                  <div className="bookshelf-books">
                    <Books 
                      shelfUpdated={ this.shelfChanged.bind(this) }
                      books={ this.bookList('read') } />
                  </div>
                </div>
              </div>
            </div>
            <div className="open-search">
              <Link to="/search">Add a book</Link>
            </div>
          </div>
        )} />
      </div>
    )
  }
}

export default BooksApp
