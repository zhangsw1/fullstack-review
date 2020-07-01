import React from 'react';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      term: ''
    }
    this.onChange = this.onChange.bind(this);
    // this.search = this.search.bind(this);
  }

  onChange (e) {
    this.setState({
      term: e.target.value
    });
  }

  search() {
    this.props.onSearch(this.state.term);
  }

  render() {
    return (<div>

      <div id="search">
        enter a github username: <input value={this.state.terms} onChange={this.onChange}/>
        <button onClick={() => this.search()}> Add Repos </button>
      </div>
    </div>)
  }
}

export default Search;