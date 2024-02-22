function AuthForm(props) {
    const {
        buttonText,
        handleChange,
        handleSubmit,
        errMsg,
        inputs: {
            username,
            password,
        }
    } = props
    return (
        <div className="container">
            <div className="notification is-primary">

                <form onSubmit={handleSubmit}>

                    {/* USERNAME INPUT FIELD WITH BULMA STYLING */}
                    <div className="field">
                        <label className="label">Username</label>
                        <div className="control has-icons-left has-icons-right">
                            <input
                                className="input is-success"
                                type="text"
                                placeholder="Username"
                                name="username"
                                value={username}
                                onChange={handleChange}
                            />
                            <span className="icon is-small is-left">
                                <i className="fas fa-user"></i>
                            </span>
                            <span className="icon is-small is-right">
                                <i className="fas fa-check"></i>
                            </span>
                        </div>
                        <p className="help is-success">This username is available</p>
                    </div>

                    {/* PASSWORD INPUT FIELD WITH BULMA STYLING */}
                    <div className="field">
                        <label className="label">Password</label>
                        <div className="control has-icons-left has-icons-right">
                            <input
                                className="input is-success"
                                type="password"
                                placeholder="Password"
                                name="password"
                                value={password}
                                onChange={handleChange}
                            />
                            <span className="icon is-small is-left">
                                <i className="fas fa-user"></i>
                            </span>
                            <span className="icon is-small is-right">
                                <i className="fas fa-check"></i>
                            </span>
                        </div>
                        <p className="help is-danger">{errMsg}</p>            
                    </div>

                    {/* BUTTONS */}
                    <div className="field is-grouped">
                        <div className="control">
                            <button className="button is-link">{buttonText}</button>
                        </div>
                        <div className="control">
                            <button className="button is-link is-light">Cancel</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AuthForm