import { useState } from 'react'

const initInputs = {
    title: '',
    description: ''
}

function IssueForm(props) {
    const [inputs, setInputs] = useState(initInputs)

    const { postIssue, setToggle } = props

    const handleChange = (e) => {
        e.preventDefault() // prevents inputs from refreshing
        const { name, value } = e.target // pull name and value out of event.target
        setInputs(prevInputs => ({
            ...prevInputs,
            [name]: value
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        postIssue(inputs) // send inputs to context
        setInputs(initInputs)
        setToggle(prev => !prev)
    }

    const { title, description } = inputs

    return (
        <form onSubmit={handleSubmit} className='box is-smaller' >
            {/* TITLE INPUT */}
            <div className="field">
                <label className="label">Title</label>
                <div className="control">
                    <input
                        className="input"
                        type="text"
                        placeholder="What's the issue?"
                        name="title"
                        value={title}
                        onChange={handleChange}
                    />
                </div>
            </div>

            {/* TEXT AREA INPUT */}
            <div className="field">
                <label className="label">Content</label>
                <div className="control">
                    <textarea
                        className="textarea"
                        placeholder="Spill the tea..."
                        name="description"
                        value={description}
                        onChange={handleChange}
                    />
                </div>
            </div>

            {/* BUTTON */}
            <div className="buttons">
                <button className="button is-success is-light" onClick={handleSubmit}>Success</button>
            </div>
        </form>
    )
}

export default IssueForm