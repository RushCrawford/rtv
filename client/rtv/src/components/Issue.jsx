import { useContext, useState } from "react"
import { UserContext } from "../context/UserProvider";
import Comment from "./Comment";

function Issue(props) {
    const { title, description, datePosted, _id, username, upVoteIssue, downVoteIssue, likedUsers, dislikedUsers, postComment, userId } = props // receiving props from IssueList

    const [ toggle, setToggle ] = useState(false)
    const [commentText, setCommentText] = useState('');

    const { allComments } = useContext(UserContext)

    const toggleComment = ()=> { // toggles the comment box
        setToggle(prev => !prev)
    }

    const handleUpVote = () => { 
    upVoteIssue(_id) // called from userProvider
    }

    const handleDownVote = () => { 
    downVoteIssue(_id) // called from userProvider
    }

    const handleComment = (e) => {
        e.preventDefault(); // Prevent default form submission
        try {
            postComment(_id, { user: userId, text: commentText }); // Send comment data to server
            toggleComment(); // Close the comment box
            setCommentText(''); // Clear the comment input
        } catch (error) {
            console.error(error); // Handle any errors
        }
    };

    const likes = likedUsers.length
    const dislikes = dislikedUsers.length

    const filteredComments = allComments.filter(comment => comment.issue === _id)

    const comments = filteredComments.map(comment => (<Comment comment={comment} />))
    return (
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
                        <small><a onClick={handleUpVote}>Upvote - {likes}</a> · <a onClick={handleDownVote}>Downvote - {dislikes}</a></small>
                    </p>
                    <div className="field">
                    <p>
                    {comments}
                    </p>
                    </div>
                    {!toggle ? <div className="field">
                                <p className="control">
                                    <button className="button comment-margin" onClick={toggleComment}>Leave a comment</button>
                                </p>
                            </div>
                            :
                    <article className="media">
                        <div className="media-content">
                            <form onSubmit={handleComment} >
                                <div className="field">
                                    <p className="control">
                                        <textarea 
                                        className="textarea"
                                        value={commentText} // Bind value to state
                                        onChange={(e) => setCommentText(e.target.value)} // Update state on change
                                        placeholder="Add a comment..."
                                        ></textarea>
                                    </p>
                                </div>
                                <div className="field">
                                    <p className="control">
                                        <button className="button" onClick={handleComment}>Post comment</button>
                                    </p>
                                </div>
                                <div className="field">
                                    <p className="control">
                                        <button className="button" onClick={toggleComment}>I'll hold my peace...</button>
                                    </p>
                                </div>
                            </form>
                        </div>
                    </article>}
                </div>
            </div>
        </article>
    )
}

export default Issue