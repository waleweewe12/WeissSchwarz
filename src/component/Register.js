import React, { useState } from 'react'
import axios from 'axios';
import { Modal, Button } from 'react-bootstrap'
import { Link } from "react-router-dom";

function Register(){

    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [modal, setModal] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    const [modalHeader, setModalHeader] = useState('');

    const handleEmailChanged = (e) =>{
        setEmail(e.target.value);
    }

    const handleUsernameChanged = (e) =>{
        setUsername(e.target.value);
    }

    const handlePasswordChanged = (e) =>{
        setPassword(e.target.value);
    }

    const handleSubmitClicked = async () =>{
        const apiPath = 'http://localhost:5000/weissschwarz-f48e0/us-central1/app/register';
        try {
            let response = await axios.post(apiPath, {
                username,
                email,
                password
            })
            console.log(response.data);
            setModal(true);
            if(response.data.status === 'success'){
                setModalHeader('Success');
                setModalMessage('สมัครสมาชิกสำเร็จ');
            }else{
                setModalHeader('Fail');
                setModalMessage(response.data.message);
            }
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    const handleModalCloseClicked = () =>{
        setModal(false);
    }

    return(
        <>
            <div className="row justify-content-center" style={{alignItems: 'center'}}>
                <div className="col-lg-4 col-md-6 col-sm-12">
                    <h1 className="ms-5">Register</h1>
                    <div className="mb-3 mt-3 ms-5 me-5">
                        <label htmlFor="email" className="form-label">email</label>
                        <input 
                            type="email" 
                            className="form-control" 
                            id="email" 
                            placeholder="Enter your email"
                            onChange={handleEmailChanged} 
                        />
                    </div>
                    <div className="mb-3 mt-3 ms-5 me-5">
                        <label htmlFor="username" className="form-label">username</label>
                        <input 
                            type="text" 
                            className="form-control" 
                            id="username" 
                            placeholder="Enter your uername"
                            onChange={handleUsernameChanged} 
                        />
                    </div>
                    <div className="mb-3 ms-5 me-5">
                        <label htmlFor="password" className="form-label">password</label>
                        <input 
                            type="password" 
                            className="form-control" 
                            id="password" 
                            placeholder="Input your password"
                            onChange={handlePasswordChanged} 
                        />
                    </div>
                    <button 
                        className="btn btn-primary mb-3"
                        style={{
                            float:'right',
                            marginRight:'50px'
                        }}
                        onClick={handleSubmitClicked}
                    >
                        Submit
                    </button>
                    <Link to="/">
                        <button 
                            className="btn btn-danger"
                            style={{ float:'left', marginLeft:'50px' }}
                        >
                            กลับหน้าแรก
                        </button>
                    </Link>
                </div>
            </div>

            <Modal show={modal}>
                <Modal.Header>
                <Modal.Title>{modalHeader}</Modal.Title>
                </Modal.Header>
                <Modal.Body>{modalMessage}</Modal.Body>
                <Modal.Footer>
                {modalHeader === 'Success' &&
                    <Link to='/'>
                        <Button variant="primary">
                            เข้าสู่ระบบ
                        </Button>
                    </Link> 
                }
                <Button variant="secondary" onClick={handleModalCloseClicked}>
                    Close
                </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default Register;