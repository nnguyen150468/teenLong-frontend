import React, { useState } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

export default function SignIn(props) {
    const [credentials, setCredentials] = useState({
        email: "",
        password: ""
    })

    const submitCredentials = async () => {
        const config = {
            method: "POST",
            body: JSON.stringify(credentials),
            headers: {
                "Content-Type": "application/json"
            }
        };
        try {
            const res = await fetch(`${process.env.REACT_APP_SERVER}/auth/login`,
                config);

            const body = await res.json()
            if (body.status === "success") {
                props.setUser(body.data);
                console.log('successfully login!')
                localStorage.setItem("teenLongToken", body.token)
            } else {
                props.setUser(null)
                localStorage.removeItem("teenLongToken")
            }

        } catch (err) {
            console.log('props.setUser', props.setUser)
            console.log(err.message);
        }
    }

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    const getCredentials = (e) => {
        e.preventDefault();
        const form = e.currentTarget
        if (form.checkValidity() === false) {
            e.stopPropagation();
        } else {
            submitCredentials()
        }
    }

    return (
        <div className="d-flex justify-content-center">
            <Form onSubmit={getCredentials} onChange={handleChange}>
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
                        value={credentials.password} />
                </Form.Group>
                <Form.Group controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="Check me out" />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                 </Button>
            </Form>
        </div>
    )
}