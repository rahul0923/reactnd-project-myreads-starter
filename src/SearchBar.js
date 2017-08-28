import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import BookSelection from './BookSelection';

class SearchBar extends Component {
    shelfChanged(event, book ) {
        if (event.target.value !== book.shelf) {
            this.props.bookClicked(event.target.value, book);
        }
    }
   componentDidMount() {
     this.props.resetSearch();
   }
    getBookShelve(book) {
      for(const knownBook of this.props.knownBooks) {
        if (knownBook.id === book.id) {
        return knownBook.shelf;
        }
      }
      return 'none'
    }
    render() {
        const { books } = this.props;
        return (
          <div className="search-books">
            <div className="search-books-bar">
              <Link to="/" className="close-search">Close</Link>
              <div className="search-books-input-wrapper">
                {/* 
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md
                  
                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                <input 
                       onChange={ (event) => this.props.updateQuery(event.target.value)}
                       type="text"
                       placeholder="Search by title or author"/>                
              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid">
                    {
                        books
                        .filter(book => book.authors)
                        .map(book => (
                            <li key={book.id}>
                                <div className="book">
                                    <div className="book-top">
                                        <div className="book-cover"
                                            style={{
                                                width: 128, height: 193,
                                                backgroundImage: 'url(' + book.imageLinks.thumbnail + ')'
                                            }}>
                                        </div>
                                        <BookSelection 
                                          shelf={ this.getBookShelve(book) }
                                          shelfClicked={ (ev) => this.shelfChanged(ev, book.id) } />
                                    </div>
                                    <div className="book-title">{ book.title }</div>
                                    <div className="book-authors">{ book.authors[0] }</div>
                                </div>
                            </li>
                        ))
                    }
              </ol>
            </div>
          </div>
    )}
}

export default SearchBar;