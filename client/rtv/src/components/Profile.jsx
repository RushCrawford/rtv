import { useContext, useState } from "react"
import { UserContext } from "../context/UserProvider"
import IssueForm from "./IssueForm"
import Issue from "./Issue"
import IssueList from './IssueList'

function Profile() {
    const [ toggle, setToggle ] = useState(false)
    const {
        userState: {
            user: {
                username
            },
            issues,
        },
        logout,
        postIssue,
        upVoteIssue
    } = useContext(UserContext)

    const toggleForm = ()=> {
        setToggle(prev => !prev)
    }



    // const like = (issueId) {

    // }
    return (
        <section className="hero is-primary is-medium">
            {/* <!-- Hero head: will stick at the top --> */}
            <div className="hero-head">
                <nav className="navbar">
                    <div className="container">
                        <div className="navbar-brand">
                            <a className="navbar-item">
                                <img src="https://bulma.io/images/bulma-type-white.png" alt="Logo" />
                            </a>
                        </div>
                        <div id="navbarMenuHeroA" className="navbar-menu">
                            <div className="navbar-end">
                                <a className="navbar-item" onClick={toggleForm}>
                                    Post an Issue
                                </a>
                                <span className="navbar-item">
                                    <a className="button is-primary is-inverted" onClick={logout} >
                                        <span className="icon">
                                            <i className="fab fa-github"></i>
                                        </span>
                                        <span>logout</span>
                                    </a>
                                </span>
                            </div>
                        </div>
                    </div>
                </nav>
            </div>

            {/* <!-- Hero content: will be in the middle --> */}
            
            <div className="container">
                { toggle ? <div className="box"> 
                    <IssueForm 
                        postIssue={postIssue} 
                        setToggle={setToggle}
                        upVoteIssue={upVoteIssue}
                    /> 
                </div>
                :
                <div className="hero-body">
                    <div className="container has-text-centered">
                        <p className="title">
                            Welcome @{username}
                        </p>
                        <p className="subtitle">
                            Your Issues
                        </p>
                        <IssueList issues={issues} username={username}/>
                    </div>
                </div>}
            </div>
        </section>
    )
}

export default Profile