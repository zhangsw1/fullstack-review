import React from 'react';
import RepoListEntry from './RepoListEntry.jsx';

const RepoList = (props) => {
  console.log("props---",props)
  const repoList = props.repos.map((repo, index) => (
    <RepoListEntry repo = {repo} key = {repo.repourl}/>
  ));

  return (
    <div>
      <h4> Repo List Component </h4>
      Here are the top {props.repos.length} repos.
      <ul>{repoList}</ul>
    </div>
  )
};

export default RepoList;


// const RepoList = (props) => {
//   return(
//     <div>

//       There are {props.repos.length} repos.
//       <table>
//         <tr>
//             <th>User Name</th>
//             <th>Repo Name</th>
//             <th>Forks Count</th>
//         </tr>
//       </table>
//       {props.repos.map(repo=>(
//         <RepoListEntry repo = {repo} key = {repo.repourl}/>
//       ))}
//     </div>
//   )
//   }