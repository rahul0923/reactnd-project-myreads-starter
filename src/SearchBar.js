import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import Books from './Books';

class SearchBar extends Component {
    static propTypes = {        
      filteredBooks: PropTypes.array.isRequired,
      bookSearch: PropTypes.func.isRequired,
      updateShelveFromSearch: PropTypes.func.isRequired
    }
    
    componentDidMount() {
        this.props.bookSearch();
    }

    render() {
      const { filteredBooks, bookSearch, updateShelveFromSearch } = this.props;
      return(
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
                       onChange={ (e) => bookSearch(e.target.value)}
                       type="text"
                       placeholder="Search by title or author"/>
                
                </div>
            </div>
            <div className="search-books-results">
                <Books
                    shelfUpdated={updateShelveFromSearch.bind(this)}
                    books={filteredBooks} />
            </div>
        </div>
    )}
}
export default SearchBar;