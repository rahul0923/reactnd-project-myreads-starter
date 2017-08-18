import React, { Component } from 'react';
import BookSelection from './BookSelection';
import PropTypes from 'prop-types';

class Books extends Component {
    static propTypes = {
        booksInShelve: PropTypes.array.isRequired
    }
    render() {
        const { booksInShelve } = this.props;
        return (
            <div className="bookshelf-books">
                <ol className="books-grid">
                    {
                        booksInShelve.map(book => (
                            <li key={book.id}>
                                <div className="book">
                                    <div className="book-top">
                                        <div className="book-cover"
                                            style={{
                                                width: 128, height: 193,
                                                backgroundImage: 'url(' + book.imageLinks.thumbnail + ')'
                                            }}>
                                        </div>
                                        <BookSelection />
                                    </div>
                                    <div className="book-title">{book.title}</div>
                                    <div className="book-authors">{book.authors[0]}</div>
                                </div>
                            </li>
                        ))
                    }
                </ol>
            </div>
        )
    }
}

export default Books;