import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      repos: []
    }
    // this.fetchRepos = this.fetchRepos.bind(this)

  }

  componentDidMount(){
    this.fetchRepos();
  }

  fetchRepos (){
    $.ajax({
      type: 'GET',
      url: 'http://localhost:1128/repos',
      success: (data) => {
        console.log("this is data",data)
        this.setState({

          repos: data
        })
      },
    })
  }

  search(username) {
    $.ajax({
      type: "POST",
      url: "/repos",
      data: JSON.stringify({ username }),
      contentType: "application/json; charset=utf-8",
      success: () => {
        // this.setIt(results);
        // this.fetchRepos();
      },
      error: (err) => {
        $.ajax({
          url: 'repos',
          type: 'GET',
          success: (result) => {
            this.setIt(result);
          }
        })
      }
    });
  }


  render () {
    return (<div>
      <h1>Github Fetcher</h1>
      <Search onSearch={this.search.bind(this)}/>
      <RepoList repos={this.state.repos}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));