import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'

function ResetPassword(){

    const [email, setEmail] = useState('');
    const [submit, setSubmit] = useState(false);
    const [status, setStatus] = useState('');

    const handleEmailChanged = (e) => {
        setEmail(e.target.value);
    }

    const submitted = async (e) => {
        let apiPath = 'http://localhost:5000/weissschwarz-f48e0/us-central1/app/signIn/reset';
        let data = { email };
        try {
            let response = await axios.post(apiPath, data);
            response.data.status === 'success' ? setStatus('success') : setStatus('fail');
        } catch (error) {
            console.log(error);
            setStatus('fail');
            throw error;
        }
        setSubmit(true);
    }

    return(
        <>
            <div className="row ms-2 me-2 justify-content-center">
                <div className="col-lg-4 col-md-6 col-sm-12 mt-5 shadow-lg bg-white rounded" >
                    {(!submit || (submit && status === 'fail')) &&
                        <>
                            <div className="mb-3 mt-3 ms-5 me-5">
                                <label htmlFor="username" className="form-label">Enter your email</label>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    id="email" 
                                    placeholder="enter your email" 
                                    autoComplete="off"
                                    value={email}
                                    onChange={handleEmailChanged}
                                />
                            </div>
                            {status === 'fail' &&
                                <p>เกิดข้อผิดพลาดขึ้น กรุณากรอก email ใหม่อีกครั้ง</p>
                            }
                            <div>
                                <button 
                                    className="btn btn-primary"
                                    type="button" 
                                    style={{
                                        width:'80%',
                                        marginLeft:'10%',
                                        marginRight:'10%',
                                        marginTop:'10px',
                                        marginBottom:'25px',
                                    }}
                                    onClick={submitted}
                                >
                                    Reset
                                </button>
                            </div>   
                        </> 
                    }
                    {/* Response after submitted */}
                    {submit && status === 'success' &&
                        <>
                            <div>
                                <p style={ {marginTop:'20px', textAlign:'center'} }>คำขอถูกส่งแล้ว กรุณาตรวจสอบ email เพื่อทำการยืนยัน</p>
                                <Link to="/">
                                    <button 
                                        className="btn btn-primary"
                                        type="button" 
                                        style={{
                                            width:'80%',
                                            marginLeft:'10%',
                                            marginRight:'10%',
                                            marginTop:'10px',
                                            marginBottom:'25px',
                                        }}
                                        onClick={submitted}
                                    >
                                        กลับหน้าแรก
                                    </button>
                                </Link>  
                            </div>    
                        </>
                    }
                </div>
            </div>
        </>
    )
}

export default ResetPassword;