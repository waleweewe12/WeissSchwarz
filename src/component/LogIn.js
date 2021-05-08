import React,{useState} from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import ResetPassword from './ResetPassword';

function LogIn(props){

    const [username,Setusername] = useState("");
    const [password, setPassword] = useState("");
    const HandleusernameChanged = (e)=>{
        Setusername(e.target.value)
    }
    const handlePasswordChanged = (e) => {
        setPassword(e.target.value)
    }
    const Submit = async (e)=>{
        e.preventDefault()
        axios.post('http://localhost:5000/weissschwarz-f48e0/us-central1/app/signIn/',{
            username:username,
            password:password
        }).then((response) => {
            console.log(response.data);
            if(response.data.status === 'success'){
                localStorage.setItem('token', response.data.token);
                props.SetplayerName(username);
            }
        })
        .catch((err) => {
            console.log(err);
        })
    }
    return(
        <>
            {/* logo */}
            <div className="row justify-content-center">
                <img 
                    src="weiss_schwarz_logo.jpg"
                    alt="..."
                    style={{
                        width:'40rem'
                    }}
                />
            </div>
            {/* form */}
            <div className="row ms-2 me-2 justify-content-center">
                <div className="col-lg-4 col-md-6 col-sm-12 mt-5 shadow-lg bg-white rounded" >
                    <div className="mb-3 mt-3 ms-5 me-5">
                        <label htmlFor="username" className="form-label">username</label>
                        <input 
                            type="text" 
                            className="form-control" 
                            id="username" 
                            placeholder="Input your uername" 
                            value={username} 
                            onChange={HandleusernameChanged}
                            autoComplete="off"
                        />
                    </div>
                    <div className="mb-3 mt-3 ms-5 me-5">
                        <label htmlFor="password" className="form-label">password</label>
                        <input 
                            type="password" 
                            className="form-control" 
                            id="password" 
                            placeholder="Input your password"
                            value={password}
                            onChange={handlePasswordChanged} 
                        />
                    </div>
                    <div>
                        <button 
                            className="btn btn-primary"
                            type="button" 
                            onClick={Submit}
                            style={{
                                width:'80%',
                                marginLeft:'10%',
                                marginRight:'10%',
                                marginTop:'10px',
                                marginBottom:'25px',
                            }}
                        >
                            Sign In
                        </button>
                    </div>        
                </div>
            </div>
            {/* forget password & register */}
            <div className="row justify-content-center">
                <div 
                    className="col-lg-4 col-md-6 col-sm-12"
                    style={{
                        textAlign:'right',
                        marginTop:'15px'
                    }}
                >
                    <span style={{cursor:'pointer'}} >
                        <Link to="/resetpassword"> ลืมรหัสผ่าน ? </Link>
                    </span> 
                    |
                    <span style={{cursor:'pointer'}}>
                        {' '}<Link to="/register">สม้ครสมาชิก</Link>
                    </span>
                </div>
            </div>
        </>
    )
}

export default LogIn