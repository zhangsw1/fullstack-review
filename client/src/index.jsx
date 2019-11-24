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

  }

  componentDidMount(){
    $.ajax({
      type: 'GET',
      url: '/repos',

      success:(data)=>{
        console.log("lets fetch data", data)
        this.setState({
          repos:data,
        })
      },
      error:(err) =>{
        console.log(err)
        console.log("there is error in get ajax")
      }
    })
  }
  search (username) {
    // console.log(`${term} was searched`);
    // console.log("this is from index.jsx")
    // TODO
    $.ajax({
      type: "POST",
      url: '/repos',
      // no need to use jsonstringify, otherwise it will have {{}}
      data:  { username },
      success: () =>{
        console.log("good, successful");
      },
      error: () =>  {
        console.log("not good");
      }
    })
  }


  render () {
    return (<div>
      <h1>Github Fetcher</h1>
      <RepoList repos={this.state.repos}/>
      <Search onSearch={this.search.bind(this)}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));