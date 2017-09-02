import React, { Component } from 'react';
import PropTypes from 'prop-types';

import BookShelf from './BookShelf';

class Books extends Component {
    static propTypes = {
      books: PropTypes.array.isRequired,
      shelfUpdated: PropTypes.func.isRequired
    }
    getText(currShelf, val, text) {
        return val === currShelf ? `\u2714 ${text}` : `\u2002\u2002 ${text}`;     
    }
    getAuthor(book) {
      let author = ''
      if (book.hasOwnProperty('authors')) {
          author = book.authors[0];
      }
      return author;
    }

    render() {
        const {books, shelfUpdated } = this.props;
        return (
            <ol className="books-grid"> {
                books.map(book => (
                  <li key={ book.id }>
                    <div className="book">
                        <div className="book-top">
                            <div className="book-cover"
                                style={{
                                    width: 128, height: 193,
                                    backgroundImage: 'url(' + book.imageLinks.thumbnail + ')'
                                }}>
                            </div>
                            <div className="book-shelf-changer">
                              <BookShelf shelfUpdated={ shelfUpdated } book={ book } />
                            </div>
                        </div>
                        <div className="book-title">{ book.title }</div>
                        <div className="book-authors">{ this.getAuthor(book) }</div>
                    </div>                    
                  </li>
                ))
            }
            </ol>            
        )
    }
}

export default Books;