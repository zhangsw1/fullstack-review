import React from 'react';

var RepoListEntry = (props) => {

  return(
    <div id = "repo-list-entry" >
      username: {props.repo.username}  repo name: {props.repo.repo_name} repo description: {props.repo.description} forks count: {props.repo.forkcount}
    </div>

  )
}

export default RepoListEntry;