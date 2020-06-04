import React, {useState} from 'react'
import {useHistory} from 'react-router-dom'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import SignUpBuff from '../images/signup.svg'

export default function SignupPage() {
    const [credentials, setCredentials] = useState({
        name: "",
        email: "",
        password: "",
        password2: ""
    })
    const [warning, setWarning] = useState(null)
    const [inputStyle, setInputStyle] = useState(null)
    const [submitted, setSubmitted] = useState(false)

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
            setWarning(<small>Passwords không khớp nhau</small>)
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
            setSubmitted(true)
            if(body.status === "failed") return
            history.push("/login")
        } catch(err){
            console.log(err.message)
        }
        }
    }

    return (
        <div className="mt-5">
        {!submitted? 
        <div className="d-flex justify-content-center">
            <img src={SignUpBuff} alt="sign-up-buff" className="col-md-4 col-sm-0"/>
        <Form onSubmit={getCredentials} onChange={handleChange} className="col-5">
            <h1>Đăng kí</h1>
            <Form.Group controlId="formBasicName">
                <Form.Label>Tên</Form.Label>
                <Form.Control required type="text" name="name" placeholder="tên"
                    value={credentials.name} />
            </Form.Group>

            <Form.Group controlId="formBasicEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control required type="email" name="email" placeholder="email"
                    value={credentials.email} />
                <Form.Text className="text-muted">
                    Chúng tôi sẽ không chia sẻ email bạn với bên thứ ba
                </Form.Text>
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control required type="password" name="password" placeholder="Password"
                    value={credentials.password} style={inputStyle} />
                <Form.Text className="text-danger">
                    {warning}
                </Form.Text>
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
                <Form.Label>Nhập lại password</Form.Label>
                <Form.Control required type="password" name="password2" placeholder="Nhập lại password"
                    value={credentials.password2} style={inputStyle} />
                <Form.Text className="text-danger">
                    {warning}
                </Form.Text>
            </Form.Group>

            <Button variant="warning" type="submit" className="button">
                Đăng kí
             </Button>
        </Form>
        </div>
        : <div className="text-center mt-5">Đăng kí thành công. Bạn có thể đăng nhập bằng email và password.</div>}
    </div>
    )
}
