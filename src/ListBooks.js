import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Books from './Books';

const ListBooks = (props) => {
    
    const { shelfChanged , bookList } = props;
    return (
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
                    shelfUpdated={ shelfChanged }
                    books={bookList('currentlyReading')} />
                </div>
            </div>
            <div className="bookshelf">
                <h2 className="bookshelf-title">Want to Read</h2>
                <div className="bookshelf-books">
                <Books
                    shelfUpdated={ shelfChanged }
                    books={ bookList('wantToRead') } />
                </div>
            </div>
            <div className="bookshelf">
                <h2 className="bookshelf-title">Read</h2>
                <div className="bookshelf-books">
                <Books 
                    shelfUpdated={ shelfChanged }
                    books={ bookList('read') } />
                </div>
            </div>
            </div>
        </div>
        <div className="open-search">
            <Link to="/search">Add a book</Link>
        </div>
        </div>
    )

};

ListBooks.prototypes = {
    shelfChanged: PropTypes.func.isRequired,
    bookList: PropTypes.func.isRequired
}

export default ListBooks;