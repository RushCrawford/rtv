import Issue from "./Issue";
import { useContext, useState } from "react";
import { UserContext } from "../context/UserProvider";

function IssueList(props) {
  const { issues, username } = props;
//   const [ issueCard, setIssueCard ] = useState([])

  // Context-based approach to access upVoteIssue:
  const { upVoteIssue } = useContext(UserContext);
  
  const issueCard = issues?.map((issue) => (
    <Issue
      key={issue._id}
      {...issue}
      username={username}
      upVoteIssue={upVoteIssue} // Pass upVoteIssue from context
    />
  ));

  return (
    <div>
      {issueCard}
    </div>
  );
}

export default IssueList;


// import Issue from "./Issue"

// function IssueList(props) {
//     const { issues, username,upVoteIssue } = props
    
//     const issueCard = issues.map(issue => 
//         <Issue 
//             key={issue._id} 
//             {...issue} 
//             username={username} 
//             upVoteIssue={upVoteIssue} 
//         />)

//     return (
//         <div>
//             {issueCard}
//         </div>
//     )
// }

// export default IssueList