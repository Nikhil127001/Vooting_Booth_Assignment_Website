import React, { useEffect, useState } from "react";
import '../styles.css';
import axios from "axios";
import NavigationComponent from "./NavigationComponent";
import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Spinner from "./Spinner";
import url from "./secret";

const UserlistComponent = () => {
    const [currentUserData, setCurrentUserData] = useState(null)
    const [show, setShow] = useState(false);
    const [users, setUsers] = useState([]);
    const [loading , setloading] = useState(false);

    const [userdata, setuserData] = useState({
        name: '', password: '', boothSt: '', boothEd: ''
    })
    const handleClose = () => setShow(false);
    const handleShow = (item) => {
        setCurrentUserData(item)
        setShow(true);
    }
    
    const edituser = async () => {
        try {
            setloading(true)
            const config = {
                headers : {
                    'access_token' : localStorage.getItem('access_token')
                }
            }
            const response = await axios.put(`${url}/user/updateUser/${currentUserData._id}`,userdata,config);
            if (response.data.message === "updated successfully") {
                alert('updated successfully')
                setShow(false)
                getAllUsers();
            }
            setloading(false)
        } catch (err) {
            console.log(err);
        }
    }

    const handleDelete = async (item) => {

        try {
            setloading(true)
            const config = {
                headers : {
                    'access_token' : localStorage.getItem('access_token')
                }
            }
            const response = await axios.delete(`${url}/user/deleteUser/${item._id}`,config)

            if (response.data.message === "deleted successfully") {
                alert('Data deleted')
                getAllUsers();
                setloading(false)
            }

        } catch (err) {
            console.log(err);
        }
    }

    const getAllUsers = async () => {
        try {
            const config = {
                headers : {
                    'access_token' : localStorage.getItem('access_token')
                }
            }
            setloading(true);
            const response = await axios.get(`${url}/user/getUserData`,config)
            if(response.data.message === "Unauthorized. Admin required"){
                alert("Unauthorized. Admin required");
                setloading(false)
            }
            setUsers(response.data.usersData);
            setloading(false);
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        getAllUsers();
    }, []);

    return (
        <div id="Dashboard">
            <NavigationComponent />
            <div id="DataPage" >
                {loading ? <Spinner/> : <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">name</th>
                            <th scope="col">password</th>
                            <th scope="col">boothSt
                            </th>
                            <th scope="col">boothEd
                            </th>
                            <th scope="col">Edit/Delete
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {users && users.map((item, idx) => (
                            <tr key={idx}>
                                <td>{item.name}</td>
                                <td>{item.password}</td>
                                <td>{item.boothSt}</td>
                                <td>{item.boothEd}</td>
                                <td><div style={{ display: 'flex', flexDirection: 'row' }}>
                                    <Link variant="primary" onClick={() => {handleShow(item)}}><i style={{ height: '30px', width: '30px' }} className="bi bi-pencil-square icons" /></Link>
                                    <Link onClick={() => { handleDelete(item) }}><i className="bi bi-x-square icons" /></Link>
                                </div>
                                </td>
                                <Modal show={show} onHide={handleClose}>
                                    <Modal.Header closeButton>
                                        <Modal.Title>Edit user</Modal.Title>
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
                                        <Button variant="primary" onClick={() => {edituser()}}>
                                            Save Changes
                                        </Button>
                                    </Modal.Footer>
                                </Modal>
                            </tr>
                        ))}
                    </tbody>
                </table>}
            </div>
        </div>

    );
}

export default UserlistComponent;