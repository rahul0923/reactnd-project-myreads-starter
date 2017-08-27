import React, { Component } from 'react';

class BookSelection extends Component {

    getText(val, text) {
        return val === this.props.shelf ? `\u2714 ${text}` : `\u2002\u2002 ${text}`;
        
    }
    render() {
        return (
            <div className="book-shelf-changer">
                <select onChange={ this.props.shelfClicked }
                        value={ this.props.shelf }>
                    <option value="none" disabled>
                      { this.getText('move', 'Move to...') }
                    </option>
                    <option value="currentlyReading">
                      { this.getText('currentlyReading', 'Currently Reading') }
                    </option>
                    <option value="wantToRead">
                      { this.getText('wantToRead', 'Want to Read') }
                    </option>
                    <option value="read">
                      { this.getText('read', 'Read') }
                    </option>
                    <option value="none">
                      { this.getText('none', 'None') }
                    </option>
                </select>
            </div>
        )
    }
}

export default BookSelection;