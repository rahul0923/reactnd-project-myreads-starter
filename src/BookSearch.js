import React, { Component } from 'react';

class BookSearch extends Component {
    render() {
        return (
            <div className="open-search">
              <a onClick={this.props.showSearch} >Add a book</a>
            </div>
        )
    }
}

export default BookSearch;