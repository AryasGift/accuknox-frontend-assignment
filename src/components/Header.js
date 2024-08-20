import React, { useState } from 'react'
import { Form, Nav, NavDropdown } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
function Header({update}) {
    const searchString=(e)=>{
        const searchElement=e.target.value
        update({search:searchElement})
    }
    
    return (
        <Navbar expand="lg" className='bg-body-tertiary'>
            <Container>
                <Navbar.Brand href="#home">
                    <img
                        alt=""
                        src="https://i.postimg.cc/vBbyDrwL/admin-removebg-preview.png"
                        width="40"
                        height="30"
                        className="d-inline-block align-top"
                    />
                    Dashboard
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        <Form className='d-flex mb-lg-0 mx-auto mb-lg-0'>
                             <input
                                    type="text"
                                    placeholder="Search anything..."
                                    aria-label="Search"
                                    style={{ width: '400px', height: '40px' }}
                                    onChange={(e)=>searchString(e)}

                                />
                             <button className='btn1 pe-2'><i class="fa-solid fa-magnifying-glass"></i></button>
                        </Form>
                    </Nav>
                    <Nav className="ms-auto d-none d-sm-flex">
                        <Nav.Link>
                            <i class="fa-solid fa-bell fa-1x"></i>
                        </Nav.Link>
                        <Nav.Link>
                            <i class="fa-solid fa-circle-user fa-1x"></i>
                        </Nav.Link>
                        <NavDropdown title="Admin" id="basic-nav-dropdown">
                            <NavDropdown.Item href="#action/3.1"></NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>


            </Container>
        </Navbar>
    )
}

export default Header
