import React, {useState} from 'react'

export default function PasswordRecoverPage() {
    const [email, setEmail] = useState(null)
    const [submitted, setSubmitted] = useState(false)

    const submitEmail = async(e) => {
        e.preventDefault()
        const res = await fetch(`${process.env.REACT_APP_SERVER}/users/forget-password/${email}`)
        const data = await res.json()
        console.log('data====',data)
        setSubmitted(true)
    }

    const handleChange = (e) => {
        setEmail(e.target.value)
    }

    return (
        !submitted? 
        <div>
            Enter your email address to recover your password
            <form onSubmit={submitEmail} onChange={handleChange} className="form-inline text d-flex justify-content-center">
                <input className="form-control mr-2" type="email" placeholder="email"/>
                <button className="btn btn-primary" type="submit">Submit</button>
            </form>
        </div>
        : <div>
            Your email was submitted. You will receive an email with the link to reset your password. The link will expire after <strong>15 minutes.</strong>
            </div>
    )
}