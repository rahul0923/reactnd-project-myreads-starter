import React from 'react';

function BookShelf(props) {
    
    function getText(currShelf, val, text) {
        return val === currShelf ? `\u2714 ${text}` : `\u2002\u2002 ${text}`;     
    }
    return ( 
        <select value={ props.book.shelf }
                onChange={ (e) => props.shelfUpdated(e.target.value, props.book) }>
            <option value="move" disabled>Move to...</option>
            <option value="currentlyReading">{getText(props.book.shelf, 'currentlyReading', 'Currently Reading')}</option>
            <option value="wantToRead">{getText(props.book.shelf, 'wantToRead', 'Want To Read')}</option>
            <option value="read">{getText(props.book.shelf, 'read', 'Read')}</option>
            <option value="none">{getText(props.book.shelf, 'none', 'None')}</option>
        </select>
    );
}
export default BookShelf;