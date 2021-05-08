import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import axios from 'axios';

function ResetPasswordStatus(){

    const { status, id } = useParams();
    const [password, setPassword] = useState('');
    const [resetPasswordSuccess, setResetPasswordSuccess] = useState(null);

    const handlePasswordChanged = (e) =>{
        setPassword(e.target.value);
    }

    const handlePasswordClicked = async () =>{
        try {
            let response = await axios.post('http://localhost:5000/weissschwarz-f48e0/us-central1/app/signin/changePassword', {
                id,
                password
            });
            console.log(response.data);
            if(response.data.status === 'success'){
                setResetPasswordSuccess(true);
            }else{
                setResetPasswordSuccess(false);
            }
        } catch (error) {
            console.log(error);
            setResetPasswordSuccess(false);
            throw error;
        }
    }

    return(
        <>
            {id !== undefined && status === 'success' && resetPasswordSuccess === null &&
                <>
                    <div className="row ms-2 me-2 justify-content-center">
                        <div className="col-lg-4 col-md-6 col-sm-12 mt-5 shadow-lg bg-white rounded" >
                            <div className="mb-3 mt-3 ms-5 me-5">
                                <label htmlFor="password" className="form-label">กรุณาใส่รหัสผ่านใหม่</label>
                                <input 
                                    type="password" 
                                    className="form-control" 
                                    id="password" 
                                    placeholder="enter new password"
                                    value={password}
                                    onChange={handlePasswordChanged}  
                                />
                            </div>
                            <div>
                                <button 
                                    className="btn btn-primary"
                                    type="button" 
                                    onClick={handlePasswordClicked}
                                    style={{
                                        width:'80%',
                                        marginLeft:'10%',
                                        marginRight:'10%',
                                        marginTop:'10px',
                                        marginBottom:'25px',
                                    }}
                                >
                                    Reset
                                </button>
                            </div> 
                        </div>
                    </div>
                </>
            }
            {resetPasswordSuccess &&
                <>
                    <h1>Reset รหัสผ่านสำเร็จ</h1>
                    <p>รหัสผ่านได้รับการเปลี่ยนแล้ว กรุณาใช้รหัสผ่านใหม่ในการเข้าสู่ระบบ</p>
                    <Link to="/">
                        <Button variant='primary'>กลับหน้าแรก</Button>
                    </Link>
                </>
            }
            {(id === undefined || status === 'fail' || resetPasswordSuccess === false) &&
                <>
                    <h1>Reset รหัสผ่านล้มเหลว</h1>
                    <p>เกิดข้อผิดพลาดขึ้น กรุณาทำการ reset รหัสผ่านใหม่อีกครั้ง</p>
                    <Link to="/resetpassword">
                        <Button variant='danger'>Reset รหัสผ่านอีกครั้ง</Button>
                    </Link>
                    <Link to="/">
                        <Button style={{ marginLeft:'20px' }} variant='primary'>กลับหน้าแรก</Button>
                    </Link>
                </>
            }
        </>
    )
}

export default ResetPasswordStatus;