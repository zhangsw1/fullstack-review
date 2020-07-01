import React from 'react';

const RepoListEntry = (props) => {
  return (
  <div className = 'props-description'>
  <table>
    <tr>
    <td><div className ='prop-username'>
    {props.repo.username}
    </div></td>
    <td><div className = 'prop-reponame'>
    <a href={props.repo.repourl}>{props.repo.reponame}</a>
    </div></td>
    <td><div className = 'prop-forkcount'>
    {props.repo.forkcount}
    </div></td>
  </tr>
  </table>

  </div>
  )
}

export default RepoListEntry;

