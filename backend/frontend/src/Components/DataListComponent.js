import React, { useEffect, useState } from "react";
import '../styles.css';
import axios from "axios";
import NavigationComponent from "./NavigationComponent";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Spinner from "./Spinner";
import url from "./secret";

const DataListComponent = () => {
    const [show, setShow] = useState(false);
    const [data, setdata] = useState([]);
    const [BoothData, setBoothData] = useState({
        Polling_Booth_Number: '',
        Polling_Booth_Name: '',
        Parent_Constituency: '',
        Winner: '',
        Total_Voters: '',
        BJP_Votes: '',
        INC_Votes: ''
    })
    const [filters,setfilters] = useState({Polling_Booth_Number : '' , Polling_Booth_Name : '' })
    const[loading,setloading] = useState(false)
    const [selectedBoothData, setSelectedBoothData] = useState(null);
    const[filteredData , setFilteredData] = useState([]);


    const handleClose = () => {
        setShow(false);
    }
    const handleShow = (item) => {
        setSelectedBoothData(item)
        console.log(item)
        setShow(true);
    }
    const applyBoothNumberFilters = () => {
        let arr = [];
        if(filters.Polling_Booth_Name != '' && filters.Polling_Booth_Number == ''){
            arr = data.filter(item => item.Polling_Booth_Name.includes(filters.Polling_Booth_Name));
        }
        else if(filters.Polling_Booth_Name == '' && filters.Polling_Booth_Number != ''){
            arr = data.filter(item => item.Polling_Booth_Number == filters.Polling_Booth_Number )
        }
        else{
        arr = data.filter(item => item.Polling_Booth_Number == filters.Polling_Booth_Number && item.Polling_Booth_Name.includes(filters.Polling_Booth_Name));}
        setFilteredData(arr);  
    }


    useEffect(() => {
        applyBoothNumberFilters();
    },[filters])

    const editBoothData = async () => {
        try {  
            const Config = {
                headers : {
                'access_token' : localStorage.getItem('access_token')
            }
        }; 
            setloading(true)
                const response = await axios.put(`${url}/user/updateData/${selectedBoothData._id}`, BoothData,Config)

            if (response.data.message === "Data updated successfully") {
                alert('data upadted successfully');
                getAllData();
                setShow(false);
                setloading(false)
            }
        } catch (err) {
            console.log(err)
        }
    }

    const handleDelete = async (item) => {
        try {
            const Config = {
                headers : {
                'access_token' : localStorage.getItem('access_token')
            }
        };
            
            setloading(true)
            const response = await axios.delete(`${url}/user/deleteData/${item._id}`,Config)

            if (response.data.message === "deleted Successfully") {
                alert('Data deleted')
                getAllData();
                setloading(false)
            }

        } catch (err) {
            console.log(err);
        }
    }

    const getAllData =  async() => {
        try {
            const Config = {
                headers : {
                'access_token' : localStorage.getItem('access_token')
            }
        };
            setloading(true)
            const response =  await axios.get(`${url}/user/getData/`,Config);
            setdata(response.data.data)
            setloading(false)
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        getAllData();
    }, [])

    return (
        <div id="Dashboard">
            <NavigationComponent />
            <div id="DataPage" >
                {loading ?<Spinner/> : <table className="table">
                    <thead>
                        <tr>
                            <th scope="col"><input   className='filters' type="name"
                            onChange={(e) => {setfilters({...filters,Polling_Booth_Number : e.target.value})}} 
                            placeholder="Filter by Booth number" /></th>
                            <th scope="col"><input   className='filters' type="name" 
                             onChange={(e) => {setfilters({...filters,Polling_Booth_Name : e.target.value})}} 
                            placeholder="Filter by Booth Name" /></th>
                            <th scope="col">Total Voters
                            </th>
                            <th scope="col">Winner- 2014
                            </th>
                            <th scope="col">BJP - Votes
                            </th>
                            <th scope="col">INC- Votes
                            </th>
                            <th scope="col">Edit/Delete
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {(filteredData.length !== 0? filteredData : data).map((item, idx) => (
                            <tr key={idx}>
                                <td>{item.Polling_Booth_Number}</td>
                                <td>{item.Polling_Booth_Name}</td>
                                <td>{item.Total_Voters}</td>
                                <td>{item.Winner}</td>
                                <td>{item.BJP_Votes}</td>
                                <td>{item.INC_Votes}</td>
                                <td><div style={{ display: 'flex', flexDirection: 'row' }}>
                                    <Link><i variant="primary" onClick={() => { handleShow(item) }} style={{ height: '30px', width: '30px' }} className="bi bi-pencil-square icons" /></Link>
                                    <Link onClick={() => { handleDelete(item) }}><i className="bi bi-x-square icons" /></Link>
                                </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>}
            </div>
            <Modal show={show} onHide={handleClose}>
                                    <Modal.Header closeButton>
                                        <Modal.Title>Update Booth Data</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        <Form>
                                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                                <Form.Label>Polling Booth Number</Form.Label>
                                                <Form.Control
                                                    type="name"
                                                    placeholder= {selectedBoothData ? selectedBoothData.Polling_Booth_Number : ''}
                                                    autoFocus
                                                    onChange={(e) =>{setBoothData({...BoothData,Polling_Booth_Number : e.target.value})}}
                                                />
                                            </Form.Group>
                                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                                <Form.Label>Polling Booth Name</Form.Label>
                                                <Form.Control
                                                    type="name"
                                                    placeholder={selectedBoothData ? selectedBoothData.Polling_Booth_Name : ''}
                                                    autoFocus
                                                    onChange={ (e) => {setBoothData({...BoothData , Polling_Booth_Name : e.target.value})}}
                                                />
                                            </Form.Group>
                                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                                <Form.Label>Parent Constituency</Form.Label>
                                                <Form.Control
                                                    type="name"
                                                    placeholder={selectedBoothData ? selectedBoothData.Parent_Constituency : ''}
                                                    autoFocus
                                                    onChange={ (e) => {setBoothData({...BoothData , "Parent Constituency" : e.target.value})}}
                                                />
                                            </Form.Group>
                                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                                <Form.Label>Winner Name</Form.Label>
                                                <Form.Control
                                                    type="name"
                                                    placeholder={selectedBoothData ? selectedBoothData.Winner :  ''}
                                                    autoFocus
                                                    onChange={ (e) => {setBoothData({...BoothData , "Winner- 2014" : e.target.value})}}
                                                />
                                            </Form.Group>
                                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                                <Form.Label>Total Voters</Form.Label>
                                                <Form.Control
                                                    type="number"
                                                    placeholder={selectedBoothData ?selectedBoothData.Total_Voters : ''}
                                                    autoFocus
                                                    onChange={ (e) => {setBoothData({...BoothData , "Total Voters" : e.target.value})}}
                                                />
                                            </Form.Group>
                                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                                <Form.Label>BJP - Votes</Form.Label>
                                                <Form.Control
                                                    type="number"
                                                    placeholder={selectedBoothData ? selectedBoothData.BJP_Votes : ''}
                                                    autoFocus
                                                    onChange={ (e) => {setBoothData({...BoothData , "BJP - Votes" : e.target.value})}}
                                                />
                                            </Form.Group>
                                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                                <Form.Label>BJP - Votes</Form.Label>
                                                <Form.Control
                                                    type="number"
                                                    placeholder={selectedBoothData ? selectedBoothData.BJP_Votes : ''}
                                                    autoFocus
                                                    onChange={ (e) => {setBoothData({...BoothData , "INC- Votes" : e.target.value})}}
                                                />
                                            </Form.Group>
                                        </Form>
                                    </Modal.Body>
                                    <Modal.Footer>
                                        <Button variant="secondary" onClick={handleClose}>
                                            Close
                                        </Button>
                                        <Button variant="primary" onClick={() => { editBoothData() }}>
                                            Save Changes
                                        </Button>
                                    </Modal.Footer>
                                </Modal>
        </div>

    );
}

export default DataListComponent;