import Issue from "./Issue"

function IssueList(props) {
    const { issues, username } = props
    console.log(issues, username)
    const issueCard = issues.map(issue => <Issue key={issue._id} {...issue} username={username} />)
    return (
        <div>
            {issueCard}
        </div>
    )
}

export default IssueList