import React from 'react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFaceGrinHearts } from '@fortawesome/free-solid-svg-icons'
import '../styles.css';
import axios from 'axios';
import Spinner from './Spinner';
import url from './secret'
const facebookicon = <FontAwesomeIcon className='iconCss' icon={faFaceGrinHearts} style={{ color: "#254b8d", }} />

const LoginComponent = () => {
    const Navigate = useNavigate();
    const [Data, setdata] = useState({ name: '', password: '' });
    const [Loading,setLoading]  = useState(false);


    const Handlelogin = async() => {
        try{
            console.log(url)
            setLoading(true);
            const response = await axios.post(`${url}/user/login`,Data)
            if(response.data.message === "user logged in"){localStorage.setItem('access_token',response.data.token)
            alert(response.data.message)
            Navigate('/boothData')
            setLoading(false);
        }else if(response.data.message === "invalid credentials"){
            alert(response.data.message);
            setLoading(false);
        }else{
            alert(response.data.message);
            setLoading(false);
        }
            
        }catch(err){
            console.log(err);
        }

    }

    return (
        (Loading == true ? <Spinner/> : <div >
        <div className='elevated-box' style={{ width: "350px", height: "450px", marginLeft: "auto", marginRight: "auto", alignItems: "center", marginTop: "50px", zIndex: '1'}}>
        
            <div className="card" style={{ width: "350px", height: "450px", alignItems: "center", marginTop: '0px',backgroundColor: "#FFC107"}}>
                <div style={{ width: "100%" }}><p style={{ fontWeight: "bold", fontSize: "25px", color: "black", marginLeft: "105px", marginTop: "50px" }}>Login Page</p></div>


                <input onChange={(e) => setdata({ ...Data, name: e.target.value })} className='loginInput' type="name" placeholder="Enter user name" />


                <input onChange={(e) => setdata({ ...Data, password: e.target.value })} className='loginInput' type="password" placeholder="Enter Password" />

                <Link style={{ width: "75%", marginTop: "20px" }}>
                    <button  onClick={() => {Handlelogin()}}  style={{ width: "100%", color: "white", fontWeight: "bold" }} type="button" className="btn btn-info">Log in
                    </button>
                </Link>

                <ul style={{ display: "flex", marginTop: "20px", listStyleType: "none", alignItems: "center", width: "100%", marginLeft: "57px" }}>
                    <li> <h4 style={{ borderColor: "grey", borderBottom: "1px solid black", width: "100px" }}></h4></li>
                    <li><h6 style={{ width: "37px", padding: "5px", color: "grey" }}>OR</h6></li>
                    <li><h4 style={{ borderColor: "grey", borderBottom: "1px solid black", width: "100px" }}></h4></li>
                </ul>

                <div style={{ display: "flex" }}>
                    {facebookicon}
                    <p style={{ marginLeft: "6px", fontWeight: "bold", fontSize: "15px", color: "#254b8d" }}>Log in with Facebook</p>
                </div>
            </div>



        </div>
    </div>)

        
    );
}

export default LoginComponent