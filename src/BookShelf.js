import React from 'react';
import PropTypes from 'prop-types';

const BookShelf = (props) => {
    
    const getText = (currShelf, val, text) => val === currShelf ? `\u2714 ${text}` : `\u2002\u2002 ${text}`;     
    const handleChange = (e) => props.shelfUpdated(e.target.value, props.book)
    return ( 
        <select value={ props.book.shelf || 'none'}
                onChange={ handleChange }>
            <option value="move" disabled>Move to...</option>
            <option value="currentlyReading">{getText(props.book.shelf, 'currentlyReading', 'Currently Reading')}</option>
            <option value="wantToRead">{getText(props.book.shelf, 'wantToRead', 'Want To Read')}</option>
            <option value="read">{getText(props.book.shelf, 'read', 'Read')}</option>
            <option value="none">{getText(props.book.shelf, 'none', 'None')}</option>
        </select>
    );
}

BookShelf.prototypes = {
    book: PropTypes.object.isRequired,
    shelfUpdated: PropTypes.func.isRequired
}
export default BookShelf;