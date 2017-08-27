import React, { Component } from 'react';
import BookSelection from './BookSelection';
import PropTypes from 'prop-types';

class Books extends Component {
    static propTypes = {
        booksInShelve: PropTypes.array.isRequired
    }
    shelfChanged(event, book ) {
        if (event.target.value !== book.shelf) {
            this.props.bookClicked(event.target.value, book);
        }
    }
    render() {
        const { booksInShelve, filterBy } = this.props;
        return (
            <div className="bookshelf-books">
                <ol className="books-grid">
                    {
                        booksInShelve
                        .filter(book => book.shelf === filterBy)
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
                                          shelf={ book.shelf }
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
        )
    }
}

export default Books;