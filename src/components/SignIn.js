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
        <div className="d-flex justify-content-center mt-5">
            
            <Form onSubmit={getCredentials} onChange={handleChange} >
            <h1 className="text-center mb-3">Đăng nhập</h1>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" name="email" placeholder="Nhập email"
                        value={credentials.email}/>
                    <Form.Text className="text-muted">
                        Email của bạn là bí mật giữa chúng mình
                    </Form.Text>
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" name="password" placeholder="Password"
                        value={credentials.password} />
                </Form.Group>
                {/* <Form.Group controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="Check me out" />
                </Form.Group> */}
                <div className="text-center">
                <Button className="brownButton button" type="submit">
                    Đăng nhập
                 </Button>
                 </div>
            </Form>
        </div>
    )
}