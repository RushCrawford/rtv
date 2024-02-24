function Issue(props) {
    const { title, description, datePosted, _id, username, upVoteIssue, downVoteIssue } = props // receiving props from IssueList

    const handleUpVote = ()=> {
        upVoteIssue(_id)
    }
    const handleDownVote = ()=> {
        downVoteIssue(_id)
    }

    return (
        // <div className="card is-spaced">

        //     <header className="card-header">
        //         <p className="card-header-title">{title}</p>
        //     </header>

        //     <div className="card-content">
        //         <div className="content">
        //             {description}
        //             <br />
        //             <a href="#">@{username} - </a>
        //             <time datetime="2016-1-1">{datePosted}</time>
        //         </div>
        //     </div>

        //     <footer className="card-footer">
        //         <a href="#" className="card-footer-item">Up Votes </a>
        //         <a href="#" className="card-footer-item">Edit</a>
        //         <a href="#" className="card-footer-item">Delete</a>
        //     </footer>
        // </div>
        <article className="media">
            <div className="media-content">
                <div className="content">
                    <p>
                        <strong>@{username}</strong> · <small>{datePosted}</small>
                        <br />
                        <strong>{title}</strong>
                        <br />
                        {description}
                        <br />
                        <small><a onClick={handleUpVote}>Upvote</a> · <a onClick={handleDownVote}>Downvote</a></small>
                    </p>
                </div>
            </div>
        </article>
    )
}

export default Issue