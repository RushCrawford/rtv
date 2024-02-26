import { Link } from 'react-router-dom'
import IssueList from './IssueList'
import { useContext, useEffect } from 'react'
import { UserContext } from '../context/UserProvider'

function Public() {
    const { getAllIssues, allIssues, getComments } = useContext(UserContext)

    useEffect(()=> {
        getAllIssues()
        getComments()
    }, [])

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
                            <span className="navbar-item">
                                <a className="button is-primary is-inverted"  >
                                    <span className="icon">
                                        <i className="fab fa-github"></i>
                                    </span>
                                    <Link to="/">Login</Link>
                                </a>
                            </span>
                        </div>
                    </div>
                </div>
            </nav>
        </div>

        {/* <!-- Hero content: will be in the middle --> */}
        
        <div className="container">
            
            <div className="hero-body">
                <div className="container has-text-centered">
                    <p className="title">
                        Welcome To Rock the Vote
                    </p>
                    <p className="subtitle">
                        Your Issues
                    </p>
                    <IssueList issues={allIssues} />
                </div>
            </div>
        </div>
    </section>
    )
}

export default Public