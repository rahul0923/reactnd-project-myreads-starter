import React from 'react'
import { Route } from 'react-router';
import * as BooksAPI from './BooksAPI'
import './App.css'

import Books from './Books';
import BookSearch from './BookSearch';
import SearchBar from './SearchBar';

class BooksApp extends React.Component {
  state = {
    allBooks: [],
    filteredBooks: [],
    shelvedBooks: []
  }
  componentDidMount() {
    BooksAPI.getAll().then(allBooks => {
      const shelvedBooks = allBooks.reduce((ac, val) => {
        const v = {'id': val.id, 'shelf': val.shelf};
        return ac.concat(v)
      }, []);
      
      this.setState({ shelvedBooks })
      this.setState({ allBooks })
    });
  }
  bookClicked(moveToShelve, bookID) {
    let bookToUpdate;
    const cur = this.state.allBooks.slice();
    for(const i of cur) {
      if (i.id === bookID) {
        bookToUpdate = i;
        i.shelf = moveToShelve;
        break;
      }
    }
    this.setState({allBooks: cur});
    BooksAPI.update(bookToUpdate, moveToShelve);    
  }
  updateSearchView(moveToShelve, bookID) {
    let bookToUpdate;
    const cur = this.state.filteredBooks.slice();
    for(const i of cur) {
      if (i.id === bookID) {
        bookToUpdate = i;
        i.shelf = moveToShelve;
        break;
      }
    }
    this.setState({filteredBooks: cur.filter((book) => book.id !== bookToUpdate.id) });
    this.setState( state => ({
      allBooks: this.state.allBooks.concat([bookToUpdate])
    }));
    BooksAPI.update(bookToUpdate, moveToShelve);    
  }
  updateQuery(query) {
    BooksAPI.search(query, 20)
        .then((filteredBooks) => {
          return  this.setState({filteredBooks})
        })
  }
  clearSearch() {
    this.setState({filteredBooks: []});
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
        <Route exact path="/search" render={() => (
          <SearchBar
            knownBooks={ this.state.shelvedBooks}
            resetSearch={ this.clearSearch.bind(this) }
            bookClicked={ this.updateSearchView.bind(this) }
            updateQuery={this.updateQuery.bind(this)} books={this.state.filteredBooks}/>
        )} />
      </div>
    )
  }
}

export default BooksApp;
