import { useEffect } from "react"

function Comment(props) {
    const { comment } = props
    useEffect(()=> {console.log(comment)},[])
    
    return (
        <article className="media">
            <div className="media-content">
                <div className="content">
                    <p className="comment-margin">
                        {comment.text}
                        <strong>  </strong> · <small>{comment.dateOfComment}</small>
                    </p>
                </div>
            </div>
        </article>
    )
}

export default Comment