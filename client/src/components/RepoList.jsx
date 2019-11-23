import React from 'react';
import RepoListEntry from './RepoListEntry.jsx'
const RepoList = (props) => (
  <div>
    <h4> Repo List Component </h4>
    *******There are {props.repos.length} repos******.


    {props.repos.map(repo=>(
      <RepoListEntry repo = {repo} key = {repo.id} onChange = {props.onChange} />
    ))}
    ********************
  </div>
)



export default RepoList;