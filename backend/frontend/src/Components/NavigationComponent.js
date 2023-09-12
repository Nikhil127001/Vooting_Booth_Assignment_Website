import React, { useState } from "react";
import '../styles.css';
import { Link } from "react-router-dom";
import axios from "axios";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import url from "./secret";
const NavigationComponent = () => {
    const [show, setShow] = useState(false);
    const [showSecond, setShowSecond] = useState(false);
    const [userdata, setuserData] = useState({ name: '', password: '', boothSt: '', boothEd: '' });
    const [admindata, setAdminData] = useState({ name: '', password: ''});

    const handleClose = () => setShow(false);
    const handleShow = () => {
        setShow(true);
    }
    const handleCloseSecond = () => setShowSecond(false);
    const handleShowSecond = () => {
        setShowSecond(true);
    }

    const createUser = async () => {
        try {

            const config = {
                headers : {
                    access_token : localStorage.getItem('access_token')
                }
            }
            const response = await axios.post(`${url}/user/createUser`, userdata,config);
            if (response.data.message === "user created successfully") {
                alert('user created successfully');
                window.location.reload();
            }
        } catch (err) {
            console.log(err);
        }
    }
    const createAdmin = async () => {
        try {
            const config = {
                headers : {
                    access_token : localStorage.getItem('access_token')
                }
            }
            const response = await axios.post(`${url}/user/createAdmin`, admindata,config);
            if (response.data.message === "Admin created successfully") {
                alert('Admin created successfully');
                window.location.reload();
            }
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div id="Nav">
            <div style={{ paddingTop: "100px", width: '100%' }}>
                <div className="navItems">
                    <Link to={'/boothData'}><li >Voting Booth Data</li></Link>
                </div>
                <div className="navItems">
                    <Link to={'/usersData'}  ><li >Users Data</li></Link>
                    <button variant="primary" onClick={() => { handleShow() }} className="createButtons">+</button>
                </div>
                <div className="navItems">
                    <Link to={'/adminsData'} ><li >Admins Data</li></Link>
                    <button variant="primary" onClick={() => { handleShowSecond() }} className="createButtons">+</button>
                </div>
            </div>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Create user</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>name</Form.Label>
                            <Form.Control
                                onChange={(e) => { setuserData({ ...userdata, name: e.target.value }) }}
                                type="email"
                                placeholder="name"
                                autoFocus
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>password</Form.Label>
                            <Form.Control
                                onChange={(e) => { setuserData({ ...userdata, password: e.target.value }) }}
                                type="password"
                                placeholder="password"
                                autoFocus
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Starting Booth Number</Form.Label>
                            <Form.Control
                                onChange={(e) => { setuserData({ ...userdata, boothSt: e.target.value }) }}

                                type="number"
                                placeholder="Starting Booth"
                                autoFocus
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Ending Booth Number</Form.Label>
                            <Form.Control
                                onChange={(e) => { setuserData({ ...userdata, boothEd: e.target.value }) }}

                                type="number"
                                placeholder="Ending Booth "
                                autoFocus
                            />
                        </Form.Group>

                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => { createUser() }}>
                        create user
                    </Button>
                </Modal.Footer>
            </Modal>



            <Modal show={showSecond} onHide={handleCloseSecond}>
                <Modal.Header closeButton>
                    <Modal.Title>Create Admin</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>name</Form.Label>
                            <Form.Control
                                onChange={(e) => { setAdminData({ ...admindata, name: e.target.value }) }}
                                type="email"
                                placeholder="name"
                                autoFocus
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>password</Form.Label>
                            <Form.Control
                                onChange={(e) => { setAdminData({ ...admindata, password: e.target.value }) }}
                                type="password"
                                placeholder="password"
                                autoFocus
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseSecond}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => { createAdmin() }}>
                        create Admin
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default NavigationComponent;