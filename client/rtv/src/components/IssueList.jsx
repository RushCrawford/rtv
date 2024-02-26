import Issue from "./Issue";
import { useContext, useState } from "react";
import { UserContext } from "../context/UserProvider";

function IssueList(props) {
  const { issues, username, userId } = props;

  // Context-based approach to access upVoteIssue:
  const { upVoteIssue, downVoteIssue, postComment } = useContext(UserContext);
  
  const issueCard = issues?.map((issue) => (
    <Issue
      key={issue._id}
      {...issue}
      username={username}
      upVoteIssue={upVoteIssue} // Pass upVoteIssue from context
      downVoteIssue={downVoteIssue} // Pass downVoteIssue from context
      postComment={postComment} // passed from context
      userId={userId}
    />
  ));

  return (
    <div>
      {issueCard}
    </div>
  );
}

export default IssueList;
