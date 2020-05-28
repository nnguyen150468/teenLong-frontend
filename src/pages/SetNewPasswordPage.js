import React, {useState} from 'react'
import {useParams} from 'react-router-dom'

export default function SetNewPasswordPage() {
    const [password, setPassword] = useState(null)
    const [passwordMatch, setPasswordMatch] = useState(false)
    const [warning, setWarning] = useState(null)
    const [inputStyle, setInputStyle] = useState(null)
    const params = useParams()
    const [submitted, setSubmitted] = useState(false)

    const submitPassword = async(e) => {
        e.preventDefault()
        if(password.password!==password.password2){
            setWarning(<small className="form-text text-danger">Passwords don't match</small>)
            setInputStyle({
                border: "1px solid red",
                marginBottom: 0
            })
            return
        }
        if(password.password===password.password2){
            setWarning(null)
            setInputStyle(null)
        }
        console.log('params===', params.token)
        const res = await fetch(`${process.env.REACT_APP_SERVER}/users/update-password/${params.token}`,
        {
            method: "POST",
            body: JSON.stringify(password),
            headers: {
                "Content-Type": "application/json"
            }
        })
        const data = await res.json()
        if(data.status==="success"){
            setSubmitted(true)
        }
    }

    const handleChange = (e) => {
        setPassword({...password, [e.target.name]: e.target.value})
        console.log('password====', password)
    }
    return (
        <div>
            <div className="d-flex justify-content-center">
            {!submitted?
            <form onSubmit={submitPassword} onChange={handleChange} className="">
                    <label for="password" className="mt-3">New password</label>
                    <input className="form-control mr-2" style={!passwordMatch? inputStyle : ""} type="password" name="password" placeholder="password" />
                    {!passwordMatch? warning : null }
                    <label for="password2" className="mt-3">Confirm password</label>
                    <input className="form-control mr-2" style={!passwordMatch? inputStyle : ""}  type="password" name="password2" placeholder="re-enter password" />
                    {!passwordMatch? warning : null}
                    <button className="btn btn-primary mt-3" type="submit">Submit</button>
                </form>
            : <div>Password successfully reset!</div>}    
            </div>
        </div>
    )
}