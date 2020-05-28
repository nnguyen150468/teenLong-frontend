import React, {useState} from 'react'
import {useHistory} from 'react-router-dom'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

export default function SignupPage() {
    const [credentials, setCredentials] = useState({
        name: "",
        email: "",
        password: "",
        password2: ""
    })
    const [warning, setWarning] = useState(null)
    const [inputStyle, setInputStyle] = useState(null)

    const history = useHistory()
    const handleChange = (e) => {
        setCredentials({...credentials, [e.target.name]: e.target.value})
    }

    const getCredentials = (e) => {
        e.preventDefault()
        const form = e.currentTarget;
        if(form.checkValidity() === false){
            e.stopPropagation();
        } else {
            submitCredentials()
        }
    }

    const submitCredentials = async () => {
        console.log('credentials', credentials)
        if(credentials.password!==credentials.password2){
            setWarning(<small>Passwords don't match</small>)
            setInputStyle({
                border: "1px solid red",
                marginBottom: 0
            })
            return
        }
        if(credentials.password===credentials.password2){
            setWarning(null)
            setInputStyle(null)
        
        const config = {
            method: "POST",
            body: JSON.stringify(credentials),
            headers: {
                "Content-Type": "application/json"
            }
        };

        try{
            const res = await fetch(`${process.env.REACT_APP_SERVER}/users/`, config)
            const body = await res.json()
            console.log('here in sign up')
            console.log('res====SignUp', body)
            if(body.status === "failed") return

            history.push("/login")
        } catch(err){
            console.log(err.message)
        }
        }
    }

    return (
        <div className="d-flex justify-content-center">
        <Form onSubmit={getCredentials} onChange={handleChange}>
            <Form.Group controlId="formBasicName">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" name="name" placeholder="Name"
                    value={credentials.name} />
            </Form.Group>

            <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" name="email" placeholder="Enter email"
                    value={credentials.email} />
                <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                </Form.Text>
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" name="password" placeholder="Password"
                    value={credentials.password} style={inputStyle} />
                <Form.Text className="text-danger">
                    {warning}
                </Form.Text>
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
                <Form.Label>Confirm password</Form.Label>
                <Form.Control type="password" name="password2" placeholder="Re-enter password"
                    value={credentials.password2} style={inputStyle} />
                <Form.Text className="text-danger">
                    {warning}
                </Form.Text>
            </Form.Group>

            <Button variant="primary" type="submit">
                Submit
             </Button>
        </Form>
    </div>
    )
}
