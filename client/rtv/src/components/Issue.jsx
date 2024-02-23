function Issue(props) {
    const { title, description, datePosted, upVote, username } = props

    return (
        <div className="card is-spaced">

            <header className="card-header">
                <p className="card-header-title">{title}</p>
            </header>

            <div className="card-content">
                <div className="content">
                    {description}
                    <br />
                    <a href="#">@{username} - </a>
                
                    <time datetime="2016-1-1">{datePosted}</time>
                </div>
            </div>

            <footer className="card-footer">
                <a href="#" className="card-footer-item">Up Votes {upVote}</a>
                <a href="#" className="card-footer-item">Edit</a>
                <a href="#" className="card-footer-item">Delete</a>
            </footer>
        </div>
    )
}

export default Issue