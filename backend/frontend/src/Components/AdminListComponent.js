import React, { useEffect, useState } from "react";
import '../styles.css';
import axios from "axios";
import NavigationComponent from "./NavigationComponent";
import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import  Form  from "react-bootstrap/Form";
import Spinner from "./Spinner";
import url from "./secret";

const AdminListComponent = () => {
    const [editingAdmin, setEditingAdmin] = useState(null);
    const [loading , setloading] = useState(false);
    const [AdminData,setAdminData] = useState({name : '' , password : ''})
    const [admins, setAdmins] = useState([]);
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);

    const handleShow = (item) => {
        setEditingAdmin(item)
        setShow(true);}

    const onClickHandler = async() => {
       try{
        const config = {
            headers : {
                access_token : localStorage.getItem('access_token') 
            }
        }
        setloading(true);
        const response = await axios.put(`${url}/user/updateAdmin/${editingAdmin._id}`,AdminData,config);

        if(response.data.message === 'Admin updated successfully'){
            alert('Admin updated successfully')
            getAllAdmins();
            setloading(false);
        }
       }catch(err){
        console.log(err)
       }
    }

    const handleDelete = async(item) => {

        try {
            const config = {
                headers : {
                    access_token : localStorage.getItem('access_token') 
                }
            }
            setloading(true)
            const response = await axios.delete(`${url}/user/deleteAdmin/${item._id}`,config)

            if (response.data.message === "Admin deleted Successfully") {
                alert('Data deleted')
                getAllAdmins();
                setloading(false)
            }

        } catch (err) {
            console.log(err);
        }
    }

    const getAllAdmins = async () => {
        try {
            const config = {
                headers : {
                    'access_token' : localStorage.getItem('access_token')
                }
            }
            setloading(true);
            const response = await axios.get(`${url}/user/getAdminData/`,config)
            if(response.data.message === "Unauthorized. SuperAdmin required" || response.data.message === "Unauthorized. Admin required"){
                setloading(false);
                alert('SuperAdmin required')
            }else{
            setAdmins(response.data.admins);
            setloading(false);}
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        getAllAdmins();
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
                            <th scope="col">Edit/Delete
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {admins && admins.map((item, idx) => (
                            <tr key={idx}>
                                <td>{item.name}</td>
                                <td>{item.password}</td>
                                <td><div style={{ display: 'flex', flexDirection: 'row' }}>
                                    <Link variant="primary" onClick={()=>{handleShow(item)}}><i style={{ height: '30px', width: '30px' }} className="bi bi-pencil-square icons" /></Link>
                                    <Link onClick={() => { handleDelete(item) }}><i className="bi bi-x-square icons" /></Link>
                                </div>
                                </td>
                                <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Admin</Modal.Title>
                </Modal.Header>
                <Modal.Body>          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Admin user name</Form.Label>
              <Form.Control
                type="email"
                placeholder="Admin1234"
                autoFocus
                onChange={(e)=>setAdminData({...AdminData,name : e.target.value})}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="password"
                autoFocus
                onChange={(e)=>setAdminData({...AdminData,password : e.target.value})}
              />
            </Form.Group>
          </Form>
</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => {
                        onClickHandler(item)
                    }}>
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

export default AdminListComponent;