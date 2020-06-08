import React, {useState} from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'
import { Link, NavLink, useHistory } from 'react-router-dom'
import {ReactComponent as Logo} from '../images/logo.svg' 

export default function NavBar(props) {
    const history = useHistory()
    const alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j",
        "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]

    const renderAlphabet = () => {
            return alphabet.map(e => <div key={e} onClick={()=> filterByFirstChar(e)} 
        className="col-3 d-flex justify-content-center text-center">
            <div className="firstChar p-1 m-1">{e.toUpperCase()}</div></div>)}

    const filterByFirstChar = (e) => {
        history.push(`/filter/first-char/${e}`)
    }       

    async function logout() {
        const res = await fetch(`${process.env.REACT_APP_SERVER}/auth/logout`, {
            headers: { authorization: `Bearer ${localStorage.getItem('teenLongToken')}` },
            mathod: 'GET'
        })
        console.log('res===', res)
        if (res.status === 204) {
            props.setUser(null)
            localStorage.removeItem('teenLongToken')
        } else {
            alert("Cannot log out at the moment")
        }
    }

    return (
        <div>
                {<Navbar style={{backgroundColor:"black"}} expand="lg" variant="dark">
                    <Link to="/"><Navbar.Brand>
                    <Logo style={{width: "50px"}} />
                    </Navbar.Brand></Link>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto" inline="true">
                            <NavDropdown title="Chữ cái đầu" id="basic-nav-dropdown">
                                <div className="d-flex flex-wrap">
                                    {renderAlphabet()}
                                    <div onClick={()=> filterByFirstChar('*')} 
                            className="col-3 d-flex justify-content-center text-center">
                                <div className="firstChar p-1 m-1">#</div></div>
                                </div>
                            </NavDropdown>

                            {/* <NavDropdown title="Thể loại" id="basic-nav-dropdown">
                                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                            </NavDropdown> */}
                            <Nav.Link as={NavLink} to="/addWord" inline="true">Thêm từ <i class="fas fa-plus-circle"></i></Nav.Link>
                        </Nav>
                        <Nav inline="true">
                            {props.user ? <Nav.Link as={NavLink} to="/myProfile"><i class="fas fa-user"></i> {props.user.name}</Nav.Link> : <Nav.Link as={NavLink} to="/login"> Đăng nhập</Nav.Link>}
                            {props.user ? "" : <Nav.Link as={NavLink} to="/signup">Đăng kí</Nav.Link>}
                            {props.user ? <Nav.Link as={NavLink} to="/" onClick={logout}>Thoát</Nav.Link> : ""}
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>}
        </div>
    )
}
