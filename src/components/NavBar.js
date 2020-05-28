import React from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'
import {Link, NavLink} from 'react-router-dom'

export default function NavBar(props) {

    async function logout(){
        const res = await fetch(`${process.env.REACT_APP_SERVER}/auth/logout`, {
            headers: {authorization: `Bearer ${localStorage.getItem('teenLongToken')}`},
            mathod: 'GET'
        })
        console.log('res===', res)
        if(res.status===204){
            props.setUser(null)
            localStorage.removeItem('teenLongToken')
        } else {
            alert("Cannot log out at the moment")
        }
    }

    return (
        <div>
            <>
                <Navbar bg="dark" expand="lg" variant="dark">
                    <Link to="/"><Navbar.Brand>Teen-Long</Navbar.Brand></Link>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto" inline="true">
                            <NavLink to="/">Browse</NavLink>
                            <NavDropdown title="Categories" id="basic-nav-dropdown">
                                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                            </NavDropdown>
                            <NavLink to="/addWord" inline="true">Add Word</NavLink>
                        </Nav>
                        <Nav inline="true">
                            {props.user? <NavLink to="/myProfile">{props.user.name}</NavLink> : <NavLink to="/login">Login</NavLink>}
                            {props.user? "" : <NavLink to="/signup">Sign up</NavLink>}
                            {props.user? <NavLink to="/logout" onClick={logout}>Logout</NavLink> : ""}
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </>
        </div>
    )
}
